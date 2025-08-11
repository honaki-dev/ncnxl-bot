import { Client } from "../models/Client";
import { Command } from "../models/Command";
import { readdirSync } from "fs";
import { join } from "path";

export async function loads(client: Client) {
    const path = join(__dirname, "../commands");
    for (const folder of readdirSync(path)) {
        const folderPath = join(path, folder);
        const files = readdirSync(folderPath).filter((f) => /(ts|js)$/.test(f));
        for (const file of files) {
            const { default: command } = await import(join(folderPath, file));
            if (command instanceof Command) {
                client.commands.set(command.name, command);
                command.alias.forEach((a) => client.commands.set(a, command));
            }
        }
    }
}
