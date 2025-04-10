import MenuItem from '../models/MenuItem.js';
import Menu from '../models/Menu.js';

// GET all menu items by menuName
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ menuName: req.params.menuName }); // Changed menuId to menuName
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    console.error('Error fetching menu items:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// CREATE a new menu item
export const createMenuItem = async (req, res) => {
  const { name, description, price, menuName } = req.body;

  if (!name || !description || !price || !menuName) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  try {
    // Find the menu by its name
    const menu = await Menu.findOne({ Menuname: menuName });

    if (!menu) {
      return res.status(404).json({ success: false, message: "Menu not found" });
    }

    // Create a new MenuItem and associate it with the menu
    const newMenuItem = new MenuItem({ 
      name, 
      description, 
      price, 
      menu: menu._id  // Store the menu's ObjectId in the menu field
    });

    // Save the new menu item
    await newMenuItem.save();

    // Update the Menu document to include the new MenuItem in the menuitems array
    menu.menuitems.push(newMenuItem._id);
    await menu.save();

    res.status(201).json({ success: true, data: newMenuItem });
  } catch (error) {
    console.error('Error creating menu item:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    const deletedItem = await MenuItem.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
