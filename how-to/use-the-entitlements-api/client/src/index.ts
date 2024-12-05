/* eslint-disable jsdoc/require-description */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/match-description */
/* eslint-disable linebreak-style */

/**
 * Initialize the DOM.
 */
function initializeDOM(): void {
	let downloadCount = 0;

	const DOMAIN = "<PROVIDE YOUR DOMAIN HERE. Eg. https://my-domain/com>";
	const API_KEY = "<PROVIDE YOUR API KEY HERE>";

	const actionButton = document.querySelector<HTMLButtonElement>("#callAPIbutton") ?? null;
	const logInformation = document.querySelector<HTMLPreElement>("#logOutput");

	const chkSubjectPermissions = document.querySelector<HTMLInputElement>("#chkSubjectPermissions");
	const chkRolesPermissions = document.querySelector<HTMLInputElement>("#chkRolesPermissions");
	const chkPermissions = document.querySelector<HTMLInputElement>("#chkPermissions");
	const chkMyRoles = document.querySelector<HTMLInputElement>("#chkMyRoles");

	actionButton?.addEventListener("click", retrieveData);

	logOutput("Initialized application.");

	/**
	 * loops through checked options and calls api
	 */
	async function retrieveData(): Promise<void> {
		if(DOMAIN.startsWith("<")) {
			logOutput("ERROR: Please provide valid values for DOMAIN and API_KEY in your code.");
		} else if(
			!chkPermissions?.checked &&
			!chkRolesPermissions?.checked &&
			!chkSubjectPermissions?.checked &&
			!chkMyRoles?.checked
		) {
			logOutput("Please select at least one type of API call from above.");
		} else {
			if(chkMyRoles?.checked) {
				await retrieveAPIData(`${DOMAIN}/entitlement/api/assigned/me`, "my-roles-permissions.json");
			}

			if(chkSubjectPermissions?.checked) {
				await retrieveAPIData(`${DOMAIN}/entitlement/api/assigned/subjects/user/permission`, "subject-permissions.json");
			}

			if(chkRolesPermissions?.checked) {
				await retrieveAPIData(`${DOMAIN}/entitlement/api/v1/primitives/query/role?includeChildren=true&childrenType=permission`, "roles-Permissions.json");
			}

			if(chkPermissions?.checked) {
				await retrieveAPIData(`${DOMAIN}/entitlement/api/v1/primitives/query/permission`, "permissions.json");
			}

			logOutput(`Total number of files downloaded: ${downloadCount}`);
		}
	}

	/**
	 *
	 * @param endpointURL
	 * @param fileName
	 */
	async function retrieveAPIData(endpointURL: string, fileName: string): Promise<void> {
		const result = await getDataFromEndpoint(endpointURL);

		if(result !== null) {
			try {
				logOutput("Saving data.");
				download(result, fileName, "text");
				logOutput("Data downloaded successfully.");
			} catch (error) {
				logOutput(`Error saving data: ${error}`);
			}
		}
	}

	// Function to download data to a file
	/**
	 *
	 * @param data
	 * @param filename
	 * @param type
	 */
	function download(data: string, filename: string, type: string): void {
		try {
			const file = new Blob([data], { type });

			const a = document.createElement("a");
					const url = URL.createObjectURL(file);
			a.href = url;
			a.download = filename;
			document.body.append(a);
			a.click();
			setTimeout(() => {
				a.remove();
				window.URL.revokeObjectURL(url);
			}, 0);

			downloadCount++;
		} catch (error) {
			formatError(error);
		}
	}

	/**
	 *
	 * @param endpointUrl
	 */
	async function getDataFromEndpoint(endpointUrl: string): Promise<string> {
		try {
			logOutput(`Running API query to fetch data from ${endpointUrl}`);

			const response = await fetch(endpointUrl, {
				headers: {
					"x-openfin-cloud-api-key": API_KEY
				}
			});

			const data = await response.json();

			logOutput("API call completed.");

			return JSON.stringify(data, null, "\t");
		} catch (error) {
			formatError(error);
			return "";
		}
	}


	/**
	 *
	 * @param info
	 */
	function logOutput(info: string): void {
	if (logInformation) {
		logInformation.textContent = `${logInformation.textContent}${info}\n\n`;
		logInformation.scrollTop = logInformation.scrollHeight;
	}
}
}

window.addEventListener("DOMContentLoaded", initializeDOM);

/**
	 * Format an error to a readable string.
	 * @param err The error to format.
	 * @returns The formatted error.
	 */
function formatError(err: unknown): string {
	if (err instanceof Error) {
		return err.message;
	} else if (typeof err === "string") {
		return err;
	}
	return JSON.stringify(err);
}
