import React, { useState } from 'react';
import axios from 'axios';
import "./outil.css"

const GarageBoxReservation = () => {
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [boxId, setBoxId] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reservationData = {
                startDate: `${startDate}T${startTime}:00`,
                returnDate: `${endDate}T${endTime}:00`,
                box: { id: boxId }
            };
            const response = await axios.post('http://localhost:8080/api/locationbox', reservationData);
            console.log(response.data);
        } catch (error) {
            console.error('Rezervasyon oluşturulurken hata:', error.response.data);
        }
    };

    return (
        <div>
            <h2 className="title2">Réserver une box</h2>
            <form className="container2" onSubmit={handleSubmit}>
                <div>
                    <label className="content2">Date de début:</label>
                    <input className="input2" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    <input className="input2" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div>
                    <label className="content">Date de fin:</label>
                    <input className="input2" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    <input className="input2" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
                <div>
                    <label className="content2">Type de box:</label>
                    <select value={boxId} onChange={(e) => setBoxId(Number(e.target.value))}>
                        <option value={1}>Petit</option>
                        <option value={2}>Normal</option>
                        <option value={3}>Grand</option>
                        <option value={4}>Très grand</option>
                    </select>
                </div>
                <button className="button2" type="submit">Réserver</button>
            </form>
        </div>
    );
};

export default GarageBoxReservation;
