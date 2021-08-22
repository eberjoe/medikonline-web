import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import homeImg from '../../assets/homeimg.svg';
import api from '../../services/api';

import * as S from './style';

const Logon = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
    const res = await api.post('sessions', { id, password });
    localStorage.setItem('token', await res.data.token);
    localStorage.setItem('userId', id);
    history.push('/appointments');
    } catch(err) {
      alert('Falha no logon. Tente novamente.');
      setLoading(false);
    }
  }

  return (
    <S.LogonContainer>
      <section className="form">
        <img src={ logoImg } alt="Medikonline" />
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
      <S.ImgContainer>
        <img src={homeImg} alt="Health personnel" />
      </S.ImgContainer>
    </S.LogonContainer>
  );
};

export default Logon;