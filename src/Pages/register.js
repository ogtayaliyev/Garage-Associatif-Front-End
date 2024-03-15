import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/style.css";
import "../Styles/register.css";
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import servicebg from "../img/servicebg.jpg";
import separator from "../img/separator.png";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adresse ,setAdresse]= useState("")
    const [phone_number,setPhone_number]= useState("")
    const navigate = useNavigate();

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/inscription", {
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
                adresse: adresse,
                phone_number:phone_number,
            });
            alert("Utilisateure Registration Successful");
        } catch (err) {
            alert(err);
        }
    }

    const login = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/connexion", {
                email: email,
                password: password,
            });
            const { bearer} = response.data;
            if (bearer) {
                localStorage.setItem('bearer', bearer); // Stocker le token JWT dans le localStorage
                navigate('/profil'); // Rediriger l'utilisateur vers la page profil
            } else {
                alert("Incorrect Email and Password not match");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred during login");
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
                        <img className="separator" src={separator} alt="Separateure horizantal"/>
                        <div id="login" className="pane">
                            <h1>Log In</h1>
                            <form onSubmit={login}>
                                <label>
                                    Email
                                </label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <label>
                                    Password
                                </label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <h3 className="forgot"><a href="#">Forgot Password?</a></h3>
                                <button type="submit" className="btn btn-primary">Log In</button>
                            </form>
                        </div>
                        <img className="separator" src={separator} alt="Separateure horizantal"/>
                        {/*<img className="separator2" src="./assets/images/Fram55.png" alt="separature vertical"/>*/}

                        <div id="signup" className="pane">
                            <h1>Sign Up</h1>
                            <form onSubmit={save}>
                                <label>
                                    Nom
                                </label>
                                <input type="text" required autoComplete="off" value={nom}
                                       onChange={(e) => setNom(e.target.value)}/>
                                <label>
                                    PreNom
                                </label>
                                <input type="text" required autoComplete="off" value={prenom}
                                       onChange={(e) => setPrenom(e.target.value)}/>
                                <label>
                                    Adresse
                                </label>
                                <input type="text" required autoComplete="off" value={nom}
                                       onChange={(e) => setAdresse(e.target.value)}/>
                                <label>
                                    Phone Number
                                </label>
                                <input type="text" required autoComplete="off" value={nom}
                                       onChange={(e) => setPhone_number(e.target.value)}/>
                                <label>
                                    Email
                                </label>
                                <input type="email" required autoComplete="off" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <label>
                                    Password
                                </label>
                                <input type="password" required autoComplete="off" value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>

                                <h3 className="forgot">Veuillez remplir tous les champs formulaire</h3>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>

                        </div>

                        <img className="separator" src={separator} alt="Separateure horizantal"/>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Register;
