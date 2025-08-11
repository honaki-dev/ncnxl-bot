import { Client } from "../models/Client";
import { EventMap } from "types";

type Run = (
    client: Client,
    message: EventMap["message"],
    ...args: string[]
) => void;

export interface CommandOptions {
    name: string;
    alias?: string[];
    description: string;
    category: string;
    usage?: string;
    run: Run;
}

export class Command {
    public name: string;
    public alias: string[];
    public description: string;
    public category: string;
    public usage: string;
    public run: Run;

    constructor(options: CommandOptions) {
        this.name = options.name;
        this.alias = options.alias ?? [];
        this.description = options.description;
        this.category = options.category;
        this.usage = options.usage ?? "";
        this.run = options.run;
    }
}
