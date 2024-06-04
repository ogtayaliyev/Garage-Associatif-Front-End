import React from 'react';
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import servicebg from "../img/servicebg.jpg";
import services1 from "../img/services1.png";
import services2 from "../img/services2.png";
import services3 from "../img/services3.png";
import services4 from "../img/services4.png";
import services5 from "../img/services5.png";
import services6 from "../img/services6.png";
import Reservation from "../components/Entretien/Reservation";

const Reservationentretien = () => {
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
                         style={{backgroundImage: `url(${servicebg})`}} id="home">
                    <div className="container">
                        <p className="section-subtitle :light" id="service-label">
                            Nos Services
                        </p>
                        <h2 className="h2 section-title">
                            Nous fournissons d'excellents services pour votre véhicule
                        </h2>

                        <ul className="service-list">
                            <li>
                                <div className="service-card">
                                    <figure className="card-icon">
                                        <img src={services1} style={{width: '110', height: '110'}}
                                             loading="lazy"
                                             alt="Engine Repair"/>
                                    </figure>

                                    <h3 className="h3 card-title">Réparation de Moteur</h3>

                                    <p className="card-text">
                                        Durée de la réparation du moteur : <span style={{color:"red"}}><b>3 heures</b></span>
                                    </p>


                                </div>
                            </li>

                            <li>
                                <div className="service-card">
                                    <figure className="card-icon">
                                        <img src={services2} style={{width: '110', height: '110'}}
                                             loading="lazy"
                                             alt="Brake Repair"/>
                                    </figure>

                                    <h3 className="h3 card-title">Diagnostic</h3>

                                    <p className="card-text">
                                        Durée du diagnostic : <span style={{color:"red"}}> <b>40 minutes</b> </span>
                                    </p>


                                </div>
                            </li>

                            <li>
                                <div className="service-card">
                                    <figure className="card-icon">
                                        <img src={services3} style={{width: '110', height: '110'}}
                                             loading="lazy" alt="Tire Repair"/>
                                    </figure>

                                    <h3 className="h3 card-title">Pneumatiques</h3>

                                    <p className="card-text">
                                        Durée du changement de pneus :<span style={{color:"red"}}><b>60 minutes</b></span>
                                    </p>


                                </div>
                            </li>

                            <li>
                                <div className="service-card">
                                    <figure className="card-icon">
                                        <img src={services4} style={{width: '110', height: '110'}}
                                             loading="lazy"
                                             alt="Battery Repair"/>
                                    </figure>

                                    <h3 className="h3 card-title">Service Electricien</h3>

                                    <p className="card-text">
                                        Durée du service de l'électricien : <span style={{color:"red"}}><b>1 heure et 30 minutes</b></span>
                                    </p>


                                </div>
                            </li>

                            <li className="service-banner">
                                <img src={services5} style={{width: '646', height: '380'}} loading="lazy"
                                     alt="Red Car"
                                     className="move-anim"/>
                            </li>

                            <li>
                                <div className="service-card">
                                    <figure className="card-icon">
                                        <img src={services6} style={{width: '110', height: '110'}}
                                             loading="lazy"
                                             alt="Steering Repair"/>
                                    </figure>

                                    <h3 className="h3 card-title">Courroie de distribution</h3>

                                    <p className="card-text">
                                        Durée du changement de courroie de distribution :<span style={{color:"red"}}><b>2 heures</b></span>
                                    </p>


                                </div>
                            </li>
                        </ul>
<div className="box-container"><Reservation/></div>

                    </div>
                </section>


            </article>
        </main>
    );
};

export default Reservationentretien;