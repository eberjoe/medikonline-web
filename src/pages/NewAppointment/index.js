import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import scheduleImg from '../../assets/scheduleimg.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import 'date-fns';
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';  

import Header from '../../components/Header';

const NewAppointment = () => {
  const token = localStorage.getItem('token');
  const [date, setDate] = useState(new Date());
  const [interlocutorId, setInterlocutorId] = useState('');
  const [user, setUser] = useState();
  const [docOpts, setDocOpts] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    let mounted = true;
    if (!token) {
      history.push('/');
      return;
    }
    api.get('profile', {
      headers: {
        'x-access-token': token
      }
    }).then(res => {
      if (mounted) {
        setUser(res.data.user);
      }
      api.get(`users/${!!res.data.user && !!res.data.user.crm ? false : true}`, {
        headers: {
          'x-access-token': token
        }
      }).then(res => {
        if (mounted) {
          setDocOpts(res.data.map(u => (
            <option key={u.id} value={u.id}>
              {u.id}
            </option>
      )));
        }
      }).catch(err => {
        history.push('/appointments');
      });
    }).catch(err => {
    history.push('/appointments');
    });
    return () => {
      mounted = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleNewAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      date,
      doctor_id: !!user && !!user.crm ? user.id : interlocutorId,
      patient_id: !!user && !!user.crm ? interlocutorId : user.id
    };

    try {
      await api.post('/appointments', data, {
        headers: {
          'x-access-token': token
        }
      })
      history.push('/appointments');
    } catch (err) {
      alert('Erro ao agendar consulta. Tente novamente.');
    }
  }

  return (
    <>
      <Header
        headerMessage={`${!!user && !!user.crm ? 'Dr(a).' : 'Sr(a).'} ${localStorage.getItem('userId')}`}
      />
      <div className="new-appointment-container">
        <div className="content">
          <section>
            <img src={scheduleImg} alt="Medikonline"/>
            <h1>Agendar nova consulta</h1>
            <p>Aqui você agenda a sua consulta com seu {!!user && !!user.crm ? 'paciente' : 'médico de preferência'}.</p>
            <Link className="back-link" to="/appointments">
              <FiArrowLeft size={16} color="#6c63ff" />
              Voltar para home
            </Link>
          </section>
          <form onSubmit={handleNewAppointment}>
            <div className="selection">
              <label style={{ display: !!user && user.crm ? 'none' : 'flex' }}>Dr(a).</label>
              <select
                disabled={loading}
                required
                defaultValue=""
                onChange={e => setInterlocutorId(e.target.value)}
              >
                <option value="" disabled hidden>Selecione um {!!user && !!user.crm ? 'paciente' : 'médico'}</option>
                {docOpts}
              </select>
            </div>
            <KeyboardDatePicker
              disabled={loading}
              variant="inline"
              disableToolbar
              shouldDisableDate={day => (day.getDay() === 0 || day.getDay() === 6)}
              disablePast
              margin="normal"
              id="date-picker"
              label="Data"
              format="dd/MM/yyyy"
              value={date}
              onChange={date => setDate(date)}
              KeyboardButtonProps={{
                'aria-label': 'alterar data',
              }}                            
              />
            <KeyboardTimePicker
              disabled={loading}
              variant="inline"
              disablePast
              margin="normal"
              id="time-picker"
              label="Hora"
              value={date}
              onChange={date => {
                date.setSeconds(0);
                setDate(date);
              }}
              KeyboardButtonProps={{
              'aria-label': 'alterar hora',
              }}                            
            />
            <button className="button" type="submit" disabled={loading}>
              Agendar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewAppointment;