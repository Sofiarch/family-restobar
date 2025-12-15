require('dotenv').config();
const mongoose = require('mongoose');
const Section = require('./models/Section');

const runSeed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('DB Connected...');

  const sections = [
    { title: 'Foods', title_ar: 'مأكولات', key: 'foods' },
    { title: 'Drinks', title_ar: 'مشروبات', key: 'drinks' },
    { title: 'Hookah', title_ar: 'أركيلة', key: 'hookah' },
    { title: 'Desserts', title_ar: 'حلويات', key: 'desserts' },
  ];

  await Section.deleteMany({});
  await Section.insertMany(sections);
  console.log('Sections Imported!');
  process.exit();
};

runSeed();