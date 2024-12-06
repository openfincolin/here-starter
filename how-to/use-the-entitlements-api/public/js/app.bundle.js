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
    const DOMAIN = "https://sandbox-dev.os.openfin.co/entitlement/api/assigned/subjects/user/permission";
    const API_KEY = "b57b28e76f1e3e0460faf5dbd46b5d7f";
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
            logOutput("ERROR: Please provide valid values for DOMAIN and API_KEY in your code.");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU8sRUFBRTtvQkFDUix5QkFBeUIsRUFBRSxPQUFPO2lCQUNsQzthQUNELENBQUMsQ0FBQztZQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRW5DLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRWpDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2hCLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPLEVBQUUsQ0FBQztRQUNYLENBQUM7SUFDRixDQUFDO0lBR0Q7OztPQUdHO0lBQ0gsU0FBUyxTQUFTLENBQUMsSUFBWTtRQUMvQixJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLGNBQWMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxjQUFjLENBQUMsV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDO1lBQ3hFLGNBQWMsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztRQUN4RCxDQUFDO0lBQ0YsQ0FBQztBQUNELENBQUM7QUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFFM0Q7Ozs7T0FJSTtBQUNKLFNBQVMsV0FBVyxDQUFDLEdBQVk7SUFDaEMsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFLENBQUM7UUFDMUIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3BCLENBQUM7U0FBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGVybWlzc2lvbnMtYXBpLy4vY2xpZW50L3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc2RvYy9yZXF1aXJlLWRlc2NyaXB0aW9uICovXHJcbi8qIGVzbGludC1kaXNhYmxlIGpzZG9jL3JlcXVpcmUtcGFyYW0tZGVzY3JpcHRpb24gKi9cclxuLyogZXNsaW50LWRpc2FibGUganNkb2MvbWF0Y2gtZGVzY3JpcHRpb24gKi9cclxuLyogZXNsaW50LWRpc2FibGUgbGluZWJyZWFrLXN0eWxlICovXHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgRE9NLlxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZURPTSgpOiB2b2lkIHtcclxuXHRsZXQgZG93bmxvYWRDb3VudCA9IDA7XHJcblxyXG5cdGNvbnN0IERPTUFJTiA9IFwiaHR0cHM6Ly9zYW5kYm94LWRldi5vcy5vcGVuZmluLmNvL2VudGl0bGVtZW50L2FwaS9hc3NpZ25lZC9zdWJqZWN0cy91c2VyL3Blcm1pc3Npb25cIjtcclxuXHRjb25zdCBBUElfS0VZID0gXCJiNTdiMjhlNzZmMWUzZTA0NjBmYWY1ZGJkNDZiNWQ3ZlwiO1xyXG5cclxuXHRjb25zdCBhY3Rpb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNjYWxsQVBJYnV0dG9uXCIpID8/IG51bGw7XHJcblx0Y29uc3QgbG9nSW5mb3JtYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQcmVFbGVtZW50PihcIiNsb2dPdXRwdXRcIik7XHJcblxyXG5cdGNvbnN0IGNoa1N1YmplY3RQZXJtaXNzaW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrU3ViamVjdFBlcm1pc3Npb25zXCIpO1xyXG5cdGNvbnN0IGNoa1JvbGVzUGVybWlzc2lvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa1JvbGVzUGVybWlzc2lvbnNcIik7XHJcblx0Y29uc3QgY2hrUGVybWlzc2lvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa1Blcm1pc3Npb25zXCIpO1xyXG5cdGNvbnN0IGNoa015Um9sZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa015Um9sZXNcIik7XHJcblxyXG5cdGFjdGlvbkJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJldHJpZXZlRGF0YSk7XHJcblxyXG5cdGxvZ091dHB1dChcIkluaXRpYWxpemVkIGFwcGxpY2F0aW9uLlwiKTtcclxuXHJcblx0LyoqXHJcblx0ICogbG9vcHMgdGhyb3VnaCBjaGVja2VkIG9wdGlvbnMgYW5kIGNhbGxzIGFwaVxyXG5cdCAqL1xyXG5cdGFzeW5jIGZ1bmN0aW9uIHJldHJpZXZlRGF0YSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuXHRcdGlmKERPTUFJTi5zdGFydHNXaXRoKFwiPFwiKSkge1xyXG5cdFx0XHRsb2dPdXRwdXQoXCJFUlJPUjogUGxlYXNlIHByb3ZpZGUgdmFsaWQgdmFsdWVzIGZvciBET01BSU4gYW5kIEFQSV9LRVkgaW4geW91ciBjb2RlLlwiKTtcclxuXHRcdH0gZWxzZSBpZihcclxuXHRcdFx0IWNoa1Blcm1pc3Npb25zPy5jaGVja2VkICYmXHJcblx0XHRcdCFjaGtSb2xlc1Blcm1pc3Npb25zPy5jaGVja2VkICYmXHJcblx0XHRcdCFjaGtTdWJqZWN0UGVybWlzc2lvbnM/LmNoZWNrZWQgJiZcclxuXHRcdFx0IWNoa015Um9sZXM/LmNoZWNrZWRcclxuXHRcdCkge1xyXG5cdFx0XHRsb2dPdXRwdXQoXCJQbGVhc2Ugc2VsZWN0IGF0IGxlYXN0IG9uZSB0eXBlIG9mIEFQSSBjYWxsIGZyb20gYWJvdmUuXCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYoY2hrTXlSb2xlcz8uY2hlY2tlZCkge1xyXG5cdFx0XHRcdGF3YWl0IHJldHJpZXZlQVBJRGF0YShgJHtET01BSU59L2VudGl0bGVtZW50L2FwaS9hc3NpZ25lZC9tZWAsIFwibXktcm9sZXMtcGVybWlzc2lvbnMuanNvblwiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoY2hrU3ViamVjdFBlcm1pc3Npb25zPy5jaGVja2VkKSB7XHJcblx0XHRcdFx0YXdhaXQgcmV0cmlldmVBUElEYXRhKGAke0RPTUFJTn0vZW50aXRsZW1lbnQvYXBpL2Fzc2lnbmVkL3N1YmplY3RzL3VzZXIvcGVybWlzc2lvbmAsIFwic3ViamVjdC1wZXJtaXNzaW9ucy5qc29uXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihjaGtSb2xlc1Blcm1pc3Npb25zPy5jaGVja2VkKSB7XHJcblx0XHRcdFx0YXdhaXQgcmV0cmlldmVBUElEYXRhKGAke0RPTUFJTn0vZW50aXRsZW1lbnQvYXBpL3YxL3ByaW1pdGl2ZXMvcXVlcnkvcm9sZT9pbmNsdWRlQ2hpbGRyZW49dHJ1ZSZjaGlsZHJlblR5cGU9cGVybWlzc2lvbmAsIFwicm9sZXMtUGVybWlzc2lvbnMuanNvblwiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoY2hrUGVybWlzc2lvbnM/LmNoZWNrZWQpIHtcclxuXHRcdFx0XHRhd2FpdCByZXRyaWV2ZUFQSURhdGEoYCR7RE9NQUlOfS9lbnRpdGxlbWVudC9hcGkvdjEvcHJpbWl0aXZlcy9xdWVyeS9wZXJtaXNzaW9uYCwgXCJwZXJtaXNzaW9ucy5qc29uXCIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsb2dPdXRwdXQoYFRvdGFsIG51bWJlciBvZiBmaWxlcyBkb3dubG9hZGVkOiAke2Rvd25sb2FkQ291bnR9YCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSBlbmRwb2ludFVSTFxyXG5cdCAqIEBwYXJhbSBmaWxlTmFtZVxyXG5cdCAqL1xyXG5cdGFzeW5jIGZ1bmN0aW9uIHJldHJpZXZlQVBJRGF0YShlbmRwb2ludFVSTDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcblx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBnZXREYXRhRnJvbUVuZHBvaW50KGVuZHBvaW50VVJMKTtcclxuXHJcblx0XHRpZihyZXN1bHQgIT09IG51bGwpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRsb2dPdXRwdXQoXCJTYXZpbmcgZGF0YS5cIik7XHJcblx0XHRcdFx0ZG93bmxvYWQocmVzdWx0LCBmaWxlTmFtZSwgXCJ0ZXh0XCIpO1xyXG5cdFx0XHRcdGxvZ091dHB1dChcIkRhdGEgZG93bmxvYWRlZCBzdWNjZXNzZnVsbHkuXCIpO1xyXG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRcdGxvZ091dHB1dChgRXJyb3Igc2F2aW5nIGRhdGE6ICR7ZXJyb3J9YCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIEZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgdG8gYSBmaWxlXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZGF0YVxyXG5cdCAqIEBwYXJhbSBmaWxlbmFtZVxyXG5cdCAqIEBwYXJhbSB0eXBlXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZG93bmxvYWQoZGF0YTogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IGZpbGUgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZSB9KTtcclxuXHJcblx0XHRcdGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuXHRcdFx0XHRcdGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XHJcblx0XHRcdGEuaHJlZiA9IHVybDtcclxuXHRcdFx0YS5kb3dubG9hZCA9IGZpbGVuYW1lO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZChhKTtcclxuXHRcdFx0YS5jbGljaygpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRhLnJlbW92ZSgpO1xyXG5cdFx0XHRcdHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcblx0XHRcdH0sIDApO1xyXG5cclxuXHRcdFx0ZG93bmxvYWRDb3VudCsrO1xyXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0Zm9ybWF0RXJyb3IoZXJyb3IpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gZW5kcG9pbnRVcmxcclxuXHQgKi9cclxuXHRhc3luYyBmdW5jdGlvbiBnZXREYXRhRnJvbUVuZHBvaW50KGVuZHBvaW50VXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bG9nT3V0cHV0KGBSdW5uaW5nIEFQSSBxdWVyeSB0byBmZXRjaCBkYXRhIGZyb20gJHtlbmRwb2ludFVybH1gKTtcclxuXHJcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZW5kcG9pbnRVcmwsIHtcclxuXHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRcIngtb3BlbmZpbi1jbG91ZC1hcGkta2V5XCI6IEFQSV9LRVlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcblx0XHRcdGxvZ091dHB1dChcIkFQSSBjYWxsIGNvbXBsZXRlZC5cIik7XHJcblxyXG5cdFx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgXCJcXHRcIik7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRmb3JtYXRFcnJvcihlcnJvcik7XHJcblx0XHRcdHJldHVybiBcIlwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIGluZm9cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBsb2dPdXRwdXQoaW5mbzogc3RyaW5nKTogdm9pZCB7XHJcblx0aWYgKGxvZ0luZm9ybWF0aW9uKSB7XHJcblx0XHRsb2dJbmZvcm1hdGlvbi50ZXh0Q29udGVudCA9IGAke2xvZ0luZm9ybWF0aW9uLnRleHRDb250ZW50fSR7aW5mb31cXG5cXG5gO1xyXG5cdFx0bG9nSW5mb3JtYXRpb24uc2Nyb2xsVG9wID0gbG9nSW5mb3JtYXRpb24uc2Nyb2xsSGVpZ2h0O1xyXG5cdH1cclxufVxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdGlhbGl6ZURPTSk7XHJcblxyXG4vKipcclxuXHQgKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXHJcblx0ICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxyXG5cdCAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXHJcblx0ICovXHJcbmZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XHJcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XHJcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRyZXR1cm4gZXJyO1xyXG5cdH1cclxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=