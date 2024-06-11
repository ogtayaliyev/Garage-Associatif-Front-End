import React, { useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;

function SignUp(props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [passwordShown, setPasswordShown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const save = async (data) => {
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:8080/api/inscription', {
                nom: data.nom,
                prenom: data.prenom,
                email: data.email,
                password: data.password,
                adresse: data.adresse,
                phone_number: data.phone_number,
            });
            alert(
                "L'inscription utilisateur a réussi avec succès. Pour activer votre compte, veuillez vérifier votre adresse e-mail et saisir le code reçu dans la zone d'activation prévue à cet effet."
            );
            reset(); // Réinitialiser le formulaire après l'inscription réussie
        } catch (err) {
            alert("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="signup" className="pane">
            <h1 style={{fontSize:'4rem',color:'#020b3b'}}>Sign Up</h1>
            <form onSubmit={handleSubmit(save)}>
                <label htmlFor="signup-nom">Nom*</label>
                <input type="text" id="signup-nom" required autoComplete="off" {...register("nom", {
                    required: true,
                    maxLength: 10
                })}/>

                {errors.nom && <p className="error-message">Le nom est requis.</p>}

                <label htmlFor="signup-prenom">Prénom*</label>
                <input type="text" id="signup-prenom" required
                       autoComplete="off" {...register("prenom", {required: true, pattern: /^[A-Za-z]+$/i})}/>
                {errors.prenom && <p className="error-message">Le prénom est requis.</p>}

                <label htmlFor="signup-adresse">Adresse*</label>
                <input type="text" id="signup-adresse" required
                       autoComplete="off" {...register("adresse", {required: true, minLength: 5})}/>
                {errors.adresse && <p className="error-message">L'adresse est requis.</p>}

                <label htmlFor="signup-phone">Numéro de téléphone*</label>
                <input type="text" id="signup-phone" required autoComplete="off" {...register("phone_number", {
                    required: true,
                    pattern: /^(\+[0-9]{1,3}[-\s]?)?([0-9]{10})$/

                })}/>
                {errors.phone_number && <p className="error-message">Le numéro de téléphone est requis.</p>}

                <label htmlFor="signup-email">Email*</label>
                <input type="email" id="signup-email" required autoComplete="off" {...register("email", {
                    required: true,
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}/>
                {errors.email && <p className="error-message">L'email est requis.</p>}

                <label htmlFor="signup-password">Mot de passe*</label>
                <div className="password-input">
                    <input type={passwordShown ? 'text' : 'password'} id="signup-password" required
                           autoComplete="off" {...register("password", {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                    })}/>
                    {errors.password && <p className="error-message">Le mot de passe est requis.</p>}
                    <i onClick={togglePasswordVisibility}>{eye}</i>
                </div>

                <h3 className="required-fields">*Tous les champs sont obligatoires</h3>
                <button type="submit" className="btn" disabled={isSubmitting}>
                    {isSubmitting ? 'En cours...' : 'Sign Up'}
                </button>
                <p>Veuillez procéder à l'activation de votre compte en utilisant le code envoyé à votre adresse
                    e-mail.</p>
            </form>
        </div>

    );
}

export default SignUp;
