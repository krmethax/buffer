import express from 'express';
import { getMenu, addMenu, updateMenuItem, deleteMenu, getMenuById } from '../controllers/menuController.js';

const router = express.Router();

// Define routes
router.get('/', getMenu); // Get all menus
router.post('/', addMenu); // Add a new menu item
router.get('/:id', getMenuById); // Get menu item by ID
router.put('/:id', updateMenuItem); // Update a menu item
router.delete('/:id', deleteMenu); // Delete a menu item
router.put('/:id', updateMenuItem);
export default router;
