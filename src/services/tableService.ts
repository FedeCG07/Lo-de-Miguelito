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
            await this.checkTableAviability(tableNumber);

            const client = await clientRepository.getClientById(idClient);

            if (client.reservedTable) throw new Error('El cliente ya tiene una mesa reservada. Para reservar una mesa nueva cancele la reserva actual')
            
            await tableRepository.reserveTable(tableNumber);
            await clientRepository.reserveTable(idClient, tableNumber);

        } catch (error) {
            throw error;
        }
        
    }

    async cancelTableReservation(tableNumber: number, idClient: number) {
        try {
            await tableRepository.unreserveTable(tableNumber);
            await clientRepository.unreserveTable(idClient);
        } catch (error) {
            throw error;
        }
    }

    async cancelClientReservation(idClient: number) {
        try {
            const client = await clientRepository.getClientById(idClient);

            const tableNumber = client.reservedTable;

            if (!tableNumber) throw new Error('No tiene ninguna mesa reservada')

            this.cancelTableReservation(tableNumber, idClient);
        } catch (error) {
            throw error;
        }
    }

    async unreserveTable(tableNumber: number, role: string) {
        try {
            if (role == 'Client') throw new Error('Debe ser administrador para acceder a esta función');

            const client = await clientRepository.getClientbyTableNumber(tableNumber);

            this.cancelTableReservation(tableNumber, client.idClient);
        } catch (error) {
            throw error;
        }
    }
}