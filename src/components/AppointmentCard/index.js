import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import Modal from '@material-ui/core/Modal';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';  
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

import * as S from './style';

const AppointmentCard = ({
  id,
  interlocutorRole,
  interlocutorId,
  date,
  handleUpdate,
  handleDelete
}) => {
  const AppointmentDate = parseISO(date);
  const [state, setState] = useState(AppointmentState.UPCOMING);
  const [clock, setClock] = useState(0);
  const [countdown, setCountdown] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalDate, setModalDate] = useState();
  const [loading, setLoading] = useState(false);
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
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setModalDate(new Date());
  }

  const handleSubmitEdit = async e => {
    e.preventDefault();
    setLoading(true);
    await handleUpdate(id, modalDate);
    setOpenModal(false);
    setLoading(false);
  }

  const modalBody = (
    <S.ModalContent>
      <div>
        <h2>Alterando agendamento com {interlocutorId}</h2>
      </div>
      <form>
        <S.ModalBody>
          <KeyboardDatePicker
            disabled={loading}
            variant="inline"
            disablePast
            disableToolbar
            margin="normal"
            label="Data"
            format="dd/MM/yyyy"
            value={modalDate}
            onChange={d => setModalDate(d)}
            KeyboardButtonProps={{
              'aria-label': 'alterar data',
            }}                            
          />
          <KeyboardTimePicker
            disabled={loading}
            variant="inline"
            disablePast
            margin="normal"
            label="Hora"
            value={modalDate}
            onChange={d => {
              d.setSeconds(0);
              setModalDate(d);
            }}
            KeyboardButtonProps={{
            'aria-label': 'alterar hora',
            }}                            
          />
        </S.ModalBody>
        <footer className="footer">
          <button className="button" type="submit" disabled={loading}>OK</button>
          <button className="button" onClick={() => {setOpenModal(false)}} style={{ background: 'darkgrey', color: 'black' }}>Cancelar</button>
        </footer>
      </form>
    </S.ModalContent>
  );

  return (countdown ?
    <S.CardContainer onClick={handleClick}
      bg={backgroundColor[state]}
      c={state === AppointmentState.ONGOING ? 'pointer' : 'arrow'}>
      <S.ControlPanel style={{ display: state === AppointmentState.ONGOING ? 'none' : 'block' }}>
        <button onClick={() => handleDelete(id)} type="button">
          <FiTrash2 size="18" />
        </button>
        <button onClick={handleOpenModal} type="button">
          <FiEdit2 size="18" />
        </button>
      </S.ControlPanel>
      <S.AppointmentDetails>
        <strong>{formatRelative(AppointmentDate, new Date(), {locale: pt}).toUpperCase()}</strong>
        <p style={{
          visibility: isAfter(new Date(), addHours(AppointmentDate, -24)) && state !== AppointmentState.PAST ? 'visible' : 'hidden'
        }}>
          {countdown}
        </p>
        <strong>{`${interlocutorRole.toUpperCase()}:`}</strong>
        <p>{interlocutorId}</p>
      </S.AppointmentDetails>
      <Modal open={openModal} onSubmit={handleSubmitEdit}>
        {modalBody}
      </Modal>
    </S.CardContainer>
    :
    <S.CardContainer bg={backgroundColor[state]}>
    <Skeleton variant="text" height={23} />
    <Skeleton variant="text" height={23} width={60} />
    <Skeleton variant="text" heigth={23} />
    <Skeleton variant="text" height={23} width={100} />
    <Skeleton variant="text" height={23} />
    </S.CardContainer>
  );
};

export default AppointmentCard;