import React, {useState} from 'react';
import './styles.css';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import homeImg from '../../assets/homeimg.svg';
import api from '../../services/api';

export default function Logon() {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('sessions', {id, password});
            localStorage.setItem('userId', id);
            history.push('/profile');
        } catch (err) {
            alert('Falha no logon. Tente novamente.');
            setLoading(false);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Medikonline" />
                <form onSubmit={handleLogin}>
                    <input
                        placeholder="Login"
                        disabled={loading}
                        value={id}
                        onChange={e => setId(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Senha"
                        disabled={loading}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button
                        className="button"
                        type="submit"
                        disabled={loading}
                    >
                        Entrar
                    </button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#6c63ff" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={homeImg} alt="Health personnel" />
        </div>
    );
}