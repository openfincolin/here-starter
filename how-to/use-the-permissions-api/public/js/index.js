/**
 * Initialize the DOM.
 */
function initializeDOM() {
	const endpointURL = 'https://sandbox-dev.os.openfin.co/entitlement/api/assigned/subjects/user/permission';
	const apiKey = 'b57b28e76f1e3e0460faf5dbd46b5d7f';
	
	const actionButton = document.querySelector('#callAPIbutton')
	const logOutput = document.querySelector("#logOutput");
	const statusLabel = document.querySelector("#status");
	const copyLogOutput = document.querySelector("#copyLogOutput");


	actionButton.addEventListener('click', retrievePermissions);
	copyLogOutput.addEventListener('click', copyToClipboard);

	statusLabel.innerHTML = "Initialized application.";

	
	async function retrievePermissions ()  {
		statusLabel.innerHTML = "Running API query.";

		const response = await fetch(endpointURL, {
			headers: {
				'x-openfin-cloud-api-key': apiKey
			}
		})

		const data = await response.json();

		logInformation(JSON.stringify(data, null, "\t"));

		statusLabel.innerHTML = "API call completed.";
	}

	
	function copyToClipboard() {
		const copyText = document.getElementById('logOutput').textContent;
		navigator.clipboard.writeText(copyText);
		statusLabel.innerHTML = "Permissions information copied to clipboard.";
	  }

	
	function logInformation(info) {
	if (logOutput) {
		logOutput.textContent = `${logOutput.textContent}${info}\n\n`;
		logOutput.scrollTop = logOutput.scrollHeight;
	}
}
	
}
window.addEventListener('DOMContentLoaded', initializeDOM);
