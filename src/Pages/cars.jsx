import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import "../Styles/cars.css";
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import img2 from "../img/img2.jpg";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Cars = () => {
    const { register, handleSubmit } = useForm();
    const [cars, setCars] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const carsPerPage = 6;

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch('/api/voitureOccasion');
            if (!response.ok) {
                throw new Error('Failed to fetch cars');
            }
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleNextPage = () => {
        // Déplacer l'indice de début au prochain groupe de voitures
        setStartIndex(startIndex + carsPerPage);
    };

    const handlePrevPage = () => {
        // Déplacer l'indice de début à la page précédente
        setStartIndex(startIndex - carsPerPage);
    };

    const visibleCars = cars.slice(startIndex, startIndex + carsPerPage);

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
                        {visibleCars.map((car, index) => (
                            <div className="box" key={car.id}>
                                <img src={img2} alt={car.voitures.model.model_nom}/>
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
                    <div className="nav-buttons">
                        {startIndex > 0 && (
                            <button className="nav-button" onClick={handlePrevPage}>
                                <FaArrowLeft size={48}/>
                            </button>
                        )}
                        {(startIndex + carsPerPage) < cars.length && (
                            <button className="nav-button" onClick={handleNextPage}>
                                <FaArrowRight size={48}/>
                            </button>
                        )}
                    </div>
                </section>
            </article>
        </main>
    );
};

export default Cars;
