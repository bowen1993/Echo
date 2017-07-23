import { Echarts } from 'Common';
import React, { Component } from 'react';
import { connect } from 'dva';
import resulter from 'utils/conn';
import style from './Demo.less';

class EchartsDemo extends Component {
  componentDidMount() {
    const socket = new WebSocket('ws://localhost:8001');
    socket.onopen = function () {
      console.log(socket);
      const option = {
        type: 'sentimental',
        query: 'computer',
      };
      socket.send(JSON.stringify(option));
      socket.onmessage = function (event) {
        console.log('Client received a message', event.data);
      };
    };
  }
  render() {
    const option = {
      title: { text: 'ECharts 入门示例' },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      }],
    };
    return (
      <Echarts option={option} className={`${style.echarts}`}/>
    );
  }
}

const mapStateToProps = ({ ws }, ownProps) => {
  return {
    ws: ws.ws,
  };
};
export default connect(mapStateToProps)(EchartsDemo);
