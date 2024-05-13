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
            <h1>Log In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-email" {...register("email", { required: true })}/>
                {errors.email && <span>Ce champ est requis</span>}
                <label htmlFor="login-password">Password</label>
                <div className="password-input">
                    <input
                        type={passwordShown ? 'text' : 'password'}
                        id="login-password"
                        {...register("password", { required: true })}
                    />
                    <i onClick={togglePasswordVisibility}>{eye}</i>
                </div>
                {errors.password && <span>Ce champ est requis</span>}
                <h3 className="forgot"><a href="/forgotpassword">Forgot Password?</a></h3>
                <button type="submit" className="btn">Log In</button>
            </form>
        </div>
    );
}

export default Login;
