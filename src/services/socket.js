import socketIOClient from 'socket.io-client';

const socket = socketIOClient(`http://${process.env.REACT_APP_SERVER_IP}:3333`);

export default socket;