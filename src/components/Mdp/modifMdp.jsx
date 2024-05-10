import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function ModifMdp() {
    const [emailSent, setEmailSent] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [email, setEmail] = useState(""); // State to store email

    const sendResetEmail = async (data) => {
        try {
            await axios.post('http://localhost:8080/api/modifier-mdp', { email: data.email });
            alert("Vous allez recevoir un code d'activation. Veuillez vérifier votre adresse e-mail. ");
            setEmailSent(true);
            setEmail(data.email); // Store the email for later use
        }

        catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
            // Handle error: Display a user-friendly message
        }
    };

    const resetPassword = async (data) => {
        try {
            await axios.post('http://localhost:8080/api/nouveau-mdp', {
                email: data.email, // Use the stored email
                code: data.code,
                password: data.password
            });
            alert("Réinitialisation du mot de passe réussie");
            // Provide feedback: Password successfully reset
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe:', error);
            // Handle error: Display a user-friendly message
        }
    };


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(sendResetEmail)}>
                <h2>Veuillez insérer votre adresse e-mail pour recevoir le code d'activation et suivre les
                    instructions.</h2>
                <label>E-mail</label>
                <input type="email" {...register("email", {required: true})} />
                {errors.email && <span>Ce champ est requis</span>}
                <button type="submit">Envoyer</button>
            </form>

            {emailSent && (
                <form onSubmit={handleSubmit(resetPassword)}>
                    <h3>Veuillez insérer votre code d'activation et votre nouveau mot de passe.</h3>
                    <label>Code reçu</label>
                    <input type="text" {...register("code", { required: true })} />
                    {errors.code && <span>Ce champ est requis</span>}
                    <label>Nouveau mot de passe</label>
                    <p>Le mot de passe doit contenir au moins 8 caractères, <span style={{color:'red',fontSize:'2.5rem'}}>Incluant</span></p>
                        <li>une majuscule</li>
                        <li>chiffre(0,1,2,3,...)</li>
                        <li>caractère spécial(.,/*-+@.....)</li>
                    <input type="password" {...register("password", { required: true })} />
                    {errors.password && <span>Ce champ est requis</span>}
                    <button type="submit">Réinitialiser le mot de passe</button>
                </form>
            )}
        </div>
    );
}

export default ModifMdp;
