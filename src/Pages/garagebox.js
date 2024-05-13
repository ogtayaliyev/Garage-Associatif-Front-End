import React, {useState} from 'react';
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import GarageBoxReservation from "../components/Reservation/GarageBoxReservation";
import box2 from "../img/box2.png";
import box3 from "../img/box3.jpeg";
import box4 from "../img/box4.jpeg";
import box5 from "../img/box5.png";
import "../Styles/garagebox.css"

const Garagebox = () => {
    const [boxId, setBoxId] = useState(1);
    return (
        <main className="contact">
            <article>
                <section className="hero has-bg-image" aria-label="home" style={{backgroundImage: `url(${gar5})`}} id="home">
                    <div className="container">
                        <div className="hero-content">
                            <p className="section-text"></p>
                        </div>
                        <figure className="hero-banner" style={{width: '1228', height: '789'}}>
                            <img src={herobanner} style={{width: '28', height: '9'}} alt="red motor vehicle"/>
                        </figure>
                    </div>
                </section>
                <section id="about" className="section about has-before" aria-labelledby="about-label">
                    <div>
                        <GarageBoxReservation/>

                    </div>


                </section>
            </article>
        </main>
    );
};

export default Garagebox;
