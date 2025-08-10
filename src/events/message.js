const { Event } = require("../models/Event");

module.exports = new Event({
    name: "message",
    execute: async (api, message) => {
        if (!message.body.startsWith(client.config.prefix)) return;
        const [cmdName, ...args] = message.args;
        const name = cmdName.slice(client.config.prefix.length).toLowerCase();
        const cmd = client.commands.get(name);

        if (cmd) {
            try {
                await cmd.execute(api, message, ...args);
            } catch (error) {
                client.logger.error(`Error in command ${cmdName}:` + error);
            }
        }
    },
});
