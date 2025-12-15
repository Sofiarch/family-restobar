import React from 'react';
import { SERVER_URL } from '../api'; // Import helper to fix image URLs
import './MenuItemCard.css'; 

const MenuItemCard = ({ item, quantity, onAdd, onRemove }) => {
  // Logic: If image is from backend uploads, prepend the server URL. 
  // Otherwise (if it's a static public file), use it as is.
  const imageUrl = item.image && item.image.startsWith('/uploads') 
      ? `${SERVER_URL}${item.image}` 
      : item.image;

  return (
    <div className="menu-item-card">
      <div className="image-container">
        <img 
            src={imageUrl} 
            alt={item.title} 
            loading="lazy" /* <--- THIS IS THE MAGIC LINE FOR PERFORMANCE */
        />
      </div>
      
      <div className="item-details">
        <h3>{item.title}</h3>
        <p className="description">({item.description})</p>
        
        <div className="price-action">
          <span className="price">{Number(item.price).toFixed(3)}</span>
          
          {quantity === 0 ? (
            <button className="add-btn" onClick={() => onAdd(item)}>
              <i className="fa-solid fa-plus"></i>
            </button>
          ) : (
            <div className="counter-controls">
              <button className="minus" onClick={() => onRemove(item)}>
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="count">{quantity}</span>
              <button className="plus" onClick={() => onAdd(item)}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;