import io from 'socket.io-client';

const resulter = {
  taskId: '',
  socket: null,
  callback: null,
  wsHost: 'ws://localhost:8001',
  init() {
    // setup websocket and connect
    this.socket = io.connect(this.wsHost);
    // this.socket.send('hello');
    // const self = this;
    // this.socket.on('result', (info) => {
    //   if (self.callback) {
    //     self.callback(info);
    //   }
    // });
  },
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  },
  new_connection(taskId) {
    this.disconnect();
    this.init(taskId);
  },
};

export default resulter;
