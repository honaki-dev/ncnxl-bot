const { Command } = require("../models/Command");

const AZURE_ENDPOINT =
    "https://gwaddin.openai.azure.com/openai/deployments/azure-gpt-4o/chat/completions?api-version=2025-03-01-preview";

async function callAzureGPT4(messages) {
    const response = await fetch(AZURE_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": client.config.azure_api_key,
        },
        body: JSON.stringify({
            messages: messages,
            max_tokens: 1000,
            temperature: 0.7,
            top_p: 0.95,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}
module.exports = new Command({
    name: "ai",
    description: "AI command",
    execute: async (api, message, ...args) => {
        const messages = [
            { role: "system", content: client.prompt },
            { role: "user", content: args.join(" ") },
        ];

        const answer = await callAzureGPT4(messages);
        if (!answer) return message.reply("Không thể trả lời!");

        await message.reply(answer);
    },
});
