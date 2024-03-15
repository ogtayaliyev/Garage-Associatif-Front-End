import React from 'react';
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import OutilReservation from "../components/Reservation/OutilReservation";


const Reservationoutils = () => {
    return (
        <main className="contact">
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
                    <OutilReservation/>
                </section>
                <section id="about" className="section about has-before" aria-labelledby="about-label">



                </section>
            </article>
        </main>
    );
};

export default Reservationoutils;