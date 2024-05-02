import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../Styles/style.css';
import '../Styles/register.css';
import gar5 from '../img/gar5.jpg';
import herobanner from '../img/herobanner.png';
import servicebg from '../img/servicebg.jpg';
import separator from '../img/separator.png';

const eye = <FontAwesomeIcon icon={faEye} />;

const Register = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adresse, setAdresse] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    // Fonction pour basculer entre afficher/masquer le mot de passe
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    // Fonction pour gérer l'inscription de l'utilisateur
    const save = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/inscription', {
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
                adresse: adresse,
                phone_number: phone_number,
            });
            alert(
                "L'inscription utilisateur a réussi avec succès. Pour activer votre compte, veuillez vérifier votre adresse e-mail et saisir le code reçu dans la zone d'activation prévue à cet effet."
            );
        } catch (err) {
            alert(err);
        }
    };

    // Fonction pour activer le compte de l'utilisateur
    const activateAccount = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/activation', {
                code: verificationCode,
            });
            alert('Activation du compte réussie ! Vous pouvez maintenant vous connecter.');
        } catch (err) {
            console.error(err);
            alert(
                "Une erreur s'est produite lors de l'activation du compte. Veuillez vérifier le code de vérification et réessayer."
            );
        }
    };

    // Fonction pour gérer la connexion de l'utilisateur
    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/connexion', {
                email: email,
                password: password,
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
        <main>
            <article>
                <section className="hero has-bg-image" aria-label="home" style={{backgroundImage: `url(${gar5})`}}
                         id="home">
                    <div className="container">
                        <div className="hero-content">
                            <p className="section-text"></p>
                        </div>
                        <figure className="hero-banner" style={{width: '1228', height: '789'}}>
                            <img src={herobanner} style={{width: '28', height: '9'}} alt="red motor vehicle"/>
                        </figure>
                    </div>
                </section>
                <section className="section service has-bg-image" aria-labelledby="service-label"
                         style={{backgroundImage: `url(${servicebg})`}} id="services">
                    <div className="content">
                        <img className="separator" src={separator} alt="Separateur horizantal"/>
                        <div id="login" className="pane">
                            <h1>Log In</h1>
                            <form onSubmit={login}>
                                <label htmlFor="login-email">Email</label>
                                <input type="email" id="login-email" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <label htmlFor="login-password">Password</label>
                                <div className="password-input">
                                    <input type={passwordShown ? 'text' : 'password'} id="login-password"
                                           value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    <i onClick={togglePasswordVisibility}>{eye}</i>
                                </div>
                                <h3 className="forgot"><a href="/forgotpassword">Forgot Password?</a></h3>
                                <button type="submit" className="btn">Log In</button>
                            </form>
                            <form onSubmit={activateAccount}>
                                <label htmlFor="activation-code">Activation Code</label>
                                <input type="text" id="activation-code" required autoComplete="off"
                                       value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}/>
                                <button type="submit" className="btn">Activate Account</button>
                            </form>
                        </div>
                        <img className="separator" src={separator} alt="Separateur horizantal"/>
                        <div id="signup" className="pane">
                            <h1>Sign Up</h1>
                            <form onSubmit={save}>
                                <label htmlFor="signup-nom">Nom*</label>
                                <input type="text" id="signup-nom" required autoComplete="off" value={nom}
                                       onChange={(e) => setNom(e.target.value)}/>
                                <label htmlFor="signup-prenom">Prenom*</label>
                                <input type="text" id="signup-prenom" required autoComplete="off" value={prenom}
                                       onChange={(e) => setPrenom(e.target.value)}/>
                                <label htmlFor="signup-adresse">Adresse*</label>
                                <input type="text" id="signup-adresse" required autoComplete="off" value={adresse}
                                       onChange={(e) => setAdresse(e.target.value)}/>
                                <label htmlFor="signup-phone">Phone Number*</label>
                                <input type="text" id="signup-phone" required autoComplete="off" value={phone_number}
                                       onChange={(e) => setPhone_number(e.target.value)}/>
                                <label htmlFor="signup-email">Email*</label>
                                <input type="email" id="signup-email" required autoComplete="off" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <label htmlFor="signup-password">Password*</label>
                                <div className="password-input">
                                    <input type={passwordShown ? 'text' : 'password'} id="signup-password" required
                                           autoComplete="off" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                    <i onClick={togglePasswordVisibility}>{eye}</i>
                                </div>
                                <h3 className="required-fields">*Tous les champs sont obligatoires</h3>
                                <button type="submit" className="btn">Sign Up</button>
                                <p>Veuillez procéder à l'activation de votre compte en utilisant le code envoyé à votre
                                    adresse e-mail.</p>
                            </form>
                        </div>
                        <img className="separator" src={separator} alt="Separateur horizantal"/>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Register;
