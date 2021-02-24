import React, {useState} from 'react';
import './styles.css';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import homeImg from '../../assets/homeimg.svg';
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            localStorage.setItem('userId', id);
            localStorage.setItem('userName', response.data.name);
            history.push('/profile');
        } catch (err) {
            alert('Falha no logon. Tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#6c63ff" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={homeImg} alt="Heroes" />
        </div>
    );
}