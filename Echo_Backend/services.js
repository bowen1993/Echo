const ws = require('nodejs-websocket');
const sentiment = require('./algorithm/sentimental');

console.log('开始建立连接...');

ws.createServer((conn) => {
  conn.on('text', (str) => {
    console.log(`收到的信息为:${str}`);

    conn.sendText(str);
  });
  conn.on('close', (code, reason) => {
    console.log('关闭连接');
  });
  conn.on('error', (code, reason) => {
    console.log('异常关闭');
  });
}).listen(8001);

console.log('WebSocket建立完毕');

const jsonData = json.loads(self.data);
const requestType = data.type;
let result;
if (requestType === 'sentimental') {
    // # data example
    // # {
    // #     "type":"sentimental",
    // #     "query":"your topic"
    // # }
  result = sentiment.get_sentiments(jsonData.query);
  if (result) {
    conn.sendText('hkjhkjhkhkhkhkjhkjhkjhkjhkjhkj');
  }
} else if (requestType === 'tag') {
    // # data example
    // # {
    // #     "type":"tag",
    // #     "query":"text to be tagged"
    // # }
  result = text_tag.predict(jsonData.query);
  if (result) {
    self.sendMessage(result);
  }
}