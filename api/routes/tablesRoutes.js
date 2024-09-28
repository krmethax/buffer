import express from 'express';
import { getTables, getTableById, createTable, updateTable, deleteTable } from '../controllers/tablesController.js';

const router = express.Router();

router.get('/', getTables); // Get all tables
router.get('/:id', getTableById); // Get a table by ID
router.post('/', createTable); // Create a new table
router.put('/:id', updateTable); // Update a table by ID
router.delete('/:id', deleteTable); // Delete a table by ID

export default router;
