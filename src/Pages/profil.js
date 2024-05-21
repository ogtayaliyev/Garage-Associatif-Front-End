import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { FaEuroSign } from 'react-icons/fa';
import { FaTrash ,FaTimesCircle} from 'react-icons/fa';
import Annuler from '../components/Buttons/Annuler'



import "../Styles/profil.css";
import herobanner from "../img/herobanner.png";
import gar5 from "../img/gar5.jpg";
import car from "../img/oktay.png";
import profilcar from"../img/rectangle-800.png"
import FloatingButton from "../components/Buttons/FloatingButton";

const Profil = () => {
    const [user, setUser] = useState(null);
    const [selectedCar, setSelectedCar] = useState('');
    const [selectedCarData, setSelectedCarData] = useState(null);
    const [selectedLocationBox, setSelectedLocationBox] = useState('');
    const [selectedEntretien,setSelectedEntretien]=useState('');
    const [selectedEntretienData,setSelectedEntretienData]=useState(null)
    const [selectedLocationBoxData, setSelectedLocationBoxData] = useState(null);
    const navigate = useNavigate();
    const [carModalVisible, setCarModalVisible] = useState(false);
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [entretienModalVisible,setEntretienModalVisible]=useState(false)




    const handleCarChange = event => {
        const selectedPlaque = event.target.value;
        setSelectedCar(selectedPlaque);
        const selectedCarInfo = user?.voitures.find(car => car.plaqueImmatriculation === selectedPlaque && car.etatVente === false);
        setSelectedCarData(selectedCarInfo);
        setCarModalVisible(true);
        setSelectedLocationBoxData(false)
        setEntretienModalVisible(false)
    };

    const handleLocationBoxChange = event => {
        const selectedDate = event.target.value;
        setSelectedLocationBox(selectedDate );
        const selectedLocationBoxInfo = user?.locationBoxes.find(box => box.startDate === selectedDate || box.returnDate === selectedDate);
        setSelectedLocationBoxData(selectedLocationBoxInfo);
        setLocationModalVisible(true);
        setCarModalVisible(false);
        setEntretienModalVisible(false)
    };

    const handleEntretienChange = event => {
        const selectedDate = event.target.value;
        setSelectedEntretien(selectedDate);
        const selectedEntretienInfo = user?.reparations.find(reparation => {
            // Seçilen tarihi herhangi bir başlangıç veya bitiş tarihi ile eşleştir
            return (
                reparation.startDate === selectedDate ||
                reparation.endDate === selectedDate
            );
        });
        setSelectedEntretienData(selectedEntretienInfo);
        setEntretienModalVisible(true);
        setCarModalVisible(false);
        setLocationModalVisible(false);
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

    const annuler = async (carId) => {
        const token = localStorage.getItem('bearer');
        try {
            const response = await axios.put(`http://localhost:8080/api/voitures/${carId}`, {
                etatVente: true  // Mettez les données directement ici
            }, {
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

    const handleClick = async (locationBoxId) => {
        const token = localStorage.getItem('bearer');
        const payload = { etatLocation: 'annule' };

        try {
            await axios.put(`http://localhost:8080/api/locationbox/${locationBoxId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            alert("Location annulée avec succès.");
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de l\'annulation de la location:', error);
            // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
        }
    };

    const filteredCars = user?.voitures.filter(car => car.etatVente === true);

    return (
        <main className="profil">

            <div className="modal" style={{display: carModalVisible ? 'flex' : 'none'}}>
                <div className="modal-content">

                    <img src={profilcar} alt=""/>
                    {selectedCarData && (
                        <div className='container'>
                            <h3>Informations sur la voiture sélectionnée:</h3>
                            <label>
                                Kilométrage:
                                <p>{selectedCarData.kilometrage}</p>
                            </label>
                            <label>
                                Carburant:
                                <p>{selectedCarData.carburant}</p>
                            </label>
                            <label>
                                Boîte:
                                <p>{selectedCarData.boite}</p>
                            </label>
                            <label>
                                Anne Fabrication:
                                <p>{selectedCarData.anne_fabrication}</p>
                            </label>
                            <label>
                                Couleur:
                                <p>{selectedCarData.couleur}</p>
                            </label>
                            <label>
                                Marque:
                                <p>{selectedCarData.model.marque.marque_nom}</p>
                            </label>
                            <label>
                                Modèle:
                                <p>{selectedCarData.model.model_nom}</p>
                            </label>

                        </div>
                    )}

                    <div className="close-icons-container" >
                        <span className="close-icon"  onClick={() => setCarModalVisible(false)}><FaTimes/></span>
                        <span className="close-icon" onClick={() => { annuler(selectedCarData.id)}}><FaTrash/></span>

                    </div>

                </div>
            </div>


            <div className="modal" style={{display: locationModalVisible ? 'flex' : 'none'}}>
                <div className="modal-content">
                    <img src={car} alt=""/>
                    {selectedLocationBoxData && (
                        <div className='container'>
                            <h3>Informations sur la location sélectionnée:</h3>
                            <label>
                                Start Date:
                                <p>{selectedLocationBoxData.startDate}</p>
                            </label>
                            <label>
                                Return Date:
                                <p>{selectedLocationBoxData.returnDate}</p>
                            </label>
                            <label>
                                Prix de la location:
                                <p>{selectedLocationBoxData.prix_loc}<FaEuroSign/> Euros</p>
                            </label>
                        </div>
                    )}
                    <div className="close-icons-container">
                        <span className="close-icon" onClick={() => setLocationModalVisible(false)}><FaTimes/></span>
                        <span className="close-icon" onClick={() => handleClick(selectedLocationBoxData.id)}>
                            <FaTrash/>
                        </span>

                    </div>
                </div>
            </div>

            <div className="modal" style={{display: entretienModalVisible ? 'flex' : 'none'}}>
                <div className="modal-content">
                    <img src={car} alt=""/>
                    {selectedEntretienData && (
                        <div className='container'>
                            <h3>Informations sur la entretien sélectionnée:</h3>
                            <label>
                                Type de réparation:
                                <p>{selectedEntretienData.reparationType.reparationType}</p>
                            </label>
                            <label>
                                Durée:
                                <p>{selectedEntretienData.duree} minutes</p>
                            </label>
                            <label>
                                Voiture:
                                <p>{selectedEntretienData.voiture.plaqueImmatriculation}</p>
                            </label>
                            <label>
                                Date de début:
                                <p>{selectedEntretienData.startDate}</p>
                            </label>
                            <label>
                                Date de fin:
                                <p>{selectedEntretienData.endDate}</p>
                            </label>
                        </div>
                    )}
                    <div className="close-icons-container">
                        <span className="close-icon" onClick={() => setEntretienModalVisible(false)}><FaTimes/></span>

                        <span className="close-icon"><FaTimesCircle /></span>

                    </div>
                </div>
            </div>


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

                            <img className="image-ronde" src={car} alt="photo de profil utilisateur"/>
                            <ul className="section-subtitle">
                                <li>Nom: {user?.nom || 'N/A'}</li>
                                <li>Prénom: {user?.prenom || 'N/A'}</li>
                                <li>Adresse: {user?.adresse || 'N/A'}</li>
                                <li>Portable : {user?.phone_number || 'N/A'}</li>
                                <li>Mail : {user?.email || 'N/A'}</li>
                            </ul>
                        </div>
                        <div className="floating-button-container">
                            <FloatingButton/>
                        </div>
                        <div className="inf-card-container">
                            <div className="inf-card">
                                <div className="inf-card-header">
                                    <h2>Historique Entretien</h2>
                                </div>
                                <div className="inf-card-content">
                                    <select value={selectedEntretien} onChange={handleEntretienChange}>
                                        <option value="">Sélectionnez votre entretien</option>
                                        {user?.reparations.map((reparations, index) => (
                                            <option key={index} value={reparations.startDate}>
                                                {reparations.startDate}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="inf-card">
                                <div className="inf-card-header">
                                    <h2>Historique Location</h2>
                                </div>
                                <div className="inf-card-content">
                                    <select value={selectedLocationBox} onChange={handleLocationBoxChange}>
                                        <option value="">Sélectionnez votre location</option>
                                        {user?.locationBoxes.map((box, index) => (
                                            <option key={index} value={box.startDate}>
                                                {box.startDate}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="inf-card">
                                <div className="inf-card-header">
                                    <h2>Mes Voitures</h2>
                                </div>
                                <div className="inf-card-content">
                                    <select value={selectedCar} onChange={handleCarChange}>
                                        <option value="">Sélectionnez une voiture</option>
                                        {user?.voitures.filter(car => car.etatVente === false).map((car, index) => (
                                            <option key={index} value={car.plaqueImmatriculation}>
                                                {car.plaqueImmatriculation}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                    </div>
                </div>
            </section>

        </article>

</main>
)
    ;
};

export default Profil;
