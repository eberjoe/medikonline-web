import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [crm, setCrm] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            crm
        };

        try {
            const response = await api.post('users', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert(`Erro no cadastro. Tente novamente.`)
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Medikonline"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro e entre na plataforma de telemedicina.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#6c63ff" />
                        Voltar para logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder="Se médico, entre CRM"
                        value={crm}
                        onChange={e => setCrm(e.target.value)}    
                    />
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}