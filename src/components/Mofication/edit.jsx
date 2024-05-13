import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Modification(props) {
    const navigate = useNavigate();
    const [originalData, setOriginalData] = useState({});
    const [selectedCar, setSelectedCar] = useState('');
    const [selectedCarData, setSelectedCarData] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        voitures: []
    });

    const [carData, setCarData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('bearer');

        axios.get('http://localhost:8080/api/profil', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const { nom, prenom, email, adresse, voitures } = response.data;
                setUserData({ nom, prenom, email, adresse, voitures });
                setOriginalData({ nom, prenom, email, adresse });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            });

        axios.get('http://localhost:8080/api/voitures/marques', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setCarData(prevState => ({ ...prevState, marques: response.data }));
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des marques:', error);
            });
    }, []);

    const handleChange = event => {
        const { name, value } = event.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleCarChange = event => {
        const selectedPlaque = event.target.value;
        setSelectedCar(selectedPlaque);
        const selectedCarInfo = userData.voitures.find(car => car.plaqueImmatriculation === selectedPlaque);
        setSelectedCarData(selectedCarInfo);
    };

    const handleFieldUpdate = (fieldName, value) => {
        setUserData(prevData => ({ ...prevData, [fieldName]: value }));
    };

    const onSubmit = async () => {
        const token = localStorage.getItem('bearer');
        axios.put('http://localhost:8080/api/modifier', userData, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log('Profil mis à jour:', response.data);
                navigate('/profil');
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du profil:', error);
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Nom:
                    <input type="text" name="nom" value={userData.nom} onChange={e => handleFieldUpdate("nom", e.target.value)} />
                </label>
                <label>
                    Prénom:
                    <input type="text" name="prenom" value={userData.prenom} onChange={e => handleFieldUpdate("prenom", e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={e => handleFieldUpdate("email", e.target.value)} />
                </label>
                <label>
                    Adresse:
                    <textarea name="adresse" value={userData.adresse} onChange={e => handleFieldUpdate("adresse", e.target.value)} />
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
                            <input type="text" name="kilometrage" value={selectedCarData.kilometrage} readOnly />
                        </label>
                        <label>
                            Carburant:
                            <input type="text" name="carburant" value={selectedCarData.carburant} readOnly />
                        </label>
                        <label>
                            Boîte:
                            <input type="text" name="boite" value={selectedCarData.boite} readOnly />
                        </label>
                        <label>
                            Anne Fabrication:
                            <input type="text" name="anne_fabrication" value={selectedCarData.anne_fabrication} readOnly />
                        </label>

                        <label>
                            Couleur:
                            <input type="text" name="couleur" value={selectedCarData.couleur} readOnly />
                        </label>
                        <label>
                            Marque:
                            <input type="text" name="marque" value={selectedCarData.marque.marque_nom} readOnly />
                        </label>
                        <label>
                            Modèle:
                            <input type="text" name="model" value={selectedCarData.model.model_nom} readOnly />
                        </label>
                    </div>
                )}

                <button type="submit">Modifier</button>
            </form>
        </div>
    );
}

export default Modification;
