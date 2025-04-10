import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  Menuname: {
    type: String,
    required: [true, 'Please add a menu name'],
    trim: true
  },
  menuitems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem"  // This will link back to the MenuItem model
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
