import React, {useState} from 'react';
import gar5 from "../img/gar5.jpg";
import herobanner from "../img/herobanner.png";
import "../Styles/contact.css";
import axios from "axios";
import car1122 from "../img/car1122.png";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/send-email', formData);
            alert('Email sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };
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
                </section>
                <section id="about" className="section about has-before" aria-labelledby="about-label">

                    <div className='ContactForm'>
                        <img src={car1122} style={{width: '600px', height: '300px'}} alt="MNSgarage home"/>
                        <form onSubmit={handleSubmit}>
                            <input type='text' name='name' value={formData.name} onChange={handleChange}
                                   placeholder='Name' required/>
                            <input type='email' name='email' value={formData.email} onChange={handleChange}
                                   placeholder='Email' required/>
                            <input type='text' name='subject' value={formData.subject} onChange={handleChange}
                                   placeholder='Subject' required/>
                            <textarea name='message'
                                      rows="14"
                                      cols="50" value={formData.message} onChange={handleChange}
                                      placeholder='Message' required/>
                            <button type='submit'>Send Email</button>
                        </form>
                    </div>

                </section>
            </article>
        </main>
    );
};

export default Contact;