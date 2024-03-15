import React from 'react';
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import img2 from "../img/img2.jpg"
import "../Styles/cars.css"

const Cars = () => {
    return (
        <main className="cars">
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
                <section className="brands container" id="cars">

                    <div className="heading">
                        <h1 className="section-subtitle :dark">Our car brands</h1>
                    </div>
                    <div className="properties-container container">

                        <div className="box">
                            <img src={img2} alt=""/>
                            <h3>97.000 km</h3>
                            <div className="content">
                                <div className="text">
                                    <h3>Anne : 2020</h3>
                                    <p>Metz,France</p>
                                </div>
                                <div className="icon">
                                    <i className='bx bx-palette'><span>17.000 $</span></i>
                                    <i className='bx bxs-car-mechanic'><span>HYBRID</span></i>

                                </div>
                            </div>
                        </div>

                        <div className="box">
                            <img src={img2} alt=""/>
                            <h3>170.000 km</h3>
                            <div className="content">
                                <div className="text">
                                    <h3>Anne : 2020</h3>
                                    <p>Metz,France</p>
                                </div>
                                <div className="icon">
                                    <i className='bx bx-palette'><span>17.000 $</span></i>
                                    <i className='bx bxs-car-mechanic'><span>Essence</span></i>

                                </div>
                            </div>
                        </div>

                        <div className="box">
                            <img src={img2} alt=""/>
                            <h3>84.000 km</h3>
                            <div className="content">
                                <div className="text">
                                    <h3>Anne : 2020</h3>
                                    <p>Metz,France</p>
                                </div>
                                <div className="icon">
                                    <i className='bx bx-palette'><span>17.000 $</span></i>
                                    <i className='bx bxs-car-mechanic'><span>Diesel</span></i>

                                </div>
                            </div>
                        </div>

                        <div className="box">
                            <img src={img2} alt=""/>
                            <h3>120.000 km</h3>
                            <div className="content">
                                <div className="text">
                                    <h3>Anne : 2020</h3>
                                    <p>Metz,France</p>
                                </div>
                                <div className="icon">
                                    <i className='bx bx-palette'><span>17.000 $</span></i>
                                    <i className='bx bxs-car-mechanic'><span>HYBRID</span></i>

                                </div>
                            </div>
                        </div>

                        <div className="box">
                            <img src={img2} alt=""/>
                            <h3>115.000km</h3>
                            <div className="content">
                                <div className="text">
                                    <h3>Anne : 2020</h3>
                                    <p>Metz,France</p>
                                </div>
                                <div className="icon">
                                    <i className='bx bx-palette'><span>17.000 $</span></i>
                                    <i className='bx bxs-car-mechanic'><span>Diesel</span></i>

                                </div>
                            </div>
                        </div>
                        <div className="box">
                            <img src={img2} alt=""/>
                            <h3>25000000 km</h3>
                            <div className="content">
                                <div className="text">
                                    <h3>Anne : 2020</h3>
                                    <p>Metz,France</p>
                                </div>
                                <div className="icon">
                                    <i className='bx bx-palette'><span>17.000 $</span></i>
                                    <i className='bx bxs-car-mechanic'><span>Essence</span></i>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </main>

    );
};
export default Cars;