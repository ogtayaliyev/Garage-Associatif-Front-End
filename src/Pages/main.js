import React from 'react';
import hero from "../img/herobg.jpg";
import herobanner from "../img/herobanner.png";
import services1 from "../img/services1.png";
import services2 from "../img/services2.png";
import services3 from "../img/services3.png";
import services4 from "../img/services4.png";
import services5 from "../img/services5.png";
import services6 from "../img/services6.png";
import aboutbanner from "../img/aboutbanner.png";
import work1 from "../img/work1.jpg";
import work2 from "../img/work2.jpg";
import work3 from "../img/Citroen.jpg";
import servicebg from "../img/servicebg.jpg";

const Main = () => {
    return (
        <main>
            <article>

                <section className="hero has-bg-image" aria-label="home"
                         style={{backgroundImage: `url(${hero})`}}
                         id="home">
                    <div className="container">
                        <div className="hero-content">
                            <p className="section-subtitle :dark">
                                Nous avons des ingénieurs et des mécaniciens talentueux
                            </p>

                            <h1 className="h1 section-title">
                                Service d'entretien et de réparation automobile
                            </h1>
                            <p className="section-text">

                            </p>

                            <a href="/reservationoutils" className="btn">
                                <span className="span">location outils</span>
                                <span className="material-symbols-rounded"></span>
                            </a>
                        </div>

                        <figure className="hero-banner" style={{width: '1228', height: '789'}}>
                            <img src={herobanner} style={{width: '1228', height: '789'}} alt="red motor vehicle"
                            />
                        </figure>
                    </div>
                </section>


                <section className="section service has-bg-image" aria-labelledby="service-label"
                         style={{ backgroundImage: `url(${servicebg})` }} id="home">
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
                                        Le cœur de votre voiture entre de bonnes mains : notre expertise, votre
                                        confiance
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
                                        Diagnostic précis, solutions efficaces : notre expertise au service de votre
                                        véhicule en toute confiance
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
                                        Roulez en toute confiance avec nos pneumatiques de qualité supérieure.
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
                                        Connectez-vous à la puissance avec notre électricien de garage.
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
                                        Fiabilité en mouvement : Notre spécialité, la courroie de distribution.
                                    </p>


                                </div>
                            </li>
                        </ul>

                        <a href="/reservationentretien" className="btn">
                            <span className="span">Reserver Entretien</span>
                            <span className="material-symbols-rounded"></span>
                        </a>
                    </div>
                </section>

                <section id="about" className="section about has-before" aria-labelledby="about-label">
                    <div className="container">
                        <figure className="about-banner">
                            <img src={aboutbanner} style={{width: '540', height: '540'}} loading="lazy"
                                 alt="vehicle repair equipments" className="w-100"/>
                        </figure>

                        <div className="about-content">
                            <p className="section-subtitle :dark">A Propos</p>
                            <h2 className="h2 section-title">
                                NOUS NOUS ENGAGEONS À ASSURER LA QUALITÉ
                            </h2>
                            <p className="section-text">
                                Notre engagement indéfectible envers l'excellence et la qualité guide chacune de nos
                                actions. Avec rigueur
                                et
                                détermination, nous nous investissons pour garantir des produits et services qui
                                dépassent les attentes,
                                assurant ainsi
                                la satisfaction totale de nos clients et partenaires, à chaque étape de notre parcours.
                            </p>


                            <ul className="about-list">
                                <li className="about-item">
                                    <p>
                                        <strong className="display-1 strong">8K+</strong> Happy Clients
                                    </p>
                                </li>
                                <li className="about-item">
                                    <p>
                                        <strong className="display-1 strong">22+</strong>
                                        Instruments
                                    </p>
                                </li>
                                <li className="about-item">
                                    <p>
                                        <strong className="display-1 strong">50+</strong>
                                        Years in market
                                    </p>
                                </li>
                                <li className="about-item">
                                    <p>
                                        <strong className="display-1 strong">99%</strong>
                                        Projects completed
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="projects" className="section work" aria-labelledby="work-label">
                    <div className="container">
                        <p className="section-subtitle :light" id="work-label">Garage Associaetif</p>
                        <h2 className="h2 section-title">Services Location Vente</h2>

                        <ul className="has-scrollbar">
                            <li className="scrollbar-item">
                                <div className="work-card">
                                    <figure className="card-banner img-holder" style={{width: '350', height: '406'}}>
                                        <img src={work1} style={{width: '350', height: '406'}} loading="lazy"
                                             alt="Engine Repair"
                                             className="img-cover"/>
                                    </figure>

                                    <div className="card-content">
                                        <p className="card-subtitle">Garage Associaetif</p>
                                        <h3 className="h3 card-title">Location garage</h3>
                                        <a href="/cars" className="card-btn">
                                            <span className="material-symbols-rounded">-></span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="scrollbar-item">
                                <div className="work-card">
                                <figure className="card-banner img-holder" style={{width: '350', height: '406'}}>
                                        <img src={work2} style={{width: '350', height: '406'}} loading="lazy"
                                             alt="Car Tyre change"
                                             className="img-cover"/>
                                    </figure>

                                    <div className="card-content">
                                        <p className="card-subtitle">Garage Associaetif</p>
                                        <h3 className="h3 card-title">Location Outils</h3>
                                        <a href="/reservationoutils" className="card-btn">
                                            <span className="material-symbols-rounded">-></span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="scrollbar-item">
                                <div className="work-card">
                                    <figure className="card-banner img-holder" style={{width: '350', height: '406'}}>
                                        <img src={work3} style={{width: '350', height: '406'}} loading="lazy"
                                             alt="Battery Adjust"
                                             className="img-cover"/>
                                    </figure>

                                    <div className="card-content">
                                        <p className="card-subtitle">Garage Associaetif</p>
                                        <h3 className="h3 card-title">Voiture occasions</h3>
                                        <a href="/cars" className="card-btn">
                                            <span className="material-symbols-rounded">-></span>
                                        </a>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Main;