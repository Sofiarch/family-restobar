import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // <--- 1. Import toast
import { 
    fetchMenu, addItem, deleteItem, 
    fetchCategories, addCategory, deleteCategory, 
    fetchSections, addSection, deleteSection, 
    SERVER_URL 
} from '../api';
import './AdminPanel.css';

const AdminPanel = ({ onBack, isEnglish }) => {
  const [activeTab, setActiveTab] = useState('items'); 
  
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]); 
  const [imageFile, setImageFile] = useState(null);

  // --- TRANSLATIONS ---
  const t = {
    dashboard: isEnglish ? "Admin Dashboard" : "لوحة التحكم",
    back: isEnglish ? "Back" : "رجوع",
    tabItems: isEnglish ? "Manage Items" : "إدارة العناصر",
    tabCategories: isEnglish ? "Manage Categories" : "إدارة التصنيفات",
    tabSections: isEnglish ? "Manage Sections" : "إدارة الأقسام",
    headerAddItem: isEnglish ? "Add Item" : "إضافة عنصر جديد",
    headerAddCat: isEnglish ? "Add Category" : "إضافة تصنيف جديد",
    headerAddSec: isEnglish ? "Add Section (Marquee)" : "إضافة قسم (الشريط العلوي)",
    titleEn: isEnglish ? "Title (English)" : "العنوان (إنجليزي)",
    titleAr: isEnglish ? "Title (Arabic)" : "العنوان (عربي)",
    price: isEnglish ? "Price (IQD)" : "السعر (د.ع)",
    descEn: isEnglish ? "Description (English)" : "الوصف (إنجليزي)",
    descAr: isEnglish ? "Description (Arabic)" : "الوصف (عربي)",
    selectCat: isEnglish ? "Select Category" : "اختر التصنيف",
    selectSec: isEnglish ? "Select Section" : "اختر القسم",
    uniqueId: isEnglish ? "Unique ID (e.g. burgers)" : "معرف فريد (مثل: burgers)",
    uniqueKey: isEnglish ? "Unique Key (e.g. merch)" : "مفتاح فريد (مثل: merch)",
    btnAdd: isEnglish ? "Add" : "إضافة",
    alertMissing: isEnglish ? "Missing required fields!" : "يرجى ملء الحقول المطلوبة!",
    alertAdded: isEnglish ? "Added Successfully!" : "تمت الإضافة بنجاح!",
    confirmDelete: isEnglish ? "Are you sure you want to delete this?" : "هل أنت متأكد من الحذف؟",
    confirmDeleteCat: isEnglish ? "Delete Category? Items inside might disappear!" : "حذف التصنيف؟ العناصر بداخله قد تختفي!"
  };

  const [itemForm, setItemForm] = useState({
    title: '', title_ar: '', price: '', description: '', description_ar: '', category: '', section: ''
  });

  const [catForm, setCatForm] = useState({
    title: '', title_ar: '', type: '', section: ''
  });

  const [secForm, setSecForm] = useState({ 
    title: '', title_ar: '', key: ''
  });

  const loadData = async () => {
    try {
        const iData = await fetchMenu();
        const cData = await fetchCategories();
        const sData = await fetchSections();
        
        setItems(iData);
        setCategories(cData);
        setSections(sData);

        if(cData.length > 0 && !itemForm.category) setItemForm(prev => ({...prev, category: cData[0].type}));
        if(sData.length > 0) {
            if(!itemForm.section) setItemForm(prev => ({...prev, section: sData[0].key}));
            if(!catForm.section) setCatForm(prev => ({...prev, section: sData[0].key}));
        }
    } catch (e) {
        console.error("Error loading data", e);
        toast.error("Failed to load data");
    }
  };

  useEffect(() => { loadData(); }, []);

  // --- ITEM HANDLER ---
  const handleItemSubmit = async (e) => {
    e.preventDefault();
    // <--- 2. Use toast.error
    if (!itemForm.title || !itemForm.price || !itemForm.category) return toast.error(t.alertMissing);

    const loadingToast = toast.loading("Uploading..."); // Show loading state

    try {
        const data = new FormData();
        Object.keys(itemForm).forEach(key => data.append(key, itemForm[key]));
        if (imageFile) data.append('image', imageFile);

        await addItem(data);
        
        toast.dismiss(loadingToast);
        toast.success(t.alertAdded); // <--- 3. Use toast.success

        setImageFile(null);
        document.getElementById('fileInput').value = "";
        loadData();
    } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Error adding item");
    }
  };

  // --- CATEGORY HANDLER ---
  const handleCatSubmit = async (e) => {
    e.preventDefault();
    if (!catForm.title || !catForm.type) return toast.error(t.alertMissing);

    const loadingToast = toast.loading("Uploading...");

    try {
        const data = new FormData();
        Object.keys(catForm).forEach(key => data.append(key, catForm[key]));
        if (imageFile) data.append('image', imageFile);

        await addCategory(data);
        
        toast.dismiss(loadingToast);
        toast.success(t.alertAdded);

        setImageFile(null);
        document.getElementById('catFileInput').value = "";
        loadData();
    } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Error adding category");
    }
  };

  // --- SECTION HANDLER ---
  const handleSecSubmit = async (e) => {
    e.preventDefault();
    if (!secForm.title || !secForm.key) return toast.error(t.alertMissing);
    
    try {
        await addSection(secForm);
        toast.success(t.alertAdded);
        setSecForm({ title: '', title_ar: '', key: '' });
        loadData();
    } catch (error) {
        toast.error("Error adding section");
    }
  };

  // --- DELETES ---
  const handleDeleteItem = async (id) => { 
      if (confirm(t.confirmDelete)) { 
          await deleteItem(id); 
          toast.success("Deleted!"); 
          loadData(); 
      } 
  };
  const handleDeleteCat = async (id) => { 
      if (confirm(t.confirmDeleteCat)) { 
          await deleteCategory(id); 
          toast.success("Deleted!"); 
          loadData(); 
      } 
  };
  const handleDeleteSec = async (id) => { 
      if (confirm(t.confirmDelete)) { 
          await deleteSection(id); 
          toast.success("Deleted!"); 
          loadData(); 
      } 
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <button onClick={onBack} className="back-btn">
             <i className={`fa-solid ${isEnglish ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i> {t.back}
        </button>
        <h2>{t.dashboard}</h2>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button 
            className="add-btn" 
            style={{ flex: 1, background: activeTab === 'items' ? '#EAC8CA' : '#333', color: activeTab === 'items' ? '#000' : '#fff' }}
            onClick={() => setActiveTab('items')}
        >
            {t.tabItems}
        </button>
        <button 
            className="add-btn" 
            style={{ flex: 1, background: activeTab === 'categories' ? '#EAC8CA' : '#333', color: activeTab === 'categories' ? '#000' : '#fff' }}
            onClick={() => setActiveTab('categories')}
        >
            {t.tabCategories}
        </button>
        <button 
            className="add-btn" 
            style={{ flex: 1, background: activeTab === 'sections' ? '#EAC8CA' : '#333', color: activeTab === 'sections' ? '#000' : '#fff' }}
            onClick={() => setActiveTab('sections')}
        >
            {t.tabSections}
        </button>
      </div>

      {/* --- ITEMS TAB --- */}
      {activeTab === 'items' && (
        <>
            <form className="admin-form" onSubmit={handleItemSubmit}>
                <h3>{t.headerAddItem}</h3>
                <div className="form-row">
                    <input className="admin-input" placeholder={t.titleEn} value={itemForm.title} onChange={e => setItemForm({...itemForm, title: e.target.value})} />
                    <input className="admin-input" placeholder={t.titleAr} value={itemForm.title_ar} onChange={e => setItemForm({...itemForm, title_ar: e.target.value})} />
                </div>
                <div className="form-row">
                    <input className="admin-input" placeholder={t.descEn} value={itemForm.description} onChange={e => setItemForm({...itemForm, description: e.target.value})} />
                    <input className="admin-input" placeholder={t.descAr} value={itemForm.description_ar} onChange={e => setItemForm({...itemForm, description_ar: e.target.value})} />
                </div>
                <div className="form-row">
                    <input type="number" step="0.1" className="admin-input" placeholder={t.price} value={itemForm.price} onChange={e => setItemForm({...itemForm, price: e.target.value})} />
                    <select className="admin-input" value={itemForm.category} onChange={e => setItemForm({...itemForm, category: e.target.value})}>
                        <option value="">{t.selectCat}</option>
                        {categories.map(cat => <option key={cat._id} value={cat.type}>{isEnglish ? cat.title : cat.title_ar}</option>)}
                    </select>
                </div>
                <div className="form-row">
                    <input id="fileInput" type="file" className="admin-input" onChange={e => setImageFile(e.target.files[0])} />
                </div>
                <button type="submit" className="add-btn">{t.btnAdd}</button>
            </form>
            <div className="admin-item-list">
                {items.map(item => (
                    <div key={item._id} className="admin-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {item.image && (
                                <img 
                                    src={item.image.startsWith('/uploads') ? `${SERVER_URL}${item.image}` : item.image} 
                                    alt="thumb" 
                                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                            )}
                            <div>
                                <span>{isEnglish ? item.title : item.title_ar}</span>
                                <br/>
                                <small style={{opacity: 0.6}}>{item.price} IQD</small>
                            </div>
                        </div>
                        <button className="delete-btn" onClick={() => handleDeleteItem(item._id || item.id)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                ))}
            </div>
        </>
      )}

      {/* --- CATEGORIES TAB --- */}
      {activeTab === 'categories' && (
        <>
            <form className="admin-form" onSubmit={handleCatSubmit}>
                <h3>{t.headerAddCat}</h3>
                <div className="form-row">
                    <input className="admin-input" placeholder={t.titleEn} value={catForm.title} onChange={e => setCatForm({...catForm, title: e.target.value})} />
                    <input className="admin-input" placeholder={t.titleAr} value={catForm.title_ar} onChange={e => setCatForm({...catForm, title_ar: e.target.value})} />
                </div>
                <div className="form-row">
                    <input className="admin-input" placeholder={t.uniqueId} value={catForm.type} onChange={e => setCatForm({...catForm, type: e.target.value.toLowerCase()})} />
                    <select className="admin-input" value={catForm.section} onChange={e => setCatForm({...catForm, section: e.target.value})}>
                        <option value="">{t.selectSec}</option>
                        {sections.map(sec => (
                            <option key={sec._id} value={sec.key}>{isEnglish ? sec.title : sec.title_ar}</option>
                        ))}
                    </select>
                </div>
                <div className="form-row">
                    <input id="catFileInput" type="file" className="admin-input" onChange={e => setImageFile(e.target.files[0])} />
                </div>
                <button type="submit" className="add-btn">{t.btnAdd}</button>
            </form>
            <div className="admin-item-list">
                {categories.map(cat => (
                    <div key={cat._id} className="admin-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                             {cat.image && (
                                <img 
                                    src={cat.image.startsWith('/uploads') ? `${SERVER_URL}${cat.image}` : cat.image} 
                                    alt="thumb" 
                                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                            )}
                            <span>{isEnglish ? cat.title : cat.title_ar}</span>
                        </div>
                        <button className="delete-btn" onClick={() => handleDeleteCat(cat._id)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                ))}
            </div>
        </>
      )}

      {/* --- SECTIONS TAB --- */}
      {activeTab === 'sections' && (
        <>
            <form className="admin-form" onSubmit={handleSecSubmit}>
                <h3>{t.headerAddSec}</h3>
                <div className="form-row">
                    <input className="admin-input" placeholder={t.titleEn} value={secForm.title} onChange={e => setSecForm({...secForm, title: e.target.value})} />
                    <input className="admin-input" placeholder={t.titleAr} value={secForm.title_ar} onChange={e => setSecForm({...secForm, title_ar: e.target.value})} />
                </div>
                <div className="form-row">
                    <input className="admin-input" placeholder={t.uniqueKey} value={secForm.key} onChange={e => setSecForm({...secForm, key: e.target.value.toLowerCase().replace(/\s/g,'')})} />
                </div>
                <button type="submit" className="add-btn">{t.btnAdd}</button>
            </form>
            
            <div className="admin-item-list">
                {sections.map(sec => (
                    <div key={sec._id} className="admin-item">
                        <span>{isEnglish ? sec.title : sec.title_ar}</span>
                        <button className="delete-btn" onClick={() => handleDeleteSec(sec._id)}><i className="fa-solid fa-trash"></i></button>
                    </div>
                ))}
            </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;