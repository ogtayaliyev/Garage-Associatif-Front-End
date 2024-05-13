import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import "../Styles/cars.css";
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import img2 from "../img/img2.jpg";

const Cars = () => {
    const { register, handleSubmit } = useForm();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/voitureOccasion');
            if (!response.ok) {
                throw new Error('Failed to fetch cars');
            }
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <main className="cars">
            <article>
                <section className="hero has-bg-image" aria-label="home" style={{backgroundImage: `url(${gar5})`}}>
                    <div className="container">
                        <div className="hero-content">
                            <p className="section-text"></p>
                        </div>
                        <figure className="hero-banner">
                            <img src={herobanner} alt="red motor vehicle" style={{width: '100%', height: 'auto'}} />
                        </figure>
                    </div>
                </section>
                <section className="brands container" id="cars">
                    <div className="heading">
                        <h1 className="section-subtitle :dark">Our car brands</h1>
                    </div>
                    <div className="properties-container container">
                        {cars.map((car) => (
                            <div className="box" key={car.id}>
                                <img src={img2} alt={car.voitures.model.model_nom} />
                                <h3>{car.voitures.kilometrage}</h3>
                                <div className="content">
                                    <div className="text">
                                        <h3>Year: {new Date(car.voitures.anne_fabrication).getFullYear()}</h3>
                                        <p>{car.voitures.boite}</p>
                                    </div>
                                    <div className="icon">
                                        <i className='bx bx-palette'><span>{car.prix}</span></i>
                                        <i className='bx bxs-car-mechanic'><span>{car.voitures.carburant}</span></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Cars;
