import React from 'react';
import hero from "../img/herobg.jpg";
import image30 from "../img/image-30.png";
import herobanner from "../img/herobanner.png";
import "../Styles/apropos.css"

const Apropos = () => {
    return (
        <main className="apropos">
            <article>

                <section className="hero has-bg-image" aria-label="home"
                         style={{backgroundImage: `url(${hero})`}}
                         id="home">
                    <div className="container">
                        <div className="hero-content">


                            <p className="section-text">

                            </p>


                        </div>

                        <figure className="hero-banner" style={{width: '1228', height: '789'}}>
                            <img src={herobanner} style={{width: '28', height: '9'}} alt="red motor vehicle"/>
                        </figure>
                    </div>
                </section>

                <section id="about" className="section about has-" aria-labelledby="about-label">

                    <div className="container">
                        <div className="section-text">
                        <h2><span>Objectifs principaux :</span></h2><br/>
                            <p>
                                Gestion des plannings : Permettre une optimisation des prises de rendez-vous des
                                techniciens, tant au niveau journalier,
                                hebdomadaire que mensuel. <br/>

                                Gain de temps dans la phase de réservations : Réduire le temps nécessaire pour prendre
                                rendez-vous en limitant les
                                appels téléphoniques. <br/><br/>

                                Développement du Garage Solidaire : Permettre à des clients adhérents de réparer
                                eux-mêmes
                                leur véhicule en utilisant le
                                matériel mis à disposition par le garage. Ce service devra permettre la gestion de trois
                                véhicules maximum
                                simultanément.

                                Augmentation des ventes de véhicules : Mettre en avant les activités du garage pour
                                attirer
                                de nouveaux clients et
                                fidéliser les existants. <br/>

                                Optimisation du temps de travail des techniciens : Calculer de manière précise le temps
                                de
                                travail journalier,
                                hebdomadaire et mensuel des techniciens pour une meilleure gestion des ressources
                                humaines. <br/><br/>

                                Satisfaction des clients : Assurer un service de qualité en répondant efficacement aux
                                demandes de rendez-vous et en
                                offrant des plages horaires adaptées. <br/>

                                Réduction des non-réponses téléphoniques : Limiter la perte de clients potentiels en
                                proposant un système de réservation
                                en ligne efficace et accessible. <br/>
                            </p>
                        </div>
                        <div>
                            <img src={image30} alt=""/>
                        </div>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Apropos;