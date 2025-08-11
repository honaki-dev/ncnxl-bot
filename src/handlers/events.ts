import { Client } from "../models/Client";
import { Event } from "../models/Event";
import { readdirSync } from "fs";
import { join } from "path";

export async function loads(client: Client) {
    const path = join(__dirname, "../events");
    const files = readdirSync(path).filter((f) => /(ts|js)$/.test(f));
    for (const file of files) {
        const { default: event } = await import(join(path, file));
        if (event instanceof Event) {
            client.on(event.type, (message) => event.run(client, message));
        }
    }
}
