from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import json
from algorithm.sentimental import sentiment
from algorithm.textProcessing import text_tag
import traceback

class SimpleEcho(WebSocket):
    def handleMessage(self):
        try:
            jsonData = json.loads(self.data)
            requestType = jsonData['type']
            if requestType == 'sentimental':
                # data example
                # {
                #     "type":"sentimental",
                #     "query":"your topic"
                # }
                result = sentiment.get_sentiments(jsonData['query'])
                if result:
                    self.sendMessage(json.dumps(result))
            elif requestType == 'tag':
                # data example
                # {
                #     "type":"tag",
                #     "query":"text to be tagged"
                # }
                result = text_tag.predict(jsonData['query'])
                if result:
                    print result
                    self.sendMessage(json.dumps(result))
        except:
            traceback.print_exc()
            print 'error'
            pass
    
    def handleConnected(self):
        print(self.address, 'connected')
    
    def handleClose(self):
        print(self.address, 'closed')


server = SimpleWebSocketServer('', 8000, SimpleEcho)
server.serveforever()