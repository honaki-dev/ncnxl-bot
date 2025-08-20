import { Event } from "../models/Event";

export default new Event({
    type: "message",
    async run(client, message) {
        const videoIdRegex = /https:\/\/www\.tiktok\.com\/@[^/]+\/video\/(\d+)/;
        const content = message.body.trim();
        if (videoIdRegex.test(content)) {
            client.api?.sendMessage(
                "downloading...",
                message.threadID,
                message.messageID
            );
            const stream = await client.modules.tiktok.download(content);
            client.api?.sendMessage(
                {
                    body: "ily nnoc 💞",
                    attachment: [stream],
                },
                message.threadID,
                message.messageID
            );
        }
    },
});
