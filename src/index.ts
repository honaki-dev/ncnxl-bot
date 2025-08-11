import { readdirSync, readFileSync } from "fs";
import { Client } from "./models/Client";
import { join } from "path";

const client = new Client({
    randomUserAgent: false,
    autoMarkDelivery: true,
    autoMarkRead: true,
    autoReconnect: true,
});

async function main() {
    const path = join(__dirname, "handlers");
    for (const file of readdirSync(path).filter((f) => /(ts|js)$/.test(f))) {
        const handler = await import(join(path, file));
        await handler.loads(client);
    }

    const appState = JSON.parse(readFileSync("./appState.json", "utf-8"));
    await client.login({ appState });
}

main();
