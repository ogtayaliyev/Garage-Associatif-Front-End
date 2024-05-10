import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "../Styles/profil.css";
import herobanner from "../img/herobanner.png";
import gar5 from "../img/gar5.jpg";
import th from "../img/th.jpeg";

const Profil = () => {
    const [user, setUser] = useState(null);
    const [selectedCar, setSelectedCar] = useState('');
    const [selectedCarData, setSelectedCarData] = useState(null);
    const [selectedLocationBox, setSelectedLocationBox] = useState('');
    const [selectedLocationBoxData, setSelectedLocationBoxData] = useState(null);
    const navigate = useNavigate();

    const handleCarChange = event => {
        const selectedPlaque = event.target.value;
        setSelectedCar(selectedPlaque);
        const selectedCarInfo = user?.voitures.find(car => car.plaqueImmatriculation === selectedPlaque);
        setSelectedCarData(selectedCarInfo);
    };

    const handleLocationBoxChange = event => {
        const selectedDate = event.target.value;
        setSelectedLocationBox(selectedDate );
        const selectedLocationBoxInfo = user?.locationBoxes.find(box => box.startDate === selectedDate || box.returnDate === selectedDate);
        setSelectedLocationBoxData(selectedLocationBoxInfo);
    };


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
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = "/home";
    };

    const suprimer = async (carId) =>{
        const token = localStorage.getItem('bearer');
        try {
            const response = await axios.delete(`http://localhost:8080/api/voitures/${carId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Voiture supprimée avec succès.");
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la suppression de la voiture:', error);
            // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
        }
    }


    return (
        <main className="profil">
            <article >
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
                                <li>Prénom: {user?.prenom || 'N/A'}</li>
                                <li>Adresse: {user?.adresse || 'N/A'}</li>
                                <li>Portable : {user?.phone_number || 'N/A'}</li>
                                <li>Mail : {user?.email || 'N/A'}</li>
                            </ul>

                            <label className='list'>
                                Sélectionnez votre voiture par plaque d'immatriculation:
                                <br/>
                                <select value={selectedCar} onChange={handleCarChange}>
                                    <option value="">Sélectionnez une voiture</option>
                                    {user?.voitures.map((car, index) => (
                                        <option key={index} value={car.plaqueImmatriculation}>
                                            {car.plaqueImmatriculation}
                                        </option>
                                    ))}
                                </select>
                            </label>
                               <br/>
                            <label className='list'>
                                Sélectionnez une location par date:
                                <br/>
                                <select value={selectedLocationBox} onChange={handleLocationBoxChange}>
                                    <option value="">Sélectionnez votre location</option>
                                    {user?.locationBoxes.map((box, index) => (
                                        <option key={index} value={box.startDate}>
                                            {box.startDate}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <br/>

                        </div>
                        <div className="btn-container">
                            <a href="/garagebox" className="btn">
                                <span className="span">Location</span>
                            </a>
                            <br/>
                            <a href="/reservationentretien" className="btn">
                                <span className="span">Entretien</span>
                            </a>
                            <br/>
                            <a href="/contact" className="btn">
                                <span className="span">Contact</span>
                            </a>
                            <br/>
                            <a href="/modif" className="btn">
                                <span className="span">Modifier</span>
                            </a>
                            <br/>
                            <button className="btn" onClick={logout}>Log Out</button>
                        </div>
                    </div>
                    {selectedCarData && (
                        <div className='container'>
                            <h2>Informations sur la voiture sélectionnée:</h2>
                            <label>
                                Kilométrage:
                                <input type="text" name="kilometrage" value={selectedCarData.kilometrage} readOnly/>
                            </label>
                            <label>
                                Carburant:
                                <input type="text" name="carburant" value={selectedCarData.carburant} readOnly/>
                            </label>
                            <label>
                                Boîte:
                                <input type="text" name="boite" value={selectedCarData.boite} readOnly/>
                            </label>
                            <label>
                                Anne Fabrication:
                                <input type="text" name="anne_fabrication" value={selectedCarData.anne_fabrication}
                                       readOnly/>
                            </label>
                            <label>
                                Couleur:
                                <input type="text" name="couleur" value={selectedCarData.couleur} readOnly/>
                            </label>
                            <label>
                                Marque:
                                <input type="text" name="marque" value={selectedCarData.model.marque.marque_nom}
                                       readOnly/>
                            </label>
                            <label>
                                Modèle:
                                <input type="text" name="model" value={selectedCarData.model.model_nom} readOnly/>
                            </label>
                            <button className="btn" onClick={() => suprimer(selectedCarData.id)}>Supprimer</button>

                        </div>
                    )}
                    {selectedLocationBoxData && (
                        <div className='container'>
                            <h2>Informations sur la location sélectionnée:</h2>
                            <label>
                                Start Date:
                                <input type="text" name="startDate" value={selectedLocationBoxData.startDate} readOnly />
                            </label>
                            <label>
                                Return Date:
                                <input type="text" name="returnDate" value={selectedLocationBoxData.returnDate} readOnly />
                            </label>
                            <label>
                                Prix de la location:
                                <input type="text" name="prix_loc" value={selectedLocationBoxData.prix_loc} readOnly />
                            </label>
                        </div>
                    )}
                </section>

            </article>

        </main>
    );
};

export default Profil;
