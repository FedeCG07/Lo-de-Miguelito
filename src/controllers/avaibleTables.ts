import { Request, Response } from 'express';
import { TableService } from '../services/tableService';

const tableService = new TableService();

export async function avaibleTables(_: Request, res: Response) {
    try {
        const tables = await tableService.checkAvaibleTables();
        res.json(tables);
    } catch (error) {
        throw error;
    }
}