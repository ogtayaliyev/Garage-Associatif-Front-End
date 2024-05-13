import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../Styles/style.css';
import '../Styles/register.css';
import gar5 from '../img/gar5.jpg';
import herobanner from '../img/herobanner.png';
import servicebg from '../img/servicebg.jpg';
import separator from '../img/separator.png';
import Login from "../components/Login/login";
import CodeActivation from "../components/Login/codeActivation";
import SignUp from "../components/Login/signUp";

const eye = <FontAwesomeIcon icon={faEye} />;

const Register = () => {

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
                           <Login/>
                           <CodeActivation/>
                       </div>
                        <img className="separator" src={separator} alt="Separateur horizantal"/>
                        <SignUp/>
                        <img className="separator" src={separator} alt="Separateur horizantal"/>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Register;
