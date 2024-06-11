import React, { useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../Styles/garagebox.css";
import box2 from "../../img/box2.png";
import box3 from "../../img/box3.jpeg";
import box4 from "../../img/box4.jpeg";
import box5 from "../../img/box5.png";


const GarageBoxReservation = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState("00:00");
    const [endDate, setEndDate] = useState(new Date());
    const [endTime, setEndTime] = useState("00:00");
    const [boxId, setBoxId] = useState(1);

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Manipulation des dates et heures de début et de fin
            const startDateTime = new Date(startDate);
            const startHour = startDateTime.getHours();
            const startMinute = startDateTime.getMinutes();
            startDateTime.setHours(parseInt(startTime.split(":")[0]));
            startDateTime.setMinutes(parseInt(startTime.split(":")[1]));

            const returnDateTime = new Date(endDate);
            returnDateTime.setHours(parseInt(endTime.split(":")[0]));
            returnDateTime.setMinutes(parseInt(endTime.split(":")[1]));

            // Données de réservation
            const reservationData = {
                startDate: startDateTime.toISOString().slice(0, -5),
                returnDate: returnDateTime.toISOString().slice(0, -5),
                box: { id: boxId },
                startHour: startHour,
                startMinute: startMinute
            };

            const response = await axios.post('/api/locationbox', reservationData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('bearer')}`
                }
            });

            if (response.status === 200) {
                // Vider les champs après la réussite de la réservation
                setStartDate(new Date());
                setStartTime("00:00");
                setEndDate(new Date());
                setEndTime("00:00");
                setBoxId(1);

                // Afficher une alerte pour informer l'utilisateur
                alert("La réservation a été effectuée avec succès.");
            }
        } catch (error) {
            console.error('Erreur lors de la réservation :', error);
            alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
        }
    };


     return (
         <div className="reservation_container">
             <div className="container2">
                 <h2 className="titlegaragebox">Réserver une box</h2>
                 <p className="info-text flashing-text">La réservation est limitée à 3 heures à partir de
                     l'heure de début sélectionnée.</p>
                 <form onSubmit={handleSubmit}>
                     <div className="calendar-container">
                         <div className="calendar">
                             <label className="content2garagebox">Sélectionnez la date de début :</label>
                             <Calendar
                                 onChange={handleDateChange}
                                 value={startDate}
                                 minDate={new Date()} // Limiter la sélection à partir de la date actuelle
                             />
                         </div>

                         <div>
                             <label className="contentgaragebox">Heure de début :</label>
                             <input
                                 type="time"
                                 value={startTime}
                                 onChange={(e) => setStartTime(e.target.value)}
                                 required
                             />
                         </div>

                         <div>
                             <label className="contentgaragebox">Date et heure de fin :</label>
                             <input
                                 type="date"
                                 value={endDate.toISOString().split('T')[0]} // Tarihi al ve ISO 8601 formatına uygun şekilde göster
                                 onChange={(e) => setEndDate(new Date(e.target.value))}
                                 required
                             />
                             <input
                                 type="time"
                                 value={endTime}
                                 onChange={(e) => setEndTime(e.target.value)}
                                 required
                             />
                         </div>
                         <div>
                             <label className="content2garagebox">Type de box :</label>
                             <select value={boxId} onChange={(e) => setBoxId(Number(e.target.value))}>
                                 <option value={1}>Petit</option>
                                 <option value={2}>Normal</option>
                                 <option value={3}>Grand</option>
                                 <option value={4}>Très grand</option>
                             </select>
                         </div>
                         <button className="button2" type="submit">Réserver</button>
                     </div>
                 </form>
             </div>
             <div className="boxes-grid">
                 <img src={box2} alt="Petite boîte" className="box-image" onClick={() => setBoxId(1)}/>
                 <img src={box3} alt="Boîte normale" className="box-image" onClick={() => setBoxId(2)}/>
                 <img src={box4} alt="Grande boîte" className="box-image" onClick={() => setBoxId(3)}/>
                 <img src={box5} alt="Très grande boîte" className="box-image" onClick={() => setBoxId(4)}/>

             </div>
         </div>

     );
};

export default GarageBoxReservation;
