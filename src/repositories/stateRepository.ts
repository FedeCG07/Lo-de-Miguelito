import { State } from "@prisma/client";
import { HTTPError } from '../errors/HTTPError';

import { db } from "../db/db";

export class StateRepository {
    async getState(idState: number) {
        const state = await db.state.findUnique({
            where: {
                idState
            }
        })

        if (!state) throw new HTTPError("No se encontró el estado con id: " + idState, 404)
        
        return state;
    }
}