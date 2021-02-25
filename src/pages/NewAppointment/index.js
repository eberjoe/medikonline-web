import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident() {
    const [date, setDate] = useState('');
    const [docId, setDocId] = useState('');
    const userId = localStorage.getItem('userId');
    const history = useHistory();

    async function handleNewAppointment(e) {
        e.preventDefault();

        const data = {
            date,
            docId
        };

        try {
            await api.post('/appointments', data, {
                headers: {
                    Authorization: userId,
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
                    <p>Viva o SUS!</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#6c63ff" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewAppointment}>
                    <input
                        placeholder="Data e hora"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                    <input
                        placeholder="Selecione o médico"
                        value={docId}
                        onChange={e => setDocId(e.target.value)}
                    />
                    <button className="button" type="submit">
                        Marcar
                    </button>
                </form>
            </div>
        </div>

    );
}