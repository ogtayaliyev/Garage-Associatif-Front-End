
import React, { useState, useEffect } from 'react';
import logo from "../../img/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./stylenavbar.css"


const HeaderNavbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        // Vérifier si l'utilisateur est connecté en vérifiant le token JWT dans le localStorage
        const token = localStorage.getItem('bearer');
        setIsLoggedIn(!!token); // Mettre à jour l'état de connexion en convertissant le token en booléen
    }, []); // Exécuter une seule fois après le rendu initial


    const handleGoToProfile = () => {
        window.location.href = '/profil';
    };
    const handleLogout = () => {
        // Supprimer le token JWT du localStorage
        localStorage.removeItem('bearer');
        // Mettre à jour l'état de connexion pour afficher le bouton "Mon compte"
        window.location.href = '/register';
        setIsLoggedIn(false);
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
                            <a href="/home" className="navbar-link">Accueil</a>
                        </li>
                        <li>
                            <a href="/apropos" className="navbar-link">A Propos</a>
                        </li>
                        <li>
                            <a href="/contact" className="navbar-link">Contact</a>
                        </li>
                    </ul>
                </nav>

                {isLoggedIn ? ( // Profil sayfasında mı kontrol ediliyor
                    <div className="user-menu">
                        <i className="user-icon" onClick={toggleUserMenu}><FontAwesomeIcon icon={faUser} style={{ fontSize: '34px', color: 'red' }} /></i>
                        {/* Kullanıcı Menüsü */}
                        {showUserMenu && (
                            <div className="user-dropdown-menu">
                                <ul>
                                    <li onClick={handleLogout}>Logout</li>
                                    <li onClick={handleGoToProfile}>Profil </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <a href="/register" className="btn btn-primary">
                        <span className="span">Mon compte</span>
                    </a>
                )}

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

