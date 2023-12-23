import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverIndex: null
        };
    }

    handleMouseEnter = (index) => {
        this.setState({ hoverIndex: index });
    };

    handleMouseLeave = () => {
        this.setState({ hoverIndex: null });
    };

    render() {
        return (
            <div style={sidebarStyle}>
                <h1 style={titleStyle}>Deterministic Models</h1>
                <ul style={navItemStyle}>
                    <li 
                        style={navLinkStyle(this.state.hoverIndex === 0)}
                        onMouseEnter={() => this.handleMouseEnter(0)}
                        onMouseLeave={this.handleMouseLeave}
                    >
                    <Link to="/wagner-whitin" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                    </li>
                    <li 
                        style={navLinkStyle(this.state.hoverIndex === 1)}
                        onMouseEnter={() => this.handleMouseEnter(1)}
                        onMouseLeave={this.handleMouseLeave}
                    >
                    <Link to="/eoq" style={{ textDecoration: 'none', color: 'inherit' }}>EOQ</Link>
                    </li>
                    <li 
                        style={navLinkStyle(this.state.hoverIndex === 2)}
                        onMouseEnter={() => this.handleMouseEnter(2)}
                        onMouseLeave={this.handleMouseLeave}
                    >
                        <Link to="/wagner-whitin" style={{ textDecoration: 'none', color: 'inherit' }}>Wagner Whitin</Link>
                    </li>
                    {/* Weitere Elemente können hier hinzugefügt werden */}
                </ul>
            </div>
        );
    }
}

export default Sidebar;
