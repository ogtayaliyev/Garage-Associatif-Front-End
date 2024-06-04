import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const eye = <FontAwesomeIcon icon={faEye} />;

function Login(props) {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/connexion', {
                email: data.email,
                password: data.password,
            });
            const { bearer } = response.data;
            if (bearer) {
                localStorage.setItem('bearer', bearer);
                navigate('/profil');
            } else {
                alert("L'e-mail et le mot de passe incorrects ne correspondent pas");
            }
        } catch (err) {
            console.error(err);
            alert('Une erreur s\'est produite lors de la connexion.');
        }
    };


    return (
        <div >
            <h1 style={{fontSize:'4rem',color:'#020b3b'}}>Log In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-email" {...register("email", { required: true,pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  })}/>
                {errors.email && <span>Votre adresse email n'est pas correct</span>}
                <label htmlFor="login-password">Password</label>
                <div className="password-input">
                    <input
                        type={passwordShown ? 'text' : 'password'}
                        id="login-password"
                        {...register("password", { required: true,pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/ ,minLength:8})}
                    />
                    <i onClick={togglePasswordVisibility}>{eye}</i>
                </div>
                {errors.password && <span>Le mot de passe doit avoir une longueur de 8 caractères, incluant au moins une lettre majuscule, un chiffre et un caractère spécial.</span>}
                <h3 className="forgot"><a href="/forgotpassword">Forgot Password?</a></h3>
                <button type="submit" className="btn">Log In</button>
            </form>
        </div>
    );
}

export default Login;
