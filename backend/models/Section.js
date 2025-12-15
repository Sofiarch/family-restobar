const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  title: { type: String, required: true },    // e.g. "Foods"
  title_ar: { type: String, required: true }, // e.g. "مأكولات"
  key: { type: String, required: true, unique: true } // e.g. "foods" (used for linking)
});

module.exports = mongoose.model('Section', SectionSchema);