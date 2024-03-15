import React, { useState } from 'react';
import {useHistory} from  'react-router-dom'
import axios from 'axios';
import "../Styles/style.css";
import "../Styles/register.css";
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import servicebg from "../img/servicebg.jpg";
import separator from "../img/separator.png";

const Register = () => {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/inscription", {
                nom: nom,
                email: email,
                password: password,
            });
            alert("Employee Registration Successful");
        } catch (err) {
            alert(err);
        }
    }

    async function login(event) {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/connexion", {
                email: email,
                password: password,
            });
            console.log(res.data);

            if (res.data.message === "Email not exists") {
                alert("Email not exists");
            } else if (res.data.message === "Login Success") {
                login.push('/home'); // Rediriger vers la page d'accueil après connexion réussie
            } else {
                alert("Incorrect Email and Password not match");
            }
        } catch (err) {
            alert(err);
        }
    }

    return (
        <main>
            <article>
                <section className="hero has-bg-image" aria-label="home" style={{ backgroundImage: `url(${gar5})` }} id="home">
                    <div className="container">
                        <div className="hero-content">
                            <p className="section-text"></p>
                        </div>
                        <figure className="hero-banner" style={{ width: '1228px', height: '789px' }}>
                            <img src={herobanner} style={{ width: '28px', height: '9px' }} alt="red motor vehicle" />
                        </figure>
                    </div>
                </section>
                <section className="section service has-bg-image" aria-labelledby="service-label" style={{ backgroundImage: `url(${servicebg})` }} id="services">
                    <div className="content">

                        <div id="login" className="pane">
                            <h1>Log In</h1>
                            <form onSubmit={login}>
                                <label>
                                    Email
                                </label>
                                <input type="email" required autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label>
                                    Password
                                </label>
                                <input type="password" required autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <h3 className="forgot"><a href="#">Forgot Password?</a></h3>
                                <button type="submit" className="btn btn-primary">Log In</button>
                            </form>
                        </div>

                        <img className="separator" src={separator} alt="Separateure horizantal" />
                        {/*<img className="separator2" src="./assets/images/Fram55.png" alt="separature vertical"/>*/}

                        <div id="signup" className="pane">
                            <h1>Sign Up</h1>
                            <form onSubmit={save}>
                                <label>
                                    Name
                                </label>
                                <input type="text" required autoComplete="off" value={nom} onChange={(e) => setNom(e.target.value)} />
                                <label>
                                    Email
                                </label>
                                <input type="email" required autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label>
                                    Set Password
                                </label>
                                <input type="password" required autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <h3 className="forgot">Veuillez remplir tous les champs formulaire</h3>
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Register;
