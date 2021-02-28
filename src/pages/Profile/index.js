import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Profile() {
    const token = localStorage.getItem('token');
    const [appointments, setAppointments] = useState([]);
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        if (!token) {
            history.push('/');
            return;
        }
        api.get('profile', {
            headers: {
                'x-access-token': token
            }
        }).then(res => {
            setAppointments(res.data.appointments);
            setUser(res.data.user);
        }).catch(err => {
            history.push('/');
        });
    }, []);

    const handleDeleteAppointment = async (id) => {
        try {
            await api.delete(`appointments/${id}`, {
                headers: {
                    'x-access-token': token,
                }
            });
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        } catch(err) {
            alert('Erro ao cancelar. Tente novamente.')
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Medikonline"/>
                <span>Bem vindo(a), {
                !!user && user.crm ?
                'Dr(a). ' :
                'Sr(a). ' 
                }{!!user && user.id}</span>
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
    
                        <button onClick={() => handleDeleteAppointment(appointment.id)} type="button">
                            <FiTrash2 size="20" color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}