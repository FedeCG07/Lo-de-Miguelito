import { State } from "@prisma/client";

import { db } from "../db/db";

export class StateRepository {
    async getStateById(idState: number) {
        const state = await db.state.findUnique({
            where: {
                idState
            },
            select: {
                state: true
            }
        })
        
        return state;
    }
}