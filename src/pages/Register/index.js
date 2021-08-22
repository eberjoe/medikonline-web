import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api';

import * as S from './style';

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [crm, setCrm] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    const taken = await api.get(`logincheck/${id}`);
    if (password !== passwordConfirm) {
      alert('Erro na confirmação de senha!');
      setLoading(false);
      return;
    }
    
    if (taken.data) {
      alert('Login não disponível. Por favor, escolha outro.');
      setLoading(false);
      return;
    }
    
    const data = {
      id,
      password,
      crm
    };
    
    try {
      const res = await api.post('users', data);
      alert(`Usuário ${res.data.id} registrado com sucesso!`);
      history.push('/');
    } catch (err) {
      alert(`Erro no cadastro. Tente novamente.`)
      setLoading(false);
    }
  }

  return (
    <>
      <S.MobileLogo>
        <img src={ logoImg } alt="Medikonline"/>
      </S.MobileLogo>
      <S.RegistrationContainer>
          <section>
            <img src={ logoImg } alt="Medikonline"/>
            <h1>Cadastro</h1>
            <p>Faça seu cadastro e entre na plataforma de telemedicina.</p>
            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#6c63ff" />
              Voltar para login
            </Link>
          </section>
          <form onSubmit={handleRegister}>
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
            <input
              placeholder="Confirme sua senha"
              disabled={loading}
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              required
              />
            <input
              placeholder="Se médico, entre CRM"
              disabled={loading}
              value={crm}
              onChange={e => setCrm(e.target.value)}    
            />
            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
      </S.RegistrationContainer>
      <S.MobileFooter>
      <Link className="back-link" to="/">
        <FiArrowLeft size={16} color="#6c63ff" />
        Voltar para login
      </Link>
      </S.MobileFooter>
    </>
  );
};

export default Register;