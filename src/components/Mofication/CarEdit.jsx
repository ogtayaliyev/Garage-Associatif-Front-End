import React, {useEffect, useState} from 'react';
import { useForm } from "react-hook-form"
import axios from "axios";

function CarEdit(props) {
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
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const selectedMarqueId = watch("marque.id")
    const onSubmit = async (data) =>{
        const token = localStorage.getItem('bearer');
        const response = await axios.post('/api/voitures', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    });
        alert('Voiture ajoutée avec succès:', response.data);
    }

    useEffect(() => {
        const token = localStorage.getItem('bearer');



        axios.get('/api/voitures/marques', {
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

    useEffect(()=>{
        // Récupération des modèles pour la marque sélectionnée
        const token = localStorage.getItem('bearer');
        axios.get(`/api/voitures/models?marqueId=${selectedMarqueId}`, {
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
    },[selectedMarqueId])



    return (


        <div className="car-container" >
            <h2>Ajouter une voiture</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label style={{color:'white'}}>
                    Marque:
                    <select {...register("marque.id", { required: true })}>
                        <option value="">Sélectionnez une marque</option>
                        {carData.marques.map(marque => (
                            <option key={marque.id} value={marque.id}>
                                {marque.marque_nom}
                            </option>
                        ))}
                    </select>
                </label>
                <label style={{color:'white'}}>
                    Modèle:
                    <select  {...register("model.id", { required: true })}>
                        <option value="">Sélectionnez un modèle</option>
                        {carData.modeles.map(model => (
                            <option key={model.id} value={model.id}>
                                {model.model_nom}
                            </option>
                        ))}
                    </select>
                </label >
                <label style={{color:'white'}}>
                    Plaque Immatriculation:
                    <input type="text"  {...register("plaqueImmatriculation", { required: true })}/>
                </label>
                <label style={{color:'white'}}>
                    Couleur:
                    <input type="text" {...register("couleur", { required: true })}/>
                </label>
                <label style={{color:'white'}}>
                    Kilometrage:
                    <input type="text" {...register("kilometrage", { required: true })}/>
                </label>
                <label style={{color:'white'}}>
                    Boite:
                    <input type="text" {...register("boite", { required: true })}/>
                </label >
                <label style={{color:'white'}}>
                    Carroserie:
                    <input type="text" {...register("carroserie", { required: true })}/>
                </label>
                <label style={{color:'white'}}>
                    Anne Fabricaton:
                    <input type="text" {...register("anne_fabrication", { required: true })}/>
                </label>
                <label style={{color:'white'}}>
                    Carburant:
                    <input type="text" {...register("carburant", { required: true })}/>
                </label >
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default CarEdit;