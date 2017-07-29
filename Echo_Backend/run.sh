#! /bin/bash

echo "Start Redis Server..."
redis-server &
echo "Start MongoDB"
mongod --quiet &
sleep 2;
cd /root/Echo_Backend
echo "MongoDB started, loading init data...."
python load_data.py
echo "Data loaded, init norch search"
norch &
echo "Norch search started, starting websocket service"
python serivces.py &
echo "Websocket service started, starting Echo..."
npm start