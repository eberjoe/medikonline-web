import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { FiSend, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import socket from '../../services/socket';

import Header from '../../components/Header';
import SpeechBalloon from '../../components/SpeechBalloon';

import * as S from './style';

const Conversation = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [occupancy, setOccupancy] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const convoRef = useRef(null);
  const msgRef = useRef(null);
  
  const handleNewMessage = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    await socket.emit('chatMessage', {
      senderId: localStorage.getItem('userId'),
      msg: message
    });
    setLoading(false);
    msgRef.current.focus();
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
      if (mounted) {
        setUser(res.data.user);
      }
    }).catch(err => {
      history.push('/appointments');
    });
    socket.emit('join', {
      id: localStorage.getItem('userId'),
      appointmentId: sessionStorage.getItem('appointmentId')
    });
    socket.on('movement', occupants => {
      setOccupancy(occupants.length);
    });
    socket.on('message', ({ senderId, tMessage, timestamp, isBroadcast }) => {
      const convo = messages;
      convo.push(
        <SpeechBalloon
          key={messages.length}
          isBroadcast={isBroadcast}
          isSelfSpeech={localStorage.getItem('userId') === senderId}
          timestamp={format(parseISO(timestamp), "HH:mm:ss")}
          content={tMessage}
          senderId={senderId}
        />
      );
      setMessages(convo);
      setMessageCount(messages.length);
    });

    return () => {
      mounted = false;
      socket.emit('leave', localStorage.getItem('userId'));
      socket.disconnect();
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    convoRef.current.scrollTop = convoRef.current.scrollHeight;
  }, [messageCount]);

  return (
    <>
      <Header
        headerMessage={`${!!user && !!user.crm ? 'Dr(a).' : 'Sr(a).'} ${localStorage.getItem('userId')}`}
      />
      <S.ConvoContainer>
        <div>
          <h1>Consulta com {!!user && !!user.crm ? 'Sr(a).' : 'Dr(a).'} {sessionStorage.getItem('interlocutorId')}</h1>
        </div>
        <S.Convo>
          <form onSubmit={handleNewMessage}>
            <input
              ref={msgRef}
              disabled={loading || occupancy < 2}
              placeholder={occupancy > 1 ? 'Digite uma mensagem' : `Aguarde o seu ${!!user && user.crm ? 'paciente' : 'médico'} entrar...`}
              value={occupancy > 1 ? message : ''}
              onChange={e => setMessage(e.target.value)}
            />
            <button className="button" type="submit" disabled={loading || occupancy < 2}>
              <FiSend size={22} />
            </button>
            <S.BackLink className="back-link" to="/appointments">
              <FiArrowLeft size={16} color="#6c63ff" />
              Sair da consulta
            </S.BackLink>
          </form>
          <S.ChatBox
            ref={convoRef}
            bg={loading || occupancy < 2 ? '#f0f0f5' : '#fff' }
          >
           {messages}
          </S.ChatBox>
        </S.Convo>
      </S.ConvoContainer>
    </>
  )
};

export default Conversation;