import React, {useEffect, useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft, FiTarget} from 'react-icons/fi';
import api from '../../services/api';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';  

export default function NewAppointment() {
    const token = localStorage.getItem('token');
    const [date, setDate] = useState(new Date());
    const [docId, setDocId] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [docs, setDocs] = useState([]);
    const [docOpts, setDocOpts] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const opts = [];
        if (!token) {
            history.push('/');
            return;
        }
        api.get('appointments', {
            headers: {
                'x-access-token': token
            }
        }).then((res) => {
            setAppointments(res.data);
        }).catch(err => {
            history.push('/');
            return;
        });
        api.get('users/true', {
            headers: {
                'x-access-token': token
            }
        }).then((res) => {
            setDocs(res.data);
            for (let i = 0; i < docs.length; i++) {
                opts.push(
                    <option key={docs[i].id} value={docs[i].id}>
                        {`Dr(a). ${docs[i].id}`}
                    </option>
                    );
            }
            setDocOpts(opts);
        }).catch(err => {
            history.push('/');
        });
    }, [docs]);

    const handleNewAppointment = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            date,
            doctor_id: docId
        };

        try {
            await api.post('/appointments', data, {
                headers: {
                    'x-access-token': token
                }
            })
            history.push('/profile');
        } catch (err) {
            alert('Erro ao agendar consulta. Tente novamente.');
        }
    }

    return (
        <div className="new-appointment-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Medikonline"/>
                    <h1>Agendar nova consulta</h1>
                    <p>Aqui você agenda a sua consulta com seu médico de preferência.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#6c63ff" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewAppointment}>
                    <select
                        disabled={loading}
                        required
                        defaultValue=""
                        onChange={e => setDocId(e.target.value)}
                    >
                        <option value="" disabled hidden>Selecione um médico</option>
                        {docOpts}
                    </select>
                    <MuiPickersUtilsProvider locale={ptBr} utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disabled={loading}
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
                            disableToolbar
                            margin="normal"
                            id="time-picker"
                            label="Hora"
                            value={date}
                            onChange={date => setDate(date)}
                            KeyboardButtonProps={{
                            'aria-label': 'alterar hora',
                            }}                            
                        />
                    </MuiPickersUtilsProvider>
                    <button className="button" type="submit" disabled={loading}>
                        Marcar
                    </button>
                </form>
            </div>
        </div>

    );
}