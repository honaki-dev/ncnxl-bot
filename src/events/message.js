const { Event } = require("../models/Event");

module.exports = new Event({
    name: "message",
    execute: async (api, message) => {
        if (!message.body.startsWith(config.prefix)) return;
        const [cmdName, ...args] = message.args;
        const name = cmdName.slice(config.prefix.length).toLowerCase();
        const cmd = commands.get(name);

        if (cmd) {
            try {
                await cmd.execute(api, message, ...args);
            } catch (error) {
                logger.error(`Error in command ${cmdName}:` + error);
            }
        }
    },
});
