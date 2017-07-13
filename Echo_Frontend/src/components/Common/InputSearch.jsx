import React, { Component } from 'react';
import { Input, Button } from 'antd';
import EditorCreation from 'Editor/Create';
import style from './InputSearch.less';

class InputSearch extends Component {
  showQuest() {
    this.editor.showModal();
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

export default InputSearch;
