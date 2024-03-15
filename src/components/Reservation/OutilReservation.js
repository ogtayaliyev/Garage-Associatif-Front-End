import React, { useState } from 'react';

import "./outil.css"

function ReservationForm() {
    const [tool, setTool] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, vous pouvez ajouter la logique pour soumettre les données
        // telles que l'envoi à un backend ou la manipulation des données localement.
        console.log({
            tool,
            status,
            description,
            startDate,
            endDate,
        });
    };

    return (
        <div className="container mt-5">
            <h2>Réservation des outils de garage</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="tool">Choix des outils :</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tool"
                        value={tool}
                        onChange={(e) => setTool(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">État :</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description :</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Date de début de location :</label>
                    <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">Date de fin de location :</label>
                    <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Soumettre</button>
            </form>
        </div>
    );
}

export default ReservationForm;
