const Login = require("@dongdev/fca-unofficial");
const Logger = require("@dongdev/fca-unofficial/lib/logger");
const { readFileSync } = require("fs");

globalThis.logger = {
    info: (message) => Logger(message, "info"),
    error: (message) => Logger(message, "error"),
    warn: (message) => Logger(message, "warn"),
};

const appState = JSON.parse(readFileSync("appState.json", "utf8"));
const credentials = { appState };
const options = {
    listenEvents: true,
    updatePresence: true,
    autoMarkRead: true,
};

const callback = (error, api) => {
    if (error) throw new Error(error);

    api.listenMqtt((error, message) => {
        if (error) logger.error("mqtt-error: " + error);
        logger.info("mqtt-message: \n" + JSON.stringify(message, null, 2));
    });
};

Login(credentials, options, callback);
