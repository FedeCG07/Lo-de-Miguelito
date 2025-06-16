import { HTTPError } from "./HTTPError";

export class noAccountError extends HTTPError {
    constructor() {
        super('Debe iniciar sesión para utilizar esta funcionalidad', 401)
    }
}