import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const handlerMap = {};
let stompClient;
let socket;
let timer;
const closeLog = false;

export function connect() {
  socket = new SockJS('/ws/msg');
  stompClient = Stomp.over(socket);
  stompClient.heartbeat.outgoing = 20000;
  stompClient.heartbeat.incoming = 10000;
  if (closeLog) {
    stompClient.debug = () => {};
  }

  const connectedCallback = () => {
    clearTimeout(timer);
    stompClient.subscribe('/user/topic/notification', (msg) => {
      const notification = JSON.parse(msg.body);

      if (handlerMap[notification.type] !== undefined) {
        handlerMap[notification.type](notification);
      }
    });
  };
  const errorCallback = (error) => {
    stompClient.debug(`received error: ${error}`);
    reconnect();
  };

  stompClient.connect({}, connectedCallback, errorCallback);

  socket.onclose = () => {
    reconnect();
  };
  socket.onerror = () => {
    reconnect();
  };

  return stompClient;
}

function reconnect() {
  if (stompClient.connected) {
    console.log('disconnecting...');
    disconnect();
  }
  timer = setTimeout(() => {
    console.log('reconnecting');
    connect();
  }, 5000);
}


export function disconnect() {
  if (stompClient !== undefined) {
    stompClient.disconnect();
  }
}

export function registerHandler(type, handler) {
  handlerMap[type] = handler;
}
