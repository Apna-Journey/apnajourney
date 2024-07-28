
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; 

let socket;

export const initSocket = (token) => {
  socket = io(SOCKET_URL, {
    auth: {
      token
    }
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket');
  });
};

export const subscribeToUpdates = (callback) => {
  if (!socket) throw new Error('Must connect to socket before subscribing');

  socket.on('update', (data) => {
    callback(data);
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

