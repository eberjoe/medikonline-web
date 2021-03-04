import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import {
  parseISO,
  formatRelative,
  addHours,
  isAfter,
  isBefore,
  differenceInSeconds,
  format
} from 'date-fns';
import { pt } from 'date-fns/locale';
import './styles.css';
import { AppointmentState } from '../../enums/AppointmentState';

const AppointmentCard = ({
  id,
  interlocutorRole,
  interlocutorId,
  date,
  handleDelete
}) => {
  const AppointmentDate = parseISO(date);
  const [state, setState] = useState(AppointmentState.UPCOMING);
  const [clock, setClock] = useState(0);
  const [countdown, setCountdown] = useState();
  const backgroundColor = ['#fff', '#edffec', '#b3b3abaa'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (!isBefore(now, AppointmentDate) && !isAfter(now, addHours(AppointmentDate, 1))) {
        setState(AppointmentState.ONGOING);
        setClock(differenceInSeconds(addHours(AppointmentDate, 1), now))
      } else if (isAfter(now, AppointmentDate)) {
        setState(AppointmentState.PAST);
      } else {
        setClock(differenceInSeconds(AppointmentDate, now))
      }
      now.setHours(Math.floor(clock / 3600));
      now.setMinutes(Math.floor(clock / 60) - Math.floor((clock / 3600)) * 60);
      now.setSeconds(clock - Math.floor(clock / 60) * 60);
      setCountdown(format(now, 'HH:mm:ss'));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [AppointmentDate, state]);

  return (
  <div className="appointment-card" style={{
      background: backgroundColor[state],
      cursor: state === AppointmentState.ONGOING ? 'pointer' : 'arrow'
    }}
  >
    <strong>{formatRelative(AppointmentDate, new Date(), {locale: pt}).toUpperCase()}</strong>
    <p>{countdown}</p>
    <strong>{`${interlocutorRole.toUpperCase()}:`}</strong>
    <p>{interlocutorId}</p>
    <button onClick={() => handleDelete(id)} type="button">
      <FiTrash2 size="20" style={{ background: backgroundColor[state] }} />
    </button>
  </div>
  );
};

export default AppointmentCard;