import React from 'react';
import logo from "../../img/logo.png";
import facebook from "../../img/facebook.svg";
import instagram from "../../img/instagram.svg";
import twitter from "../../img/twitter.svg";
import footershape3 from "../../img/footershape3.png";
import footershape2 from "../../img/footershape2.png";
import footershape1 from "../../img/footershape1.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top section">
                <div className="container">
                    <div className="footer-brand">
                        <a href="/main" className="logo">
                            <img src={logo} style={{width: '128', height: '63'}} alt="mnsgarage home"/>
                        </a>

                        <p className="footer-text">
                            Réparons ensemble, roulons solidaires : votre garage associatif de confiance.
                        </p>

                        <ul className="social-list">
                            <li>
                                <a href="https://www.facebook.com" className="social-link">
                                    <img src={facebook} alt="facebook"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com" className="social-link">
                                    <img src={instagram} alt="instagram"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com" className="social-link">
                                    <img src={twitter} alt="twitter"/>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <ul className="footer-list">
                        <li>
                            <p className="h3">Horaires</p>
                        </li>
                        <li>
                            <p className="p">Lundi - Vendredi</p>
                            <span className="span">08.00 – 12.00</span>
                        </li>
                        <li>
                            <p className="p">Samedi</p>
                            <span className="span">14.00 – 18.00</span>
                        </li>
                    </ul>

                    <ul className="footer-list">
                        <li>
                            <p className="h3">Contact Info</p>
                        </li>

                        <li>
                            <a href="tel:+01234567890" className="footer-link">
                                <span className="material-symbols-rounded">call</span>
                                <span className="span">+3 25.25.25.26.25</span>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:info@mnsgarage.fr" className="footer-link">
                                <span className="material-symbols-rounded">mail</span>
                                <span className="span">info@mnsgarage.fr</span>
                            </a>
                        </li>
                        <li>
                            <address className="footer-link address">
                                <span className="material-symbols-rounded">location_on</span>
                                <span className="span">42 rue de Marly,57070 Metz</span>
                            </address>
                        </li>
                    </ul>
                </div>

                <img src={footershape3} style={{width: '637', height: '173'}} loading="lazy" alt="Shape"
                     className="shape shape-3 move-anim"/>
            </div>

            <div className="footer-bottom">
                <p className="copyright">Copyright 2024, All Rights Reserved. MNS Garage</p>
                <img src={footershape2} style={{width: '788', height: '335'}} loading="lazy" alt="Shape"
                     className="shape shape-2"/>
                <img src={footershape1} style={{width: '805', height: '652'}} loading="lazy" alt="Red Car"
                     className="shape shape-1"/>
            </div>
        </footer>
    );
};

export default Footer;