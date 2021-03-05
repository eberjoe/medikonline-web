import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../components/Header';

const Conversation = () => {
  const history = useHistory();
  const [user, setUser] = useState();
  const token = localStorage.getItem('token');

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        headerMessage={`${!!user && !!user.crm ? 'Dr(a).' : 'Sr(a).'} ${localStorage.getItem('userId')}`}
      />
      <div>
        <p>Consulta com {sessionStorage.getItem('interlocutorId')}</p>
      </div>
    </>
  )
};

export default Conversation;