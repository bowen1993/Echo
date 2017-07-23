import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { connect } from 'dva';
import EditorCreation from 'Editor/Create';
import style from './InputSearch.less';

class InputSearch extends Component {
  showQuest() {
    // this.editor.getWrappedInstance().showModal();
    this.props.changeVisible();
  }
  render() {
    return (
      <div className={this.props.className || ''}>
        <Input className={`${style.inputSearch}`}/>
        <Button onClick={() => this.showQuest()}>Quest</Button>
        <EditorCreation ref={ref => this.editor = ref} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeVisible: () => {
      dispatch({ type: 'questions/changeVisible' });
    },
  };
};
export default connect(null, mapDispatchToProps)(InputSearch);

