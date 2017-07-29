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
RUN mkdir -p /usr/src/Echo
RUN chown node:node /usr/src/Echo
USER node
COPY . /usr/src/Echo
WORKDIR /usr/src/Echo
RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN npm install -g npm
RUN npm install -g gulp norch
RUN npm install
RUN npm install gulp
RUN npm install gulp-nodemon
RUN gulp es6
RUN gulp styles
USER root
EXPOSE 3000 8001
CMD ["./run.sh"]