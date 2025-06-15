import { TableRepository } from "../repositories/tableRepository";
import { ClientRepository } from "../repositories/clientRepository";
import { error, table } from "console";

const tableRepository = new TableRepository();
const clientRepository = new ClientRepository();

export class TableService {
    async checkTableAviability(tableNumber: number) {
        try {
            const table = await tableRepository.getTable(tableNumber);

            if (!table) throw new Error('No existe la mesa número ' + tableNumber);

            if (table.reserved) throw new Error('La mesa ' + tableNumber + ' está ocupada');
        } catch (error) {
            throw error;
        }
    }

    async checkAvaibleTables() {
        try {
            const tables = await tableRepository.checkAllAvailableTables();
            const avaibleTables = [];

            for (const table of tables) {
                avaibleTables.push(table.tableNumber);
            }

            return avaibleTables;
        } catch (error) {
            throw error;
        }
    }

    async reserveTable(tableNumber: number, idClient: number) {
        try {
            await tableRepository.reserveTable(tableNumber);

            const client = await clientRepository.reserveTable(idClient, tableNumber);

            if (!client) {
                await tableRepository.unreserveTable(tableNumber);
                throw new Error('No existe el usuario con id: ' + idClient);
            }
        } catch (error) {
            throw error;
        }
        
    }

    async unreserveTable(tableNumber: number) {
        await tableRepository.unreserveTable(tableNumber);

        const client = await clientRepository.getClientbyReservedTable(tableNumber);
        await clientRepository.unreserveTable(client.idClient);
    }
}