import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
    const [appointments, setAppointments] = useState([]);
    const userId = localStorage.getItem('userId');
    const history = useHistory();

    useEffect(() => {
        if (!userId) {
            history.push('/');
        }
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setAppointments(response.data);
        })
    }, [userId, history]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`appointments/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        } catch (err) {
            alert('Erro ao desmarcar. Tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Medikonline"/>
                <span>Bem vindo(a), {userId}</span>
                <Link className="button" to="/appointment/new">Marcar consulta</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#6c63ff" />
                </button>
            </header>
            <h1>Consultas marcadas</h1>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        <strong>CONSULTA:</strong>
                        <p>{appointment.date}</p>
    
                        <strong>MÉDICO:</strong>
                        <p>{appointment.docId}</p>
    
                        <button onClick={() => handleDeleteIncident(appointment.id)} type="button">
                            <FiTrash2 size="20" color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}