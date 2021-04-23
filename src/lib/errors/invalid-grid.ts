export class InvalidGridError extends Error {
    constructor() {
        super();
        this.message = "Game grid size must be only composed of positive finite numbers";
    }
}