import express from 'express';
import { getMenuItems, createMenuItem, deleteMenuItem } from '../controllers/menuItemControllers.js';

const router = express.Router();

router.post('/', createMenuItem); // Create a menu item
router.get('/:menuId', getMenuItems); // Get all items for a specific menu
router.delete('/:id', deleteMenuItem);

export default router;