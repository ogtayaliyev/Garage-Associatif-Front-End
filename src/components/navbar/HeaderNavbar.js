import React, { useState } from 'react';
import logo from "../../img/logo.png";


const HeaderNavbar = () => {
    const [isActive, setIsActive] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    return (
        <header className="header">
            <div className="container">
                <a href="/home" className="logo">
                    <img src={logo} style={{ width: '128px', height: '63px' }} alt="MNSgarage home" />
                </a>

                <nav className={`navbar ${isActive ? 'active' : ''}`} data-navbar>
                    <ul className="navbar-list">
                        <li>
                            <a href="/home" className="navbar-link">Acuueil</a>
                        </li>
                        <li>
                            <a href="/apropos" className="navbar-link">A Propos</a>
                        </li>
                        {/*<li>*/}
                        {/*    <a href="/services" className="navbar-link">Services</a>*/}
                        {/*</li>*/}
                        {/*<li>*/}
                        {/*    <a href="/login" className="navbar-link">Location</a>*/}
                        {/*</li>*/}
                        <li>
                            <a href="/contact" className="navbar-link">Contact</a>
                        </li>
                    </ul>
                </nav>

                <a href="/register" className="btn btn-primary">
                    <span className="span">Mon compte</span>
                </a>

                <button className="nav-toggle-btn" aria-label="toggle menu" data-nav-toggler onClick={handleToggle}>
                    <span className="nav-toggle-icon icon-1"></span>
                    <span className="nav-toggle-icon icon-2"></span>
                    <span className="nav-toggle-icon icon-3"></span>
                </button>
            </div>
        </header>

    );
};

export default HeaderNavbar;
