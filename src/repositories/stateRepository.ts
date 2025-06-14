import { State } from "@prisma/client";

import { db } from "../db/db";

export class StateRepository {
    async getState(idState: number) {
        const state = await db.state.findUnique({
            where: {
                idState
            }
        })

        if (!state) throw new Error("No se encontró el éstado con id: " + idState)
        
        return state;
    }
}