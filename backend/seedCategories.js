require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

const runSeed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('DB Connected...');

  const categories = [
    { title: 'Burgers', title_ar: 'برجر', type: 'burgers', section: 'foods', image: '/pics/categories/burgers.webp' },
    { title: 'Pizza', title_ar: 'بيتزا', type: 'pizza', section: 'foods', image: '/pics/categories/pizza.webp' },
    { title: 'Shawrma', title_ar: 'شاورما', type: 'shawrma', section: 'foods', image: '/pics/categories/shawrma.webp' },
    { title: 'Eastern', title_ar: 'شرقي', type: 'eastern', section: 'foods', image: '/pics/categories/eastern.webp' },
    { title: 'Hot Drinks', title_ar: 'مشروبات ساخنة', type: 'hot_drinks', section: 'drinks', image: '/pics/categories/hotdrinks.webp' },
    { title: 'Fresh Juices', title_ar: 'عصائر طبيعية', type: 'juices', section: 'drinks', image: '/pics/categories/freshjuices.webp' },
    { title: 'Mojitos', title_ar: 'موهيتو', type: 'mojitos', section: 'drinks', image: '/pics/categories/mojitos.webp' },
    { title: 'Classic Hookah', title_ar: 'أركيلة كلاسيك', type: 'hookah_classic', section: 'hookah', image: '/pics/categories/classichookah.webp' },
    { title: 'Special Mixes', title_ar: 'خلطات خاصة', type: 'hookah_special', section: 'hookah', image: '/pics/categories/specialmixes.webp' },
    { title: 'Cakes & Sweets', title_ar: 'حلويات', type: 'desserts', section: 'desserts', image: '/pics/categories/desserts.webp' },
  ];

  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log('Categories Imported!');
  process.exit();
};

runSeed();