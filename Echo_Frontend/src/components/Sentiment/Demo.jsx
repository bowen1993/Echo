import { Echarts } from 'Common';
import echarts from 'echarts/lib/echarts';
import React, { Component } from 'react';
import { connect } from 'dva';
import resulter from 'utils/conn';
import { Input } from 'antd';
import { rawDataFilter } from 'utils/sentiment';
import style from './Demo.less';

class EchartsDemo extends Component {

  componentDidMount() {
    // this.props.saveSentimentTag(rawDataFilter(data));
  }

  sendSentimentTag(query) {
    const socket = new WebSocket('ws://localhost:8001');
    socket.onopen = () => {
      const option = {
        type: 'sentimental',
        query,
      };
      socket.send(JSON.stringify(option));
      socket.onmessage = (event) => {
        console.log('Client received a message', event.data);

        this.props.saveSentimentTag(rawDataFilter(JSON.parse(event.data)));
      };
    };
  }

  render() {
    const { date, posData, negData } = this.props;
    const option = {
      tooltip: {
        trigger: 'axis',
        position(pt) {
          return [pt[0], '10%'];
        },
      },
      title: {
        left: 'center',
        text: 'Sentiment Analysis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
      },
      series: [
        {
          name: 'postive',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color: 'rgb(255, 70, 131)',
            },
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)',
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)',
              }]),
            },
          },
          data: posData,
        },
        {
          name: 'negative',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            normal: {
              color: 'rgb(0, 47, 178)',
            },
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(0, 47, 178)',
              }, {
                offset: 1,
                color: 'rgb(0, 10, 131)',
              }]),
            },
          },
          data: negData,
        },
      ],
    };
    return (
      <div>
        <Input.Search placeholder='please input sentiment tag (eg: c++)' onSearch={value => this.sendSentimentTag(value)} />
        <Echarts option={option} className={`${style.echarts}`}/>
      </div>
    );
  }
}

const mapStateToProps = ({ ws, sentiment }, ownProps) => {
  return {
    date: sentiment.date,
    posData: sentiment.posData,
    negData: sentiment.negData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveSentimentTag: (data) => {
      dispatch({ type: 'sentiment/save', payload: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EchartsDemo);
