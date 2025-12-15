import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast'; 
import Header from './components/Header';
import Marquee from './components/Marquee';
import SearchBar from './components/SearchBar';
import CategoryCard from './components/CategoryCard';
import MenuItemCard from './components/MenuItemCard';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel'; 
import { 
  fetchMenu, 
  fetchCategories, 
  fetchSections, 
  placeOrder, 
  verifyAdminPin, 
  SERVER_URL 
} from './api'; 
import './App.css'; 

function App() {
  const [isEnglish, setIsEnglish] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); 
  
  const [activeSection, setActiveSection] = useState('foods');
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [cart, setCart] = useState({});
  const [isCheckout, setIsCheckout] = useState(false);
  
  // --- Data State ---
  const [showAdmin, setShowAdmin] = useState(false);
  const [menuItems, setMenuItems] = useState({});
  const [categories, setCategories] = useState([]); 
  const [sections, setSections] = useState([]); 

  // --- Secure Admin PIN Logic ---
  const handleAdminAccess = async () => {
    const pin = prompt(isEnglish ? "Enter Admin PIN:" : "أدخل الرمز السري:");
    if (!pin) return; 

    const loadingToast = toast.loading("Verifying...");

    try {
      const response = await verifyAdminPin(pin);
      toast.dismiss(loadingToast);

      if (response.success) { 
        setShowAdmin(true);
        toast.success(isEnglish ? "Welcome Admin" : "مرحباً بك");
      } else {
        toast.error(isEnglish ? "Incorrect PIN" : "رمز خاطئ");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error(error);
      toast.error("Server connection failed");
    }
  };

  // --- Fetch Data on Load ---
  useEffect(() => {
    // A. Fetch Menu Items
    fetchMenu()
      .then(data => {
        const grouped = data.reduce((acc, item) => {
          const processedItem = { ...item, id: item.id || item._id };
          if (!acc[processedItem.category]) acc[processedItem.category] = [];
          acc[processedItem.category].push(processedItem);
          return acc;
        }, {});
        setMenuItems(grouped);
      })
      .catch(err => console.error("Failed to load menu:", err));

    // B. Fetch Categories
    fetchCategories()
      .then(data => setCategories(data))
      .catch(err => console.error("Failed to load categories:", err));

    // C. Fetch Sections
    fetchSections()
      .then(data => {
        setSections(data);
        if (data.length > 0) setActiveSection(data[0].key);
      })
      .catch(err => console.error("Failed to load sections:", err));
  }, []);

  const t = {
    back: isEnglish ? "Back" : "رجوع",
    noResults: isEnglish ? "No results found" : "لا توجد نتائج",
    comingSoon: isEnglish ? "Coming Soon..." : "قريباً...",
    emptyMenu: isEnglish ? "No items added yet." : "لم يتم إضافة عناصر بعد.",
    showOrder: isEnglish ? "Show my order" : "عرض طلبي",
    orderPlaced: isEnglish ? "Order Placed Successfully!" : "تم استلام طلبك بنجاح!",
    total: isEnglish ? "Total" : "المجموع",
    foundItems: isEnglish ? "Matching Items" : "عناصر مطابقة"
  };

  const addToCart = (item) => {
    setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  };

  const removeFromCart = (item) => {
    setCart(prev => {
      const currentQty = prev[item.id] || 0;
      if (currentQty <= 1) {
        const newCart = { ...prev };
        delete newCart[item.id];
        return newCart;
      }
      return { ...prev, [item.id]: currentQty - 1 };
    });
  };

  const deleteFromCart = (itemId) => {
    setCart(prev => {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
    });
  };

  const handlePlaceOrder = async (userData, totalAmount) => {
    const allItems = Object.values(menuItems).flat();
    const cartItems = Object.entries(cart).map(([id, qty]) => {
      const item = allItems.find(i => String(i.id) === String(id) || i._id === id);
      return { ...item, qty };
    });

    const loadingToast = toast.loading(isEnglish ? "Sending Order..." : "جاري إرسال الطلب...");

    try {
      const result = await placeOrder({ userData, cartItems, totalAmount });
      
      toast.dismiss(loadingToast);

      if (result && result.success) {
        toast.success(`${t.orderPlaced}\n${t.total}: ${totalAmount.toFixed(3)}`, { duration: 5000 });
        setCart({});
        setIsCheckout(false);
        setSelectedCategory(null);
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Order error:", error);
      toast.error("Could not connect to the server.");
    }
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const visibleCategories = categories.filter((cat) => {
    const titleToCheck = isEnglish ? cat.title : (cat.title_ar || cat.title);
    if (searchTerm) {
      return titleToCheck.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return cat.section === activeSection;
  });

  const getVisibleMenuItems = () => {
    if (!searchTerm) return [];
    const allItems = Object.values(menuItems).flat();
    return allItems.filter(item => {
        const title = isEnglish ? item.title : (item.title_ar || item.title);
        const description = isEnglish ? item.description : (item.description_ar || item.description);
        const term = searchTerm.toLowerCase();
        return (title && title.toLowerCase().includes(term)) || 
               (description && description.toLowerCase().includes(term));
    });
  };

  const visibleMenuItems = getVisibleMenuItems();
  const hasResults = visibleCategories.length > 0 || visibleMenuItems.length > 0;

  // --- VIEW 1: ADMIN PANEL ---
  if (showAdmin) {
    return (
      <div className={`mobile-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'} ${!isEnglish ? 'arabic' : ''}`} dir={isEnglish ? 'ltr' : 'rtl'}>
          <Toaster position="top-center" />
          <Header 
            isEnglish={isEnglish} 
            onToggleLang={() => setIsEnglish(!isEnglish)} 
            isDarkMode={isDarkMode}                   
            onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
            onGoHome={() => setShowAdmin(false)} 
          />
          <main className="content-grid">
            <AdminPanel 
                onBack={() => setShowAdmin(false)} 
                isEnglish={isEnglish} 
            />
          </main>
      </div>
    );
  }

  // --- VIEW 2: MAIN APP ---
  return (
    <div className={`mobile-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'} ${!isEnglish ? 'arabic' : ''}`} dir={isEnglish ? 'ltr' : 'rtl'}>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
          }
        }}
      />

      <Header 
        isEnglish={isEnglish} 
        onToggleLang={() => setIsEnglish(!isEnglish)} 
        isDarkMode={isDarkMode}                   
        onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
        onGoHome={() => {
            setSelectedCategory(null);
            setIsCheckout(false);
            setSearchTerm('');
        }}
      />
      
      <main className="content-grid">        
        {isCheckout ? (
            <Checkout 
                cart={cart}
                onBack={() => setIsCheckout(false)}
                onPlaceOrder={handlePlaceOrder}
                onAdd={addToCart}
                onRemove={removeFromCart}
                onDelete={deleteFromCart}
                isEnglish={isEnglish} 
                allMenuItems={menuItems} /* <--- PASSING DATA TO FIX CHECKOUT */
            />
        ) : (
            <>
                <Marquee 
                    sections={sections} 
                    activeSection={activeSection} 
                    onSectionChange={(sectionKey) => {
                        setActiveSection(sectionKey);
                        setSelectedCategory(null);
                        setSearchTerm('');
                    }} 
                    isEnglish={isEnglish} 
                />

                {!selectedCategory ? (
                  <>
                    <SearchBar onSearch={setSearchTerm} isEnglish={isEnglish} />
                    
                    <div className="cards">
                      {visibleCategories.map((cat) => (
                        <div key={cat._id || cat.id} onClick={() => setSelectedCategory(cat.type)}>
                            <CategoryCard 
                              title={isEnglish ? cat.title : (cat.title_ar || cat.title)} 
                              image={cat.image.startsWith('/uploads') ? `${SERVER_URL}${cat.image}` : cat.image} 
                            />
                        </div>
                      ))}
                    </div>

                    {visibleMenuItems.length > 0 && (
                        <div className="menu-list" style={{ marginTop: '10px' }}>
                            <h3 style={{ margin: '0 0 15px', color: '#EAC8CA', padding: '0 5px' }}>
                                {t.foundItems}
                            </h3>
                            {visibleMenuItems.map((item) => (
                                <MenuItemCard 
                                    key={item.id || item._id} 
                                    item={{
                                        ...item,
                                        title: isEnglish ? item.title : (item.title_ar || item.title),
                                        description: isEnglish ? item.description : (item.description_ar || item.description)
                                    }}
                                    quantity={cart[item.id || item._id] || 0}
                                    onAdd={addToCart}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>
                    )}

                    {!hasResults && searchTerm && (
                        <p style={{textAlign:'center', marginTop:'20px', color: '#888'}}>
                            {t.noResults}
                        </p>
                    )}

                    {!searchTerm && visibleCategories.length === 0 && (
                        <p style={{textAlign:'center', marginTop:'20px', color: '#888'}}>
                            {t.comingSoon}
                        </p>
                    )}
                  </>
                ) : (
                  <div className="menu-list">
                    <button className="back-btn" onClick={() => setSelectedCategory(null)}>
                        <i className={`fa-solid ${isEnglish ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i> {t.back}
                    </button>
                    
                    <h2 className="category-title">
                        {(() => {
                            const cat = categories.find(c => c.type === selectedCategory);
                            return cat ? (isEnglish ? cat.title : cat.title_ar) : selectedCategory;
                        })()}
                    </h2>

                    {menuItems[selectedCategory] && menuItems[selectedCategory].length > 0 ? (
                        menuItems[selectedCategory].map((item) => (
                        <MenuItemCard 
                            key={item.id || item._id} 
                            item={{
                                ...item,
                                title: isEnglish ? item.title : (item.title_ar || item.title),
                                description: isEnglish ? item.description : (item.description_ar || item.description)
                            }}
                            quantity={cart[item.id || item._id] || 0}
                            onAdd={addToCart}
                            onRemove={removeFromCart}
                        />
                        ))
                    ) : (
                        <div style={{textAlign: 'center', padding: '40px', color: '#888'}}>
                            <p>{t.emptyMenu}</p>
                        </div>
                    )}
                  </div>
                )}

                <div style={{ 
                    textAlign: 'center', 
                    padding: '20px 0 10px', 
                    opacity: 0.3, 
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    marginTop: 'auto'
                }}
                onClick={handleAdminAccess} 
                >
                    © 2025 TrackMind
                </div>
            </>
        )}
      </main>

      {totalItems > 0 && !isCheckout && (
        <div className="floating-order-bar">
          <button onClick={() => setIsCheckout(true)}>
            {t.showOrder} ({totalItems})
          </button>
        </div>
      )}
    </div>
  );
}

export default App;