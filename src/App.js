import React, {useState} from 'react';
import './Styles/style.css';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import HeaderNavbar from './components/navbar/HeaderNavbar';
import Main from './Pages/main';
import Footer from './components/Footer/Footer';
import Register from './Pages/register';
import Profil from "./Pages/profil";
import Apropos from "./Pages/apropos";
import Contact from "./Pages/contact";
import Cars from "./Pages/cars";
import Reservationoutils from "./Pages/reservationoutils";
import Reservationentretien from "./Pages/reservationentretien";



function App() {

    return (
        <div className="App">
            <HeaderNavbar />
            <Router>
                <Routes>
                    <Route path="/home" element={<Main />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/apropos" element={<Apropos />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/cars" element={<Cars/>} />
                    <Route path="/reservationentretien" element={<Reservationentretien/>} />
                    <Route path="/reservationoutils" element={<Reservationoutils/>} />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
