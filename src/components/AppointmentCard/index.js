import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import Skeleton from '@material-ui/lab/Skeleton';
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
import { AppointmentState } from '../../enums/AppointmentState';
import './styles.css';

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
  const history = useHistory();
  const backgroundColor = ['#fff', '#8cfff7', '#b3b3abaa'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      if (!isBefore(now, AppointmentDate) && !isAfter(now, addHours(AppointmentDate, 1))) {
        setClock(differenceInSeconds(addHours(AppointmentDate, 1), now))
        setState(AppointmentState.ONGOING);
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
    return () => {
      clearInterval(intervalId);
    }
  }, [AppointmentDate, clock, state]);

  const handleClick = () => {
    if (state === AppointmentState.ONGOING) {
      sessionStorage.setItem('interlocutorId', interlocutorId);
      sessionStorage.setItem('appointmentId', id);
      history.push('/conversation');
    }
  }  

  return (countdown ?
    <div className="appointment-card" onClick={handleClick} style={{
        background: backgroundColor[state],
        cursor: state === AppointmentState.ONGOING ? 'pointer' : 'arrow'
    }}>
      <strong>{formatRelative(AppointmentDate, new Date(), {locale: pt}).toUpperCase()}</strong>
      <p style={{
        visibility: isAfter(new Date(), addHours(AppointmentDate, -24)) && state !== AppointmentState.PAST ? 'visible' : 'hidden'
      }}>
        {countdown}
      </p>
      <strong>{`${interlocutorRole.toUpperCase()}:`}</strong>
      <p>{interlocutorId}</p>
      <button onClick={() => handleDelete(id)} type="button" style={{ display: state === AppointmentState.ONGOING ? 'none' : 'block' }}>
        <FiTrash2 size="20" style={{ background: backgroundColor[state] }} />
      </button>
    </div>
    :
    <div className="appointment-card" style={{
      background: backgroundColor[state],
    }}>
    <Skeleton variant="text" height={23} />
    <Skeleton variant="text" height={23} width={60} />
    <Skeleton variant="text" heigth={23} />
    <Skeleton variant="text" height={23} width={100} />
    <Skeleton variant="text" height={23} />
    </div>
  );
};

export default AppointmentCard;