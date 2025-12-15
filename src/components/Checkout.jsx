import React, { useState } from 'react';
import './Checkout.css';
// REMOVED: import { menuItems } from '../data/menuItems';  <-- This was the bug

const Checkout = ({ 
    cart, 
    onBack, 
    onPlaceOrder, 
    onAdd, 
    onRemove, 
    onDelete, 
    isEnglish, 
    allMenuItems // <--- NEW PROP: Receive real data from App
}) => {
  
  const t = {
    back: isEnglish ? "Back" : "رجوع",
    checkout: isEnglish ? "Checkout" : "إتمام الطلب",
    yourOrder: isEnglish ? "Your Order" : "طلباتك",
    totalAmount: isEnglish ? "Total Amount" : "المجموع الكلي",
    deliveryDetails: isEnglish ? "Delivery Details" : "تفاصيل التوصيل",
    fullName: isEnglish ? "Full Name" : "الاسم الكامل",
    enterName: isEnglish ? "Enter your name" : "أدخل اسمك",
    phone: isEnglish ? "Phone Number" : "رقم الهاتف",
    address: isEnglish ? "Address / Notes" : "العنوان / ملاحظات",
    addressPlaceholder: isEnglish ? "Building, Street, Apartment..." : "المنطقة، الشارع، أقرب نقطة دالة...",
    confirm: isEnglish ? "Confirm Order" : "تأكيد الطلب"
  };

  // Helper to find item in the live data
  const findItem = (id) => {
    // Flatten the grouped menu items into a single array
    const flatItems = Object.values(allMenuItems).flat();
    // Compare as strings to handle MongoDB IDs (e.g., "65a...") correctly
    return flatItems.find(item => String(item.id) === String(id) || String(item._id) === String(id));
  };

  const cartEntries = Object.entries(cart);
  
  // Calculate total using live prices
  const totalAmount = cartEntries.reduce((sum, [id, qty]) => {
    const item = findItem(id);
    return sum + (item ? Number(item.price) * qty : 0);
  }, 0);

  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(formData, totalAmount);
  };

  return (
    <div className="checkout-container" dir={isEnglish ? 'ltr' : 'rtl'}>
      <div className="checkout-header">
        <button className="back-btn-checkout" onClick={onBack}>
          <i className={`fa-solid ${isEnglish ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i> {t.back}
        </button>
        <h2>{t.checkout}</h2>
      </div>

      <div className="order-summary">
        <h3>{t.yourOrder}</h3>
        <div className="summary-items">
          {cartEntries.map(([id, qty]) => {
            const item = findItem(id);
            // If item deleted from database but still in cart, skip it
            if (!item) return null;
            
            const title = isEnglish ? item.title : (item.title_ar || item.title);
            
            return (
              <div key={id} className="summary-row">
                <div className="row-main">
                    <div className="item-name-group">
                        <span className="qty-badge">{qty}x</span>
                        <span className="name">{title}</span>
                    </div>
                    <span className="item-price">{(item.price * qty).toFixed(3)}</span>
                </div>
                
                <div className="row-controls">
                    <button className="ctrl-btn delete" onClick={() => onDelete(item.id || item._id)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <div className="qty-controls">
                        <button className="ctrl-btn" onClick={() => onRemove(item)}>
                            <i className="fa-solid fa-minus"></i>
                        </button>
                        <button className="ctrl-btn" onClick={() => onAdd(item)}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="divider"></div>
        
        <div className="total-row">
          <span>{t.totalAmount}</span>
          <span className="total-price">{totalAmount.toFixed(3)} IQD</span>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h3>{t.deliveryDetails}</h3>
        <div className="form-group">
          <label>{t.fullName}</label>
          <input type="text" required placeholder={t.enterName} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="form-group">
          <label>{t.phone}</label>
          <input type="tel" required placeholder="07xxxxxxxxx" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>
        <div className="form-group">
          <label>{t.address}</label>
          <textarea rows="3" placeholder={t.addressPlaceholder} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
        </div>
        <button type="submit" className="confirm-btn">{t.confirm}</button>
      </form>
    </div>
  );
};

export default Checkout;