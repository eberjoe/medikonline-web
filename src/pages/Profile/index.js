import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import './styles.css';

import AppointmentCard from '../../components/AppointmentCard';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

const Profile = () => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteAppointment = async id => {
    if (window.confirm('Tem certeza que deseja desmarcar a consulta?')) {
      try {
        await api.delete(`appointments/${id}`, {
          headers: {
            'x-access-token': token,
          }
        });
        setAppointments(appointments.filter(appointment => appointment.id !== id));
      } catch(err) {
        alert('Erro ao cancelar. Tente novamente.');
      }
    }
  }
  
  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={ logoImg } alt="Medikonline"/>
        <span>Bem vindo(a), {
        !!user && user.crm ?
        'Dr(a). ' :
        'Sr(a). ' 
        }{!!user && user.id}</span>
        <Link className="button" to="/appointment/new">Agendar consulta</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#6c63ff" />
        </button>
      </header>
      <h1>Suas consultas</h1>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <AppointmentCard
              id={appointment.id}
              interlocutorRole={!!user && !!user.crm ? "paciente" : "profissional"}
              interlocutorId={!!user && !!user.crm ? appointment.patient_id : appointment.doctor_id}
              date={appointment.date}
              handleDelete={handleDeleteAppointment}
            />
          </li>
        )).reverse()}
      </ul>
    </div>
  );
};

export default Profile;