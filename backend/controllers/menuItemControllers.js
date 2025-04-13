import MenuItem from '../models/MenuItem.js';
import Menu from '../models/Menu.js';

// GET all menu items by menuName
export const getMenuItems = async (req, res) => {
  try {
    const { menuId } = req.query;
    
    if (!menuId) {
      return res.status(400).json({ success: false, message: "Menu ID is required" });
    }

    const items = await MenuItem.find({ menu: menuId });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error('Error:', error);
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
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid menu item ID format'
      });
    }

    // Check if item exists and delete
    const deletedItem = await MenuItem.findOneAndDelete({ 
      _id: id,
      // Optional: Add owner check if items are user-specific
      // owner: req.user._id 
    });

    if (!deletedItem) {
      return res.status(404).json({ 
        success: false,
        message: 'Menu item not found or already deleted'
      });
    }

    // Log the deletion (optional)
    console.log(`Deleted menu item: ${deletedItem.name} (ID: ${id})`);

    res.status(200).json({ 
      success: true,
      message: 'Menu item deleted successfully',
      data: {
        id: deletedItem._id,
        name: deletedItem.name
      }
    });

  } catch (error) {
    console.error('Error deleting menu item:', error);
    
    // Handle specific errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
