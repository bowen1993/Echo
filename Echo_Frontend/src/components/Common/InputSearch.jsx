import React, { Component } from 'react';
import { Select, Button } from 'antd';
import { connect, Link } from 'dva';
import EditorCreation from 'Editor/Create';
import style from './InputSearch.less';

class InputSearch extends Component {
  state = {
    value: '',
  }
  showQuest() {
    // this.editor.getWrappedInstance().showModal();
    this.props.changeVisible();
  }
  handleChange(value) {
    this.setState({ value });
    this.props.search(value);
  }
  render() {
    const { searchQues } = this.props;
    const options = searchQues && searchQues.map(d =>
      <Option key={d.id}>
        <Link to={`/questions/${d.id}`}>{d.document.text}</Link>
      </Option>
    );
    return (
      <div className={this.props.className || ''}>
        <Select
          className={`${style.inputSearch}`}
          mode='combobox'
          value={this.state.value}
          placeholder='input your question'
          notFoundContent=''
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onChange={value => this.handleChange(value)}
        >
          {options}
        </Select>
        <Button onClick={() => this.showQuest()}>Quest</Button>
        <EditorCreation ref={ref => this.editor = ref} />
      </div>
    );
  }
}

const mapStateToProps = ({ questions }, ownProps) => {
  return {
    searchQues: questions.searchQues,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeVisible: () => {
      dispatch({ type: 'questions/changeVisible' });
    },
    search: (keys) => {
      dispatch({ type: 'questions/onSearch', payload: { keys } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputSearch);

