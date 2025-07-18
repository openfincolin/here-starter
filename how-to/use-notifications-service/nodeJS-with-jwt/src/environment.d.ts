declare global {
    namespace NodeJS {
        type ProcessEnvironment = {
            AUTHENTICATION_ID: string;
            AUTHENTICATION_BASIC_USERNAME: string;
            AUTHENTICATION_BASIC_PASSWORD: string;
        };
    }
}
