class Command {
    /**
     * A command model for create a new command
     *
     * @param {object} options - The options of command
     * @param {string} options.name - The name of command
     * @param {string} options.description - The description of command
     * @param {(api: any, message: any) => void} options.execute - The execute of command
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
        this.description = options.description ?? "No description.";

        this.__isCommand = true;

        Object.freeze(this);
    }
}

module.exports = { Command };
