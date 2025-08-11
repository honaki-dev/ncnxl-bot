import { Command } from "./../../models/Command";
export default new Command({
    name: "ping",
    alias: ["pong"],
    description: "Ping pong",
    category: "General",
    usage: "ping",
    run: async ({ api }, message) => {
        await api?.sendMessage("Pong!", message.threadID, message.messageID);
    },
});
