import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/graph';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/map';
import React from 'react';
import elementResizeEvent from 'element-resize-event';

import style from './Echarts.less';

class Echarts extends React.Component {
  // first add
  componentDidMount() {
    const echartObj = this.renderEchartDom();
    const onEvents = this.props.onEvents || [];
    if (this.props.groupId) {
      echartObj.group = this.props.groupId;
      echarts.connect(this.props.groupId);
    }
    onEvents.forEach((eventName) => {
      // ignore the event config which not satisfy
      if (typeof eventName === 'string' && typeof onEvents[eventName] === 'function') {
        // binding event
        echartObj.on(eventName, (param) => {
          onEvents[eventName](param, echartObj);
        });
      }
    });
    // on chart ready
    if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj);

    // on resize
    elementResizeEvent(this.echartsDom, () => {
      echartObj.resize();
    });
  }

  // update
  componentDidUpdate() {
    this.renderEchartDom();
  }

  // remove
  componentWillUnmount() {
    echarts.dispose(this.echartsDom);
  }

  getEchartsInstance() {
    // return the echart object
    const { mapData } = this.props;
    if (mapData) {
      echarts.registerMap('china', mapData);
      return echarts.init(this.echartsDom, this.props.theme);
    }
    return echarts.getInstanceByDom(this.echartsDom) || echarts.init(this.echartsDom, this.props.theme);
  }

  // render the dom
  renderEchartDom() {
    // init the echart object
    const echartObj = this.getEchartsInstance();
    // set the echart option
    echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);

    // set loading mask
    if (this.props.showLoading) echartObj.showLoading();
    else echartObj.hideLoading();

    return echartObj;
  }

  render() {
    let className = `${style.echoEcharts}`;
    if (!!this.props.className) {
      className += ` ${this.props.className}`;
    }
    return (
      <div ref={ref => this.echartsDom = ref} className={className} style={this.props.style}/>
    );
  }
}

export default Echarts;
