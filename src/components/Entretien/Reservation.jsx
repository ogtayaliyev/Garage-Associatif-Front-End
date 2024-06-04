import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import "./entretien.css"

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
            console.log(data)
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
        <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="label2">Type de Réparation</label>
                    <select style={{marginLeft:'20px'}}value={reparationTypeId} onChange={((e)=>setreparationTypeId(Number(e.target.value)))}>
                        <option value="">Sélectionnez le type de réparation</option>
                        <option value={1}>Diagnostic</option>
                        <option value={2}>Pneumatiques</option>
                        <option value={3}>Service Electricien</option>
                        <option value={4}>Courroie de distribution</option>
                        <option value={5}>Réparation de moteur</option>
                    </select>
                    {errors.reparationType && <span>Ce champ est requis.</span>}
                </div>
                <div style={{marginTop:'20px'}}>
                    <label className="label2">Date de Début</label>
                    <input style={{marginLeft:'100px'}} type="datetime-local" {...register("startDate", {required: true})} />
                    {errors.startDate && <span>Ce champ est requis.</span>}
                </div>
                <div style={{marginTop:'20px'}}>
                    <label className="label2" >Plaque d'immatriculation</label>
                    <select style={{marginLeft:'30px'}} {...register("plaqueImmatriculation", { required: true })}>
                        <option value="">Sélectionnez une voiture</option>
                        {user?.voitures.filter(car => car.etatVente === false).map((car, index) => (
                            <option key={index} value={car.plaqueImmatriculation}>
                                {car.plaqueImmatriculation}
                            </option>
                        ))}
                    </select>
                    {errors.plaqueImmatriculation && <span>Ce champ est requis.</span>}
                </div>
                <button className="btn"   type="submit" style={{marginTop:'20px'}}>Réserver</button>
            </form>
        </div>
    );
};

export default Reservation;
