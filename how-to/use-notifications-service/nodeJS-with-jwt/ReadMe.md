# Node JS example to work with notification-service

## Setup values

1. Ensure that you have all the pertinent values set up in .env.defaults. Please reach out to <support@here.io> for more information.
2. Ensure that your command line arg --platform is referencing the uuid of the platform that you are targeting.Please reach out to <support@here.io> for more information.
3. The sample code uses a method called createToken to generate a dummy jwt token. In practice you will be using the token created by your internal mechanism/SSO. You will need to modify the sample code to fetch and pass this token to the server.

## Building and running the example

1. Run "npm i" to install dependencies
2. Run "npm run build" to build the project
3. Using one of the command lines below execute the process. Ideally you will first run the command line that creates a newNotification. This process will provide a notification id for the newly created notification. Thereafter you can run the updateNotification and/or deleteNotification process.

## Command lines to run this example

npm run start -- --source=server --platform={platform-name-uuid} --newNotification  
npm run start -- --source=server --platform={platform-name-uuid} --deleteNotification={notification-id}
npm run start -- --source=server --platform={platform-name-uuid} --updateNotification={notification-id}
