const Login = require("@dongdev/fca-unofficial");
const Logger = require("@dongdev/fca-unofficial/lib/logger");
const { readFileSync, readdirSync } = require("fs");
const { EventEmitter } = require("events");
const { join } = require("path");

const config = require("../config.json");

globalThis.config = config;

globalThis.logger = {
    info: (message) => Logger(message, "info"),
    error: (message) => Logger(message, "error"),
    warn: (message) => Logger(message, "warn"),
};

globalThis.commands = new Map();
globalThis.botEvent = new EventEmitter();
globalThis.emptyFunction = function () {};

const appState = JSON.parse(readFileSync("appState.json", "utf8"));
const credentials = { appState };
const options = {
    listenEvents: true,
    updatePresence: true,
    autoMarkRead: true,
};

const callback = (error, api) => {
    if (error) throw new Error(error);

    // Load events
    const eventsPath = join(__dirname, "events");
    const eventFiles = readdirSync(eventsPath).filter((f) => f.endsWith(".js"));
    const events = eventFiles.map((f) => require(join(eventsPath, f)));
    for (const event of events) {
        if (event.__isEvent) {
            logger.info(`Loaded event: ${event.name}`);
            botEvent.on(event.name, (message) => event.execute(api, message));
        }
    }

    // Load commands
    const cmdsPath = join(__dirname, "commands");
    const cmdFiles = readdirSync(cmdsPath).filter((f) => f.endsWith(".js"));
    const cmds = cmdFiles.map((f) => require(join(cmdsPath, f)));
    for (const cmd of cmds) {
        if (cmd.__isCommand) {
            logger.info(`Loaded command: ${cmd.name}`);
            commands.set(cmd.name, cmd);
        }
    }

    api.listenMqtt((error, message) => {
        if (error) logger.error("mqtt-error: " + error);
        // logger.info("mqtt-message: \n" + JSON.stringify(message, null, 2));
        if (typeof message.type === "string") {
            const type = message.type;
            botEvent.emit(type, message);
        }
    });
};

Login(credentials, options, callback);
