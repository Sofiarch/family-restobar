import React from 'react';

const SearchBar = ({ onSearch, isEnglish }) => {
  return (
    <div className="search">
      <input 
        placeholder={isEnglish ? "Search..." : "بحث..."}
        type="text" 
        onChange={(e) => onSearch(e.target.value)}
        // Adjust text direction for Arabic
        style={{ textAlign: isEnglish ? 'left' : 'right' }} 
      />
      <button type="submit">{isEnglish ? "GO" : "اذهب"}</button>
    </div>
  );
};

export default SearchBar;