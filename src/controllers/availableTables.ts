import { Request, Response } from 'express';
import { TableService } from '../services/tableService';

const tableService = new TableService();

export async function availableTables(_: Request, res: Response) {
    try {
        const tables = await tableService.checkAvaibleTables();
        res.status(200).json(tables);
    } catch (error) {
        throw error;
    }
}