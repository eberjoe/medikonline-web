import React from 'react';

const Conversation = () => {
  return <p>Consulta com {sessionStorage.getItem('interlocutorId')}</p>
};

export default Conversation;