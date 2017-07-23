FROM node:8
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install wget -y
RUN apt-get install -y mongodb
RUN apt-get install python-pip python-dev g++ build-essential -y
RUN pip install --upgrade pip
RUN pip install pymongo numpy tensorflow Algorithmia
RUN pip install git+https://github.com/dpallot/simple-websocket-server.git
COPY . /root/echo
WORKDIR /root/s4gserver
RUN npm install
RUN npm install -g gulp
RUN npm run build
EXPOSE 3000 8001
CMD ["./run.sh"]