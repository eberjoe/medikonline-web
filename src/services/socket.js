import socketIOClient from 'socket.io-client';

const socket = socketIOClient(`${process.env.REACT_APP_SERVER_URL}:3333`);

export default socket;