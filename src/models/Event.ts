import { Client } from "../models/Client";
import { EventMap } from "types";

export interface EventOptions<E extends keyof EventMap> {
    type: E;
    run: (client: Client, message: EventMap[E]) => void;
}

export class Event<E extends keyof EventMap = keyof EventMap> {
    public type: E;
    public run: (client: Client, message: EventMap[E]) => void;

    constructor(options: EventOptions<E>) {
        this.type = options.type;
        this.run = options.run;

        Object.freeze(this);
    }
}
