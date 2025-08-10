const { Command } = require("../models/Command");

module.exports = new Command({
    name: "ping",
    description: "Ping command",
    execute: async (api, message) => {
        api.sendMessage(
            "Pong",
            message.threadID,
            emptyFunction,
            message.messageID
        );
    },
});
