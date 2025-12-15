const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  title_ar: { type: String, required: true },
  type: { type: String, required: true, unique: true }, // e.g., 'burgers'
  section: { type: String, required: true }, // 'foods', 'drinks', 'hookah', 'desserts'
  image: { type: String, required: true }
});

module.exports = mongoose.model('Category', CategorySchema);