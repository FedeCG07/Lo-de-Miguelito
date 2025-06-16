import { HTTPError } from "./HTTPError";

export class AdminError extends HTTPError {
    constructor() {
        super('Debe ser administrador para utilizar esta funcionalidad', 403)
    }
}