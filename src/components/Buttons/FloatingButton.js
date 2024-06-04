import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './button.css';
import icon from "../../img/garagelogo.png"

const FloatingButton = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(prevExpanded => !prevExpanded); // İçeriği genişlet veya daralt
    };

    const closeExpansion = () => {
        setIsExpanded(false); // Menüyü kapat
    };

    return (
        <div className="floating-button-container">
            <h2>Menu</h2>
            {/* Bir düğme yerine bir resim kullanın */}
            <img
                src={icon}
                alt="Floating Button"
                className="floating-button-image"
                onClick={isExpanded ? closeExpansion : toggleExpansion}
                title="Cliquez pour ouvrir le menu"
            />
            {isExpanded && (
                <div className="expanded-buttons">
                    <Link to="/reservationentretien" className="sub-button">Entretien</Link>
                    <Link to="/garagebox" className="sub-button">Location</Link>
                    <Link to="/modif" className="sub-button">Modifier</Link>
                    <Link to="/contact" className="sub-button">Contact</Link>
                </div>
            )}
        </div>
    );
};

export default FloatingButton;
