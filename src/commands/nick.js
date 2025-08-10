const { Command } = require("../models/Command");

module.exports = new Command({
    name: "nick",
    description: "Change nickname",
    execute: async (api, message, ...nick) => {
        if (nick.length > 5) {
            return message.reply("Biệt danh không vượt quá 5 từ!");
        }
        nick = nick.join(" ");
        await api.changeNickname(nick, message.threadID, message.senderID);
        await message.reply(`Đã đặt biệt danh cho bạn là: ${nick}`);
    },
});
