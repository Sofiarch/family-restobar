require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp'); // Image processing
const path = require('path');
const fs = require('fs'); // File System
const nodemailer = require('nodemailer'); // Email sending

// Import Models
const MenuItem = require('./models/MenuItem');
const Category = require('./models/Category');
const Section = require('./models/Section');

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. SETUP UPLOADS FOLDER ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// --- 2. MULTER & IMAGE PROCESSING ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const processImage = async (file) => {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
    const filepath = path.join(uploadDir, filename);
    await sharp(file.buffer)
        .resize(800) 
        .webp({ quality: 80 }) 
        .toFile(filepath);
    return `/uploads/${filename}`;
};

const deleteImageFile = (imagePath) => {
    if (imagePath && imagePath.startsWith('/uploads/')) {
        const fullPath = path.join(__dirname, imagePath);
        fs.unlink(fullPath, (err) => {
            if (err && err.code !== 'ENOENT') console.error(`Failed to delete file: ${fullPath}`, err);
        });
    }
};

// --- 3. DB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// --- 4. EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // App Password (not login password)
  }
});

// ================= ROUTES =================

// --- SECURITY: VERIFY PIN ---
app.post('/api/verify-pin', (req, res) => {
  const { pin } = req.body;
  if (pin === process.env.ADMIN_PIN) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid PIN' });
  }
});

// --- MENU ITEMS ---
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/menu', upload.single('image'), async (req, res) => {
  try {
    let imagePath = '/pics/burgers/default.webp';
    if (req.file) imagePath = await processImage(req.file);

    const newItem = new MenuItem({ ...req.body, image: imagePath });
    await newItem.save();
    res.json(newItem);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/menu/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    deleteImageFile(item.image);
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- CATEGORIES ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/categories', upload.single('image'), async (req, res) => {
  try {
    let imagePath = '/pics/categories/default.webp';
    if (req.file) imagePath = await processImage(req.file);

    const newCat = new Category({ ...req.body, image: imagePath });
    await newCat.save();
    res.json(newCat);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    deleteImageFile(cat.image);
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- SECTIONS ---
app.get('/api/sections', async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/sections', async (req, res) => {
  try {
    const newSection = new Section(req.body);
    await newSection.save();
    res.json(newSection);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/sections/:id', async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.json({ message: 'Section deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- ORDERS (EMAIL) ---
app.post('/api/order', async (req, res) => {
  const { userData, cartItems, totalAmount } = req.body;

  try {
    // Build Email HTML
    const orderRows = cartItems.map(item => `
      <tr>
        <td style="padding:8px; border:1px solid #ddd;">${item.title}</td>
        <td style="padding:8px; border:1px solid #ddd;">${item.qty}</td>
        <td style="padding:8px; border:1px solid #ddd;">${(item.price * item.qty).toFixed(3)}</td>
      </tr>
    `).join('');

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #333;">New Order Received!</h2>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
            <h3>Customer</h3>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Phone:</strong> ${userData.phone}</p>
            <p><strong>Notes:</strong> ${userData.address}</p>
        </div>
        <h3>Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #eee;">
                <th style="padding:8px; text-align:left;">Item</th>
                <th style="padding:8px; text-align:left;">Qty</th>
                <th style="padding:8px; text-align:left;">Price</th>
            </tr>
            ${orderRows}
        </table>
        <h3 style="text-align: right; color: #d32f2f;">Total: ${totalAmount.toFixed(3)} IQD</h3>
      </div>
    `;

    // Send Email
    await transporter.sendMail({
      from: `"Restobar Order" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Order: ${userData.name} - ${totalAmount.toFixed(3)} IQD`,
      html: emailContent
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));