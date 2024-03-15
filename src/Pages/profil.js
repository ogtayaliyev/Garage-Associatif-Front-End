import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "../Styles/profil.css";
import herobanner from "../img/herobanner.png";
import gar5 from "../img/gar5.jpg";
import th from "../img/th.jpeg";

const Profil = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('bearer');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://localhost:8080/api/profil', config);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    return (
        <main className="profil">
            <article>
                <section className="hero has-bg-image" aria-label="home" style={{backgroundImage: `url(${gar5})`}}
                         id="home">
                    <div className="container">
                        <div className="hero-content">
                            <p className="section-text"></p>
                        </div>
                        <figure className="hero-banner" style={{width: '1228', height: '789'}}>
                            <img src={herobanner} style={{width: '28', height: '9'}} alt="red motor vehicle"/>
                        </figure>
                    </div>
                </section>
                <section id="about" className="section about has-before" aria-labelledby="about-label">
                    <div className="container">
                        <div className="about-content">
                            <p className="section-subtitle dark">Profil</p>
                            <img className="image-ronde" src={th} alt="photo de profil utilisateur"/>
                            <ul className="section-subtitle">
                                <li>Nom: {user?.nom || 'N/A'}</li>
                                <li>Prenom: {user?.prenom || 'N/A'}</li>
                                <li>Adresse: {user?.adresse || 'N/A'}</li>
                                <li>Portable : {user?.phone_number || 'N/A'}</li>
                                <li>Mail : {user?.email || 'N/A'}</li>

                            </ul>
                        </div>
                        <div className="btn-container">
                            <a href="#" className="btn">
                                <span className="span">Location</span>
                            </a>
                            <br/>
                            <a href="#" className="btn">
                                <span className="span">Entretien</span>
                            </a>
                            <br/>
                            <a href="/contact" className="btn">
                                <span className="span">Contact</span>
                            </a>
                            <br/>
                            <a href="#" className="btn">
                                <span className="span">Modifier</span>
                            </a>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Profil;