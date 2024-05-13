import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";

function CodeActivation(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isActivating, setIsActivating] = useState(false);
    const [activationError, setActivationError] = useState('');

    const activateAccount = async (data) => {
        setIsActivating(true);
        try {
            await axios.post('http://localhost:8080/api/activation', {
                code: data.verificationCode,
            });
            alert('Activation du compte réussie ! Vous pouvez maintenant vous connecter.');
        } catch (err) {
            console.error(err);
            setActivationError("Une erreur s'est produite lors de l'activation du compte. Veuillez vérifier le code de vérification et réessayer.");
        } finally {
            setIsActivating(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(activateAccount)}>
                <label htmlFor="activation-code">Activation Code</label>
                <input type="text" id="activation-code" required autoComplete="off"
                       {...register("verificationCode", { required: true })}/>
                {errors.verificationCode && <p className="error-message">Le code d'activation est requis.</p>}
                {activationError && <p className="error-message">{activationError}</p>}
                <button type="submit" className="btn" disabled={isActivating}>
                    {isActivating ? 'Activation en cours...' : 'Activer le compte'}
                </button>
            </form>
        </div>
    );
}

export default CodeActivation;
