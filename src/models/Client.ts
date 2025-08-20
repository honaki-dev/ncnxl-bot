import EventEmitter from "node:events";
import {
    LoginOptions,
    LoginCredentials,
    login,
    API,
    ListenEvent,
} from "ws3-fca";
import { Command } from "./Command";

export class Client extends EventEmitter {
    public options: LoginOptions;
    public api?: API;

    public commands: Map<string, Command>;

    public modules: Record<string, any>;

    constructor(options: LoginOptions) {
        super();

        this.options = options;

        this.commands = new Map();

        this.modules = {};
        this.modules.tiktok = require("../modules/TiktokDownloader");
    }

    async login(credentials: LoginCredentials): Promise<void> {
        return new Promise((resolve, reject) => {
            login(credentials, this.options, (error: any, api) => {
                if (error || !api) throw reject(new Error(error));
                this.api = api;
                this.api.listenMqtt((error: any, event: ListenEvent) => {
                    if (error) throw new Error(error);
                    this.emit(event.type, event);
                });
                resolve();
            });
        });
    }
}
