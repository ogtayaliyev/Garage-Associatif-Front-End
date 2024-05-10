import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Timeline from 'react-calendar-timeline';
import axios from "axios";

const Reservation = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const [user, setUser] = useState(null);
    const [reparationTypeId, setreparationTypeId] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem('bearer');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        axios.get('http://localhost:8080/api/profil', config)
            .then(response => setUser(response.data))
            .catch(error => console.error("Erreur lors de la récupération des données utilisateur :", error));
    }, []);

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('bearer');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post('http://localhost:8080/api/make', {
                reparationType: { id: reparationTypeId },
                plaqueImmatriculation: data.plaqueImmatriculation,
                startDate: data.startDate
            }, config);
            alert(
                "Reservation entretien et reussi"
            );
            // Handle success
        } catch (err) {
            console.error(err);
            alert('Une erreur s\'est produite lors de la connexion.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Type de Réparation</label>
                    <select value={reparationTypeId} onChange={((e)=>setreparationTypeId(Number(e.target.value)))}>
                        <option value="">Sélectionnez le type de réparation</option>
                        <option value={1}>Diagnostic</option>
                        <option value={2}>Pneumatiques</option>
                        <option value={3}>Service Electricien</option>
                        <option value={4}>Courroie de distribution</option>
                        <option value={5}>Réparation de moteur</option>
                    </select>
                    {errors.reparationType && <span>Ce champ est requis.</span>}
                </div>
                <div>
                    <label>Date de Début</label>
                    <input type="datetime-local" {...register("startDate", {required: true})} />
                    {errors.startDate && <span>Ce champ est requis.</span>}
                </div>
                <div>
                    <label>Plaque d'immatriculation</label>
                    <select {...register("plaqueImmatriculation", { required: true })}>
                        <option value="">Sélectionnez une voiture</option>
                        {user && user.voitures.map((car, index) => (
                            <option key={index} value={car.plaqueImmatriculation}>
                                {car.plaqueImmatriculation}
                            </option>
                        ))}
                    </select>
                    {errors.plaqueImmatriculation && <span>Ce champ est requis.</span>}
                </div>
                <button type="submit">Réserver</button>
            </form>
        </div>
    );
};

export default Reservation;
