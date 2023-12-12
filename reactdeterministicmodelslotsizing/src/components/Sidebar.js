import React, { useState } from 'react';


const sidebarStyle = {
    width: '250px',
    height: '100vh',
    backgroundColor: '#2C3E50',
    color: '#ECF0F1',
    padding: '20px',
    boxShadow: '3px 0 10px rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    left: '0',
    top: '0'
};

const titleStyle = {
    fontSize: '24px',
    borderBottom: '2px solid #3498DB',
    paddingBottom: '10px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold'
};

const navItemStyle = {
    listStyle: 'none',
    padding: '0',
    paddingbottom: '10px'
};

const navLinkStyle = (hover) => ({
    padding: '10px 0',
    cursor: 'pointer',
    backgroundColor: hover ? '#34495E' : 'transparent',
    transition: 'background-color 0.3s ease'
});

    

const Sidebar = () => {
    const [hoverIndex, setHoverIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const navItems = ["Home", "EOQ", "Wagner Whitin"]; // Add more items as needed

    return (
        <div style={sidebarStyle}>
            <h1 style={titleStyle}>Deterministic Models</h1>
            <ul style={navItemStyle}>
                {navItems.map((item, index) => (
                    <li 
                        key={item}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        style={navLinkStyle(index === hoverIndex)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
