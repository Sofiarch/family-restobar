// src/components/Marquee.jsx
import React from 'react';

const Marquee = ({ sections, activeSection, onSectionChange, isEnglish }) => {
    // Safety check: If data hasn't loaded yet, show nothing (prevents crashes)
    if (!sections || sections.length === 0) return null;

    return (
        <nav className="marquee-nav">
            <div className="marquee-scroll-container">
                {sections.map((sec) => (
                    <button 
                        key={sec._id || sec.id}
                        className={`marquee-btn ${activeSection === sec.key ? 'active' : ''}`}
                        onClick={() => onSectionChange(sec.key)}
                    >
                        {isEnglish ? sec.title : sec.title_ar}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Marquee;