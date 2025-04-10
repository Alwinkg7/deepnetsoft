import express from 'express';
import { getMenus, createMenu, deleteMenu } from '../controllers/menuControllers.js';

const router = express.Router();

router.post('/', createMenu); // Create a menu category
router.get('/',  getMenus); // Get all menus
router.delete('/:id', deleteMenu);

export default router;