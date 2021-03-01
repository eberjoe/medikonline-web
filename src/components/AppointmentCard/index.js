import React from 'react';
import {FiTrash2} from 'react-icons/fi';
import {
  parseISO,
  formatRelative
} from 'date-fns';
import { pt } from 'date-fns/locale';
import './styles.css';

const AppointmentCard = ({
  id,
  interlocutorRole,
  interlocutorId,
  date,
  handleDelete
}) => {
  const now = new Date();

  return (
  <div className="appointment-card">
    <strong>{formatRelative(parseISO(date), now, {locale: pt}).toUpperCase()}</strong>
    <strong>{`${interlocutorRole.toUpperCase()}:`}</strong>
    <p>{interlocutorId}</p>
    <button onClick={() => handleDelete(id)} type="button">
        <FiTrash2 size="20" color="#a8a8b3" />
    </button>
  </div>
  );
};

export default AppointmentCard;