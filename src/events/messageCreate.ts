import { Event } from "../models/Event";

export default new Event({
    type: "message",
    run(client, message) {
        const { body } = message;
        if (!body.startsWith("/")) return;
        const [commandName, ...args] = body.slice(1).split(" ");
        const command = client.commands.get(commandName.toLowerCase());
        if (!command) return;
        command.run(client, message, ...args);
    },
});
