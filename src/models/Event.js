class Event {
    /**
     * A event model for create a new event
     *
     * @param {object} options - The options of event
     * @param {import('../types/index').EventType} options.name - The name of event
     * @param {(api: any, message: any) => void} options.execute - The execute of event
     */
    constructor(options) {
        if (!options.name || !options.execute) {
            throw new Error("Missing name or execute.");
        }

        if (typeof options.execute !== "function") {
            throw new TypeError("Execute must be a function.");
        }

        this.name = options.name;
        this.execute = options.execute;

        this.__isEvent = true;

        Object.freeze(this);
    }
}

module.exports = { Event };
