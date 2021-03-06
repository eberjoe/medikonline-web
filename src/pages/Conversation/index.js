import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import { format } from 'date-fns';
import { FiSend, FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import Header from '../../components/Header';

const Conversation = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageKey, setMessageKey] = useState(0);
  const [messages, setMessages] = useState([]);
  const convoRef = useRef();
  
  const handleNewMessage = async e => {
    e.preventDefault();
    setLoading(true);
    const convo = messages;
    convo.push(
      <p key={messageKey} style={{ color: 'blue' }}>{`${format( new Date(), 'HH:mm:ss')}> ${message}`}</p>
    );
    setMessageKey(messageKey + 1);
    setMessages(convo);
    setMessage('');
    setLoading(false);
  }

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
      if (mounted) setUser(res.data.user);
    }).catch(err => {
      history.push('/appointments');
      return;
    });
    convoRef.current.scrollTop = convoRef.current.scrollHeight;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageKey]);

  return (
    <>
      <Header
        headerMessage={`${!!user && !!user.crm ? 'Dr(a).' : 'Sr(a).'} ${localStorage.getItem('userId')}`}
      />
      <div className="conversation-container">
        <div>
          <h1>Consulta com {!!user && !!user.crm ? 'Sr(a).' : 'Dr(a).'} {sessionStorage.getItem('interlocutorId')}</h1>
        </div>
        <div className="content">
          <form onSubmit={handleNewMessage}>
            <input
              disabled={loading}
              placeholder="Digite uma mensagem"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button className="button" type="submit" disabled={loading}>
              <FiSend size={22} />
            </button>
            <Link className="back-link" to="/appointments">
              <FiArrowLeft size={16} color="#6c63ff" />
              Sair da consulta
            </Link>
          </form>
          <div
            className="convo"
            ref={convoRef}
            style={{ background: loading ? '#f0f0f5' : '#fff' }}
          >
           {messages}
          </div>
        </div>
      </div>
    </>
  )
};

export default Conversation;