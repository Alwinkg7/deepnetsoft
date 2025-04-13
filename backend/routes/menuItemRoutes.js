import express from 'express';
import { getMenuItems, createMenuItem, deleteMenuItem } from '../controllers/menuItemControllers.js';

const router = express.Router();

router.post('/', createMenuItem); // Create a menu item
router.get('/', getMenuItems); // Uses query parameters
router.delete('/:id', deleteMenuItem);

export default router;