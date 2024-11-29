
/**
 * Initialize the DOM.
 */
function initializeDOM() {
	const domain =  'https://sandbox-dev.os.openfin.co';
	const apiKey = 'b57b28e76f1e3e0460faf5dbd46b5d7f';
	
	const actionButton = document.querySelector('#callAPIbutton')
	const logInformation = document.querySelector("#logOutput");
	const statusLabel = document.querySelector("#status");
	const copyLogOutput = document.querySelector("#copyLogOutput");


	actionButton.addEventListener('click', retrieveData);
	copyLogOutput.addEventListener('click', copyToClipboard);

	logOutput("Initialized application.");

	async function retrieveData() {
		/* Download first file */
		let result = retrieveAPIData(domain + '/entitlement/api/assigned/subjects/user/permission', 'subject-permissions.json');

		if(result) {
			/* Download second file */
			result = retrieveAPIData(domain + '/entitlement/api/v1/primitives/query/role?includeChildren=true&childrenType=permission', 'roles-Permissions.json');

			if(result) {
				/* Download third file */
				result = retrieveAPIData(domain + '/entitlement/api/v1/primitives/query/permission', 'permissions.json');
			}			
		}		
	}

	async function retrieveAPIData(endpointURL, fileName) {
		
		let result = await getDataFromEndpoint(endpointURL);

		if(result !== null) {			
			try {
				logOutput('Saving data.');
				download(result, fileName, 'text')
				logOutput('Data downloaded successfully.');

				return true;
			} catch (error) {
				logOutput('Error saving data: ' + error);
				return false;
			}
		}
		return false;
	}

	// Function to download data to a file
	function download(data, filename, type) {
		var file = new Blob([data], {type: type});
		if (window.navigator.msSaveOrOpenBlob) // IE10+
			window.navigator.msSaveOrOpenBlob(file, filename);
		else { // Others
			var a = document.createElement("a"),
					url = URL.createObjectURL(file);
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			setTimeout(function() {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);  
			}, 0); 
		}
	}
	
	async function getDataFromEndpoint (endpointUrl)  {
		try {
			logOutput("Running API query to fetch data from " + endpointUrl);

			const response = await fetch(endpointUrl, {
				headers: {
					'x-openfin-cloud-api-key': apiKey
				}
			})

			const data = await response.json();

			// logInformation(JSON.stringify(data, null, "\t"));

			logOutput("API call completed.");

			return JSON.stringify(data, null, "\t");
		} catch (error) {
			logOutput("Error:", error);
			return null;
		}
		
	}

	
	function copyToClipboard() {
		const copyText = document.getElementById('logOutput').textContent;
		navigator.clipboard.writeText(copyText);
		statusLabel.innerHTML = "Permissions information copied to clipboard.";
	  }

	
	function logOutput(info) {
	if (logInformation) {
		logInformation.textContent = `${logInformation.textContent}${info}\n\n`;
		logInformation.scrollTop = logInformation.scrollHeight;
	}
}
	
}
window.addEventListener('DOMContentLoaded', initializeDOM);
