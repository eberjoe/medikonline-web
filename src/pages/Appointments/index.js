import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';

import AppointmentCard from '../../components/AppointmentCard';
import Header from '../../components/Header';

const Appointments = () => {
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

  const handleUpdateAppointment = async (id, date) => {
    try {
      await api.put(`appointments/${id}`, { date }, {
        headers: {
          'x-access-token': token
        }
      });
      const res = await api.get('profile', {
        headers: {
          'x-access-token': token
        }
      });
      setAppointments(res.data.appointments);
    } catch(err) {
      alert('Erro ao alterar agendamento. Tente novamente.')
    }
  }

  const handleDeleteAppointment = async id => {
    if (window.confirm('Tem certeza que deseja apagar a consulta?')) {
      try {
        await api.delete(`appointments/${id}`, {
          headers: {
            'x-access-token': token
          }
        });
        setAppointments(appointments.filter(appointment => appointment.id !== id));
      } catch(err) {
        alert('Erro ao cancelar. Tente novamente.');
      }
    }
  }
  
  return (
    <>
      <Header
        headerMessage={`Bem vindo(a), ${!!user && user.crm ? 'Dr(a). ' : 'Sr(a). '} ${!!user && user.id}`}
        optionalLink={
          <Link className="button" to="/appointment/new">Agendar consulta</Link>
        }
      />
      <div className="appointments-container">
        <h1>Suas consultas</h1>
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              <AppointmentCard
                id={appointment.id}
                interlocutorRole={!!user && !!user.crm ? "paciente" : "profissional"}
                interlocutorId={!!user && !!user.crm ? appointment.patient_id : appointment.doctor_id}
                date={appointment.date}
                handleUpdate={handleUpdateAppointment}
                handleDelete={handleDeleteAppointment}
              />
            </li>
          )).reverse()}
        </ul>
      </div>
    </>
  );
};

export default Appointments;