import Menu from "../models/Menu.js";
import mongoose from "mongoose";


export const getMenus = async (req, res) => {
    try {
      const menus = await Menu.find().populate('menuitems'); // Populate the menuitems field with MenuItem data
      res.status(200).json({ success: true, data: menus });
    } catch (error) {
      console.error('Error fetching menus:', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

export const createMenu = async (req, res) => {
    const { Menuname } = req.body;
  
    if (!Menuname) {
      return res.status(400).json({ success: false, message: "Please provide a menu name" });
    }
  
    try {
      // Create a new Menu
      const newMenu = new Menu({ Menuname });
      await newMenu.save();
  
      res.status(201).json({ success: true, data: newMenu });
    } catch (error) {
      console.error('Error creating menu:', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };


// Delete a menu
export const deleteMenu = async (req, res) => {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.json({ message: 'Menu deleted' });
  };