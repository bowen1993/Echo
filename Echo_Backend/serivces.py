from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import json
from algorithm.sentimental import sentiment
import traceback

class SimpleEcho(WebSocket):
    def handleMessage(self):
        try:
            jsonData = json.loads(self.data)
            requestType = jsonData['type']
            if requestType == 'sentimental':
                result = sentiment.get_sentiments(jsonData['query'])
                if result:
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