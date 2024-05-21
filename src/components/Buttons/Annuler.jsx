import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const App = () => {
    const [selectedLocationBoxData, setSelectedLocationBoxData] = useState(null);
    const [selectedLocationBox, setSelectedLocationBox] = useState('');
    const [user, setUser] = useState(null);

    const handleLocationBoxChange = (event) => {
        const selectedDate = event.target.value;
        setSelectedLocationBox(selectedDate);
        const selectedLocationBoxInfo = user?.locationBoxes.find(
            (box) => box.startDate === selectedDate || box.returnDate === selectedDate
        );
        setSelectedLocationBoxData(selectedLocationBoxInfo);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('bearer');
                if (!token) {
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://localhost:8080/api/profil', config);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleClick = async (locationBoxId) => {
        const token = localStorage.getItem('bearer');
        const payload = { etatLocation: 'annule' };

        try {
            await axios.put(`http://localhost:8080/api/locationbox/${locationBoxId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            alert("Location annulée avec succès.");
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de l\'annulation de la location:', error);
            // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
        }
    };

    return (
        <div>
            {user && user.locationBoxes ? (
                <div>
                        <span className="close-icon" onClick={() => handleClick(selectedLocationBoxData.id)}>
                            <FaTrash />
                        </span>

                </div>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
};

export default App;
