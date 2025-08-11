import { ListenEvent } from "ws3-fca";
import "../src/models/Client";

type EventMap = {
    [E in ListenEvent as E["type"]]: E;
};

declare module "../src/models/Client" {
    interface Client {
        on<E extends keyof EventMap>(
            event: E,
            listener: (event: EventMap[E]) => void
        ): this;

        emit<E extends keyof EventMap>(
            event: E,
            eventData: EventMap[E]
        ): boolean;
    }

    interface Event {
        type: keyof EventMap;
    }
}
