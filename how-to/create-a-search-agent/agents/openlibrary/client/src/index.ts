import { Search } from "@openfin/cloud-api";
import { init as getSearchAgent } from "./search";


async function init() {
    const openLibrarySearchAgent = await getSearchAgent(
        {
            info: (message: unknown, ...optionalParams: unknown[]) => {
                console.log(message, optionalParams);
            },
            error: (message: unknown, ...optionalParams: unknown[]) => {
                console.error(message, optionalParams);
            },
            warn: function (message: unknown, ...optionalParams: unknown[]): void {
                console.warn(message, optionalParams);
            },
            trace: function (message: unknown, ...optionalParams: unknown[]): void {
                console.trace(message, optionalParams);
            },
            debug: function (message: unknown, ...optionalParams: unknown[]): void {
                console.debug(message, optionalParams);
            }
        }
    )
    const searchAgent = await Search.register(openLibrarySearchAgent);
    await searchAgent.isReady()
}

window.addEventListener("load", async () => {
	await init();
});