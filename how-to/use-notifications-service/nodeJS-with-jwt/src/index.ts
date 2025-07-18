import {
  CloudNotificationAPI,
  ConnectionResult,
  ConnectParameters,
} from "@openfin/cloud-notification-core-api";
import yargs, { parsed } from "yargs";
import chalk from "chalk";

import "dotenv-defaults/config.js";
import readline from "node:readline/promises";
import { title } from "node:process";
import createToken from "./create-token.js";

const parsedArgs = await yargs(process.argv.slice(2))
  .option("source", {
    type: "string",
    default: "my-desktop-machine",
  })
  .option("platform", {
    type: "string",
    default: "my-platform",
  })
  .option("newNotification", {
    type: "boolean",
    default: false,
  })
  .option("deleteNotification", {
    type: "string",
    default: "",
  })
  .option("updateNotification", {
    type: "string",
    default: "",
  })
  .help()
  .parse();

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminal.write(chalk.blueBright(JSON.stringify(parsedArgs, null, 2)));

if (!process.env.NOTIFICATION_SERVER_HOST) {
  terminal.write(
    chalk.redBright(`\n\nEnvironment not setup - See README.md\n\n`)
  );
  process.exit(1);
}

if (
  !parsedArgs.newNotification &&
  !parsedArgs.deleteNotification &&
  !parsedArgs.updateNotification
) {
  terminal.write(chalk.redBright(`\n\nNo notification action specified\n`));
  process.exit(1);
}

const jwtToken = createToken();
terminal.write(chalk.green(`\r\n\nJWT Token: ${jwtToken}\n`));

const connectSettings: ConnectParameters = {
  sourceId: parsedArgs.source,
  platformId: parsedArgs.platform,
  authenticationType: "jwt",
  jwtAuthenticationParameters: {
    authenticationId: process.env.JWT_AUTHENTICATION_ID || "No-ID-Provided", // This is the authenticationId of the jwt-api auth settings in the org

    // This is a callback to handle expired tokens or periodic recreation of the token - every time a token is required this will be called
    jwtRequestCallback: () => {
      return jwtToken;
    },
  },
};

let notificationApi = new CloudNotificationAPI({
  url: process.env.NOTIFICATION_SERVER_HOST,
});

let connectionResult: ConnectionResult;
try {
  terminal.write(chalk.yellow(`\n\nConnecting to Notifications Service.\n\n`));
  connectionResult = await notificationApi.connect(connectSettings);
  terminal.write(
    chalk.green(`\n\nSession Connected: ${connectionResult.sessionId}\n\n`)
  );
} catch (errorConnect) {
  terminal.write(
    chalk.red(`\nError connecting to notification server: ${errorConnect}\n`)
  );
  process.exit(1);
}

terminal.write(
  chalk.green(
    `\nSession Connected to ${process.env.NOTIFICATION_SERVER_HOST}\n`
  )
);

notificationApi.addEventListener("reconnected", () => {
  terminal.write(chalk.yellow(`\n\nSession Reconnected\n\n`));
});

notificationApi.addEventListener("session-expired", async () => {
  terminal.write(chalk.yellow(`\n\nSession expired\n\n`));
});

notificationApi.addEventListener("session-extended", async () => {
  terminal.write(chalk.yellow(`\n\nSession extended\n\n`));
});

notificationApi.addEventListener("disconnected", () => {
  terminal.write(chalk.yellow(`\n\nSession Disconnected\n\n`));
  //    process.exit(1);
});

let lastRXedNotificationId: string | undefined = undefined;
let TXedNotificationIds: string[] = [];

terminal.write(
  "-----------------------------------------------------------------------------\n"
);
terminal.write(
  `Username                  : ${process.env.AUTHENTICATION_BASIC_USERNAME}\n`
);
terminal.write(`User Id                   : ${connectionResult.userId}\n`);
terminal.write(
  `Groups                    : ${connectionResult.groups.map(
    (x: any) => x.name
  )}\n`
);
terminal.write(`Platform                  : ${connectionResult.platformId}\n`);
terminal.write(`Source                    : ${connectionResult.sourceId}\n`);
terminal.write(`Session Id                : ${connectionResult.sessionId}\n`);
terminal.write(
  `Last RX'ed notification ID: ${lastRXedNotificationId || "none"}\n`
);
terminal.write(
  `Last TX'ed notification ID: ${TXedNotificationIds.at(-1) || "none"}\n`
);
terminal.write(
  "-----------------------------------------------------------------------------\n"
);

// Check command line args for newNotification or deleteNotification

if (parsedArgs.newNotification) {
  terminal.write(chalk.yellow(`\n\nRaising a new notification\n`));
  try {
    const newId = await handleRaiseNotification();
    TXedNotificationIds.push(newId);
    terminal.write(chalk.green(`\nNotification ${newId} sent\n`));
  } catch (error) {
    terminal.write(chalk.red(`\nError raising notification: ${error}\n`));
  }
} else if (parsedArgs.deleteNotification !== "") {
  terminal.write(
    chalk.yellow(`\n\nDeleting notification ${parsedArgs.deleteNotification}\n`)
  );
  try {
    const deleteResult = await notificationApi.deleteNotification(
      parsedArgs.deleteNotification
    );
    terminal.write(chalk.green(`\nNotification was deleted\n`));
  } catch (error) {
    terminal.write(chalk.red(`\nError deleting notification: ${error}\n`));
  }
} else if (parsedArgs.updateNotification !== "") {
  terminal.write(
    chalk.yellow(`\n\nUpdating notification ${parsedArgs.updateNotification}\n`)
  );
  try {
    await notificationApi.updateNotification(
      parsedArgs.updateNotification,
      {
        ttlSeconds: 120,
      },
      {
        aMessage: "This is an updated message",
        title: "Updated Notification Title",
        template: "custom",
        toast: "transient",
        templateData: {
          textData: "This is an updated message for the notification",
        },
        templateOptions: {
          body: {
            fallbackText: "Updated fallback text",
            compositions: [
              {
                minTemplateAPIVersion: "1",
                layout: {
                  type: "container",
                  children: [
                    {
                      optional: true,
                      type: "text",
                      dataKey: "textData",
                    },
                  ],
                },
              },
            ],
          },
          indicator: {
            color: "blue",
          },
        },
      }
    );
    terminal.write(chalk.green(`\nNotification was updated\n`));
  } catch (error) {
    terminal.write(chalk.red(`\nError updating notification: ${error}\n`));
  }
}

await notificationApi.disconnect();
terminal.write(chalk.green(`\nSession Disconnected\n`));
process.exit(0);

async function handleRaiseNotification(): Promise<string> {
  const notificationGroups = ["all-users"];
  const correlationId = "";
  const currentDate = new Date();

  const result = await notificationApi.raiseNotification(
    {
      correlationId,
      targets: {
        groups: notificationGroups,
        users: [],
      },
    },
    {
      template: "custom",
      toast: "transient",
      title: "Generated using JWT API Auth",
      templateData: {
        textData:
          "Place a quick market order at the prevailing market price for $XYZ",
      },
      templateOptions: {
        body: {
          fallbackText: "fallback text",
          compositions: [
            {
              minTemplateAPIVersion: "1",
              layout: {
                type: "container",
                children: [
                  {
                    optional: true,
                    type: "text",
                    dataKey: "textData",
                  },
                ],
              },
            },
          ],
        },
        indicator: {
          color: "purple",
        },
      },
      icon: "ui/oflogo.png",
      indicator: { text: "GALLERY" },
      form: [
        {
          key: "buy_option",
          label: "Order Type",
          type: "string",
          widget: {
            type: "Dropdown",
            options: [
              {
                label: "Option One",
                value: "option_one",
              },
              {
                label: "Option Two",
                value: "option_two",
              },
            ],
          },
        },
        {
          key: "closing_day",
          label: "Closing Day",
          type: "date",
          value: {
            date: currentDate.getDate(),
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
          },
          widget: {
            type: "Date",
            minDate: currentDate,
            maxDate: new Date(currentDate.setDate(currentDate.getDate() + 3)),
          },
        },
        {
          key: "share_quantity",
          label: "Share Quantity",
          type: "number",
          widget: {
            type: "Number",
            min: 100,
          },
        },
        {
          key: "share_price",
          label: "Share Price",
          type: "number",
          widget: {
            type: "Number",
            currencyChar: "$",
          },
        },
      ],
      buttons: [
        {
          title: "Submit",
          iconUrl: "favicon.ico",
          submit: true,
          formOptions: {
            submittingTitle: "Form Submitting",
            successTitle: "Submitted",
          },
        },
      ],
    }
  );

  return result.notificationId;
}
