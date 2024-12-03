/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*****************************!*\
  !*** ./client/src/index.ts ***!
  \*****************************/

/* eslint-disable jsdoc/require-description */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/match-description */
/* eslint-disable linebreak-style */
/**
 * Initialize the DOM.
 */
function initializeDOM() {
    let downloadCount = 0;
    const DOMAIN = "<PROVIDE YOUR DOMAIN HERE. Eg. https://my-domain/com>";
    const API_KEY = "<PROVIDE YOUR API KEY HERE>";
    const actionButton = document.querySelector("#callAPIbutton") ?? null;
    const logInformation = document.querySelector("#logOutput");
    const chkSubjectPermissions = document.querySelector("#chkSubjectPermissions");
    const chkRolesPermissions = document.querySelector("#chkRolesPermissions");
    const chkPermissions = document.querySelector("#chkPermissions");
    const chkMyRoles = document.querySelector("#chkMyRoles");
    actionButton?.addEventListener("click", retrieveData);
    logOutput("Initialized application.");
    /**
     * loops through checked options and calls api
     */
    async function retrieveData() {
        if (DOMAIN.startsWith("<")) {
            logOutput("Please provide valid values for DOMAIN and API_KEY in your code.");
            console.log("invalid domain");
        }
        else if (!chkPermissions?.checked &&
            !chkRolesPermissions?.checked &&
            !chkSubjectPermissions?.checked &&
            !chkMyRoles?.checked) {
            logOutput("Please select at least one type of API call from above.");
        }
        else {
            if (chkMyRoles?.checked) {
                await retrieveAPIData(`${DOMAIN}/entitlement/api/assigned/me`, "my-roles-permissions.json");
            }
            if (chkSubjectPermissions?.checked) {
                await retrieveAPIData(`${DOMAIN}/entitlement/api/assigned/subjects/user/permission`, "subject-permissions.json");
            }
            if (chkRolesPermissions?.checked) {
                await retrieveAPIData(`${DOMAIN}/entitlement/api/v1/primitives/query/role?includeChildren=true&childrenType=permission`, "roles-Permissions.json");
            }
            if (chkPermissions?.checked) {
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
    async function retrieveAPIData(endpointURL, fileName) {
        const result = await getDataFromEndpoint(endpointURL);
        if (result !== null) {
            try {
                logOutput("Saving data.");
                download(result, fileName, "text");
                logOutput("Data downloaded successfully.");
            }
            catch (error) {
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
    function download(data, filename, type) {
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
        }
        catch (error) {
            formatError(error);
        }
    }
    /**
     *
     * @param endpointUrl
     */
    async function getDataFromEndpoint(endpointUrl) {
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
        }
        catch (error) {
            formatError(error);
            return "";
        }
    }
    /**
     *
     * @param info
     */
    function logOutput(info) {
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
function formatError(err) {
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    return JSON.stringify(err);
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L2NsaWVudC9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUganNkb2MvcmVxdWlyZS1kZXNjcmlwdGlvbiAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBqc2RvYy9yZXF1aXJlLXBhcmFtLWRlc2NyaXB0aW9uICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzZG9jL21hdGNoLWRlc2NyaXB0aW9uICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGxpbmVicmVhay1zdHlsZSAqL1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIERPTS5cclxuICovXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVET00oKTogdm9pZCB7XHJcblx0bGV0IGRvd25sb2FkQ291bnQgPSAwO1xyXG5cclxuXHRjb25zdCBET01BSU4gPSBcIjxQUk9WSURFIFlPVVIgRE9NQUlOIEhFUkUuIEVnLiBodHRwczovL215LWRvbWFpbi9jb20+XCI7XHJcblx0Y29uc3QgQVBJX0tFWSA9IFwiPFBST1ZJREUgWU9VUiBBUEkgS0VZIEhFUkU+XCI7XHJcblxyXG5cdGNvbnN0IGFjdGlvbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2NhbGxBUElidXR0b25cIikgPz8gbnVsbDtcclxuXHRjb25zdCBsb2dJbmZvcm1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFByZUVsZW1lbnQ+KFwiI2xvZ091dHB1dFwiKTtcclxuXHJcblx0Y29uc3QgY2hrU3ViamVjdFBlcm1pc3Npb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtTdWJqZWN0UGVybWlzc2lvbnNcIik7XHJcblx0Y29uc3QgY2hrUm9sZXNQZXJtaXNzaW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrUm9sZXNQZXJtaXNzaW9uc1wiKTtcclxuXHRjb25zdCBjaGtQZXJtaXNzaW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrUGVybWlzc2lvbnNcIik7XHJcblx0Y29uc3QgY2hrTXlSb2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrTXlSb2xlc1wiKTtcclxuXHJcblx0YWN0aW9uQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmV0cmlldmVEYXRhKTtcclxuXHJcblx0bG9nT3V0cHV0KFwiSW5pdGlhbGl6ZWQgYXBwbGljYXRpb24uXCIpO1xyXG5cclxuXHQvKipcclxuXHQgKiBsb29wcyB0aHJvdWdoIGNoZWNrZWQgb3B0aW9ucyBhbmQgY2FsbHMgYXBpXHJcblx0ICovXHJcblx0YXN5bmMgZnVuY3Rpb24gcmV0cmlldmVEYXRhKCk6IFByb21pc2U8dm9pZD4ge1xyXG5cdFx0aWYoRE9NQUlOLnN0YXJ0c1dpdGgoXCI8XCIpKSB7XHJcblx0XHRcdGxvZ091dHB1dChcIlBsZWFzZSBwcm92aWRlIHZhbGlkIHZhbHVlcyBmb3IgRE9NQUlOIGFuZCBBUElfS0VZIGluIHlvdXIgY29kZS5cIik7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiaW52YWxpZCBkb21haW5cIik7XHJcblx0XHR9IGVsc2UgaWYoXHJcblx0XHRcdCFjaGtQZXJtaXNzaW9ucz8uY2hlY2tlZCAmJlxyXG5cdFx0XHQhY2hrUm9sZXNQZXJtaXNzaW9ucz8uY2hlY2tlZCAmJlxyXG5cdFx0XHQhY2hrU3ViamVjdFBlcm1pc3Npb25zPy5jaGVja2VkICYmXHJcblx0XHRcdCFjaGtNeVJvbGVzPy5jaGVja2VkXHJcblx0XHQpIHtcclxuXHRcdFx0bG9nT3V0cHV0KFwiUGxlYXNlIHNlbGVjdCBhdCBsZWFzdCBvbmUgdHlwZSBvZiBBUEkgY2FsbCBmcm9tIGFib3ZlLlwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmKGNoa015Um9sZXM/LmNoZWNrZWQpIHtcclxuXHRcdFx0XHRhd2FpdCByZXRyaWV2ZUFQSURhdGEoYCR7RE9NQUlOfS9lbnRpdGxlbWVudC9hcGkvYXNzaWduZWQvbWVgLCBcIm15LXJvbGVzLXBlcm1pc3Npb25zLmpzb25cIik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGNoa1N1YmplY3RQZXJtaXNzaW9ucz8uY2hlY2tlZCkge1xyXG5cdFx0XHRcdGF3YWl0IHJldHJpZXZlQVBJRGF0YShgJHtET01BSU59L2VudGl0bGVtZW50L2FwaS9hc3NpZ25lZC9zdWJqZWN0cy91c2VyL3Blcm1pc3Npb25gLCBcInN1YmplY3QtcGVybWlzc2lvbnMuanNvblwiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoY2hrUm9sZXNQZXJtaXNzaW9ucz8uY2hlY2tlZCkge1xyXG5cdFx0XHRcdGF3YWl0IHJldHJpZXZlQVBJRGF0YShgJHtET01BSU59L2VudGl0bGVtZW50L2FwaS92MS9wcmltaXRpdmVzL3F1ZXJ5L3JvbGU/aW5jbHVkZUNoaWxkcmVuPXRydWUmY2hpbGRyZW5UeXBlPXBlcm1pc3Npb25gLCBcInJvbGVzLVBlcm1pc3Npb25zLmpzb25cIik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGNoa1Blcm1pc3Npb25zPy5jaGVja2VkKSB7XHJcblx0XHRcdFx0YXdhaXQgcmV0cmlldmVBUElEYXRhKGAke0RPTUFJTn0vZW50aXRsZW1lbnQvYXBpL3YxL3ByaW1pdGl2ZXMvcXVlcnkvcGVybWlzc2lvbmAsIFwicGVybWlzc2lvbnMuanNvblwiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bG9nT3V0cHV0KGBUb3RhbCBudW1iZXIgb2YgZmlsZXMgZG93bmxvYWRlZDogJHtkb3dubG9hZENvdW50fWApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZW5kcG9pbnRVUkxcclxuXHQgKiBAcGFyYW0gZmlsZU5hbWVcclxuXHQgKi9cclxuXHRhc3luYyBmdW5jdGlvbiByZXRyaWV2ZUFQSURhdGEoZW5kcG9pbnRVUkw6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG5cdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgZ2V0RGF0YUZyb21FbmRwb2ludChlbmRwb2ludFVSTCk7XHJcblxyXG5cdFx0aWYocmVzdWx0ICE9PSBudWxsKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bG9nT3V0cHV0KFwiU2F2aW5nIGRhdGEuXCIpO1xyXG5cdFx0XHRcdGRvd25sb2FkKHJlc3VsdCwgZmlsZU5hbWUsIFwidGV4dFwiKTtcclxuXHRcdFx0XHRsb2dPdXRwdXQoXCJEYXRhIGRvd25sb2FkZWQgc3VjY2Vzc2Z1bGx5LlwiKTtcclxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0XHRsb2dPdXRwdXQoYEVycm9yIHNhdmluZyBkYXRhOiAke2Vycm9yfWApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBGdW5jdGlvbiB0byBkb3dubG9hZCBkYXRhIHRvIGEgZmlsZVxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGRhdGFcclxuXHQgKiBAcGFyYW0gZmlsZW5hbWVcclxuXHQgKiBAcGFyYW0gdHlwZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGRvd25sb2FkKGRhdGE6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCBmaWxlID0gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGUgfSk7XHJcblxyXG5cdFx0XHRjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcblx0XHRcdFx0XHRjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG5cdFx0XHRhLmhyZWYgPSB1cmw7XHJcblx0XHRcdGEuZG93bmxvYWQgPSBmaWxlbmFtZTtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmQoYSk7XHJcblx0XHRcdGEuY2xpY2soKTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0YS5yZW1vdmUoKTtcclxuXHRcdFx0XHR3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG5cdFx0XHR9LCAwKTtcclxuXHJcblx0XHRcdGRvd25sb2FkQ291bnQrKztcclxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdGZvcm1hdEVycm9yKGVycm9yKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGVuZHBvaW50VXJsXHJcblx0ICovXHJcblx0YXN5bmMgZnVuY3Rpb24gZ2V0RGF0YUZyb21FbmRwb2ludChlbmRwb2ludFVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGxvZ091dHB1dChgUnVubmluZyBBUEkgcXVlcnkgdG8gZmV0Y2ggZGF0YSBmcm9tICR7ZW5kcG9pbnRVcmx9YCk7XHJcblxyXG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGVuZHBvaW50VXJsLCB7XHJcblx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0XCJ4LW9wZW5maW4tY2xvdWQtYXBpLWtleVwiOiBBUElfS0VZXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG5cdFx0XHRsb2dPdXRwdXQoXCJBUEkgY2FsbCBjb21wbGV0ZWQuXCIpO1xyXG5cclxuXHRcdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIFwiXFx0XCIpO1xyXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0Zm9ybWF0RXJyb3IoZXJyb3IpO1xyXG5cdFx0XHRyZXR1cm4gXCJcIjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBpbmZvXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gbG9nT3V0cHV0KGluZm86IHN0cmluZyk6IHZvaWQge1xyXG5cdGlmIChsb2dJbmZvcm1hdGlvbikge1xyXG5cdFx0bG9nSW5mb3JtYXRpb24udGV4dENvbnRlbnQgPSBgJHtsb2dJbmZvcm1hdGlvbi50ZXh0Q29udGVudH0ke2luZm99XFxuXFxuYDtcclxuXHRcdGxvZ0luZm9ybWF0aW9uLnNjcm9sbFRvcCA9IGxvZ0luZm9ybWF0aW9uLnNjcm9sbEhlaWdodDtcclxuXHR9XHJcbn1cclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRpYWxpemVET00pO1xyXG5cclxuLyoqXHJcblx0ICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxyXG5cdCAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cclxuXHQgKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxyXG5cdCAqL1xyXG5mdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xyXG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xyXG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xyXG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xyXG5cdFx0cmV0dXJuIGVycjtcclxuXHR9XHJcblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9