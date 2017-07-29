import json
from algorithm.sentimental import sentiment
from algorithm.textProcessing import text_tag
import traceback
from websocket_server import WebsocketServer

# Called for every client connecting (after handshake)


def new_client(client, server):
    print("New client connected and was given id %d" % client['id'])
    server.send_message_to_all("Hey all, a new client has joined us")


# Called for every client disconnecting
def client_left(client, server):
    print("Client(%d) disconnected" % client['id'])


# Called when a client sends a message
def message_received(client, server, message):
    print("Client(%d) said: %s" % (client['id'], message))

    try:
        jsonData = json.loads(message)
        requestType = jsonData['type']
        if requestType == 'sentimental':
            # data example
            # {
            #     "type":"sentimental",
            #     "query":"your topic"
            # }
            result = sentiment.get_sentiments(jsonData['query'])
            if result:
                print result
                server.send_message(client, json.dumps(result))
        elif requestType == 'tag':
            # data example
            # {
            #     "type":"tag",
            #     "query":"text to be tagged"
            # }
            result = text_tag.predict(jsonData['query'])
            if result:
                print result
                server.send_message(client, json.dumps(result))
    except:
        traceback.print_exc()
        print 'error'
        pass


PORT=8001
HOST='0.0.0.0'
server = WebsocketServer(PORT, host=HOST)
server.set_fn_new_client(new_client)
server.set_fn_client_left(client_left)
server.set_fn_message_received(message_received)
server.run_forever()
