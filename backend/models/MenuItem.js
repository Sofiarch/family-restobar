// backend/models/MenuItem.js
const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  title_ar: { type: String, required: true },
  description: String,
  description_ar: String,
  price: { type: Number, required: true },
  image: String, // URL or path to image
  category: { type: String, required: true }, // e.g., 'burgers', 'pizza'
  section: { type: String, required: true },  // e.g., 'foods', 'drinks'
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);