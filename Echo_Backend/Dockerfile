FROM node:8
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install wget -y
RUN apt-get install -y mongodb
RUN apt-get install python-pip python-dev g++ build-essential redis-server -y
RUN apt-get install git -y
RUN pip install --upgrade pip
RUN pip install pymongo numpy Algorithmia websocket_server
RUN pip install --upgrade https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-1.2.1-cp27-none-linux_x86_64.whl
RUN mkdir /data
RUN mkdir /data/db
COPY . /root/Echo_Backend
WORKDIR /root/Echo_Backend
RUN npm install -g npm
RUN npm install
RUN npm install -g gulp
RUN npm install gulp
RUN npm install gulp-nodemon
RUN gulp es6
RUN gulp styles
EXPOSE 3000 8001
CMD ["./run.sh"]