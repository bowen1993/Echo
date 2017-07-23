FROM node:8
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install wget -y
RUN apt-get install -y mongodb
RUN apt-get install python-pip python-dev g++ build-essential -y
RUN apt-get install git -y
RUN pip install --upgrade pip
RUN pip install pymongo numpy Algorithmia
RUN pip install --upgrade http://ci.tensorflow.org/view/Nightly/job/nightly-matrix-cpu/TF_BUILD_IS_OPT=OPT,TF_BUILD_IS_PIP=PIP,TF_BUILD_PYTHON_VERSION=PYTHON2,label=cpu-slave/lastSuccessfulBuild/artifact/pip_test/whl/tensorflow-1.3.0rc0-cp27-none-linux_x86_64.whl
RUN pip install git+https://github.com/dpallot/simple-websocket-server.git
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