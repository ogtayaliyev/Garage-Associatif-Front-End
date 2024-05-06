import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./modif.css"

const Modification = () => {
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        voitures: []
    });
    const [originalData, setOriginalData] = useState({});
    const [selectedCar, setSelectedCar] = useState('');
    const [selectedCarData, setSelectedCarData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [carData, setCarData] = useState({
        plaqueImmatriculation: '',
        couleur: '',
        carburant:'',
        kilometrage:'',
        boite:'',
        anne_fabrication:'',
        carroserie:'',
        marqueId: '',
        modelId: '',
        marques: [],
        modeles: []
    });

    useEffect(() => {
        const token = localStorage.getItem('bearer');
        // Récupération des données utilisateur
        axios.get('http://localhost:8080/api/profil', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const { nom, prenom, email, adresse, voitures } = response.data;
                setUserData({ nom, prenom, email, adresse, voitures });
                setOriginalData({ nom, prenom, email, adresse });
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Récupération des marques
        axios.get('http://localhost:8080/api/voitures/marques', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setCarData(prevState => ({
                    ...prevState,
                    marques: response.data
                }));
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des marques:', error);
            });
    }, []);

    const handleChange = event => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCarChange = event => {
        const selectedPlaque = event.target.value;
        setSelectedCar(selectedPlaque);
        const selectedCarInfo = userData.voitures.find(car => car.plaqueImmatriculation === selectedPlaque);
        setSelectedCarData(selectedCarInfo);
    };

    const handleCarDataChange = event => {
        const { name, value } = event.target;
        setCarData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleMarqueChange = event => {
        const selectedMarqueId = event.target.value;
        setCarData(prevData => ({
            ...prevData,
            marqueId: selectedMarqueId,
            modelId: '', // Réinitialiser modelId lorsque la marque change
            modeles: []   // Effacer la liste des modèles lorsque la marque change
        }));

        // Récupération des modèles pour la marque sélectionnée
        const token = localStorage.getItem('bearer');
        axios.get(`http://localhost:8080/api/voitures/models?marqueId=${selectedMarqueId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setCarData(prevState => ({
                    ...prevState,
                    modeles: response.data
                }));
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des modèles:', error);
            });
    };

    const handleSubmit = event => {
        event.preventDefault();
        const token = localStorage.getItem('bearer');
        axios.put('http://localhost:8080/api/modifier', selectedCarData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Profil a mis a jour:', response.data);
                navigate('/profil');
            })
            .catch(error => {
                console.error('ERROR:', error);
                setErrorMessage('Une erreur s\'est produite lors de la mise à jour du profil.');
            });
    };

    const handleCarAddSubmit = async event => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('bearer');
            const newCarData = {
                ...carData,
                marque_id: { id: carData.marqueId }, // Utiliser un objet avec l'ID de la marque sélectionnée
                model_id: { id: carData.modelId } // Utiliser un objet avec l'ID du modèle sélectionné
            };
            const response = await axios.post('http://localhost:8080/api/addUtilisateureVoiture', newCarData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Affichage du message de succès avec les informations de la voiture ajoutée
            console.log('Voiture ajoutée avec succès:', response.data);

            // Réinitialisation des données du formulaire
            setCarData({
                plaqueImmatriculation: '',
                couleur: '',
                carburant: '',
                anne_fabrication:'',
                kilometrage: '',
                boite: '',
                carroserie: '',
                marqueId: '',
                modelId: '',
                marques: [],
                modeles: []
            });
            setErrorMessage('');
        } catch (error) {
            console.error('ERROR:', error.response.data);
            setErrorMessage('Une erreur s\'est produite lors de l\'ajout de la voiture.');
        }
    };





    return (
        <div className="principal">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Nom:
                        <input type="text" name="nom" value={userData.nom} onChange={handleChange}/>
                    </label>
                    <label>
                        Prénom:
                        <input type="text" name="prenom" value={userData.prenom} onChange={handleChange}/>
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={userData.email} onChange={handleChange}/>
                    </label>
                    <label>
                        Adresse:
                        <textarea name="adresse" value={userData.adresse} onChange={handleChange}/>
                    </label>

                    <label>
                        Sélectionnez une voiture par plaque d'immatriculation:
                        <select value={selectedCar} onChange={handleCarChange}>
                            <option value="">Sélectionnez une voiture</option>
                            {userData.voitures.map((car, index) => (
                                <option key={index} value={car.plaqueImmatriculation}>
                                    {car.plaqueImmatriculation}
                                </option>
                            ))}
                        </select>
                    </label>

                    {selectedCarData && (
                        <div>
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
                                <input type="text" name="anne_fabrication" value={selectedCarData.anne_fabrication} readOnly/>
                            </label>

                            <label>
                                Couleur:
                                <input type="text" name="couleur" value={selectedCarData.couleur} readOnly/>
                            </label>
                            <label>
                                Marque:
                                <input type="text" name="marque" value={selectedCarData.marque.marque_nom} readOnly/>
                            </label>
                            <label>
                                Modèle:
                                <input type="text" name="model" value={selectedCarData.model.model_nom} readOnly/>
                            </label>
                        </div>
                    )}

                    <button type="submit">Modifier</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="car-container">
                <h2>Ajouter une voiture</h2>
                <form onSubmit={handleCarAddSubmit}>
                    <label>
                        Marque:
                        <select value={carData.marqueId} onChange={handleMarqueChange}>
                            <option value="">Sélectionnez une marque</option>
                            {carData.marques.map(marque => (
                                <option key={marque.id} value={marque.id}>
                                    {marque.marque_nom}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Modèle:
                        <select value={carData.modelId} onChange={event => setCarData(prevState => ({
                            ...prevState,
                            modelId: event.target.value
                        }))}>
                            <option value="">Sélectionnez un modèle</option>
                            {carData.modeles.map(model => (
                                <option key={model.id} value={model.id}>
                                    {model.model_nom}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Plaque Immatriculation:
                        <input type="text" name="plaqueImmatriculation" value={carData.plaqueImmatriculation}
                               onChange={handleCarDataChange}/>
                    </label>
                    <label>
                        Couleur:
                        <input type="text" name="couleur" value={carData.couleur} onChange={handleCarDataChange}/>
                    </label>
                    <label>
                        Kilometrage:
                        <input type="text" name="kilometrage" value={carData.kilometrage}
                               onChange={handleCarDataChange}/>
                    </label>
                    <label>
                        Boite:
                        <input type="text" name="boite" value={carData.boite} onChange={handleCarDataChange}/>
                    </label>
                    <label>
                        Carroserie:
                        <input type="text" name="carroserie" value={carData.carroserie} onChange={handleCarDataChange}/>
                    </label>
                    <label>
                        Anne Fabricaton:
                        <input type="text" name="anne_fabrication" value={carData.anne_fabrication} onChange={handleCarDataChange}/>
                    </label>
                    <label>
                        Carburant:
                        <input type="text" name="carburant" value={carData.carburant} onChange={handleCarDataChange}/>
                    </label>
                    <button type="submit">Ajouter</button>
                </form>
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Modification;
