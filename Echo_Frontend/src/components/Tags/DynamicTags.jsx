import React from 'react';
import styles from './DynamicTags.css';

import { Tag, Input, Tooltip, Button } from 'antd';

class DynamicTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags || [],
      inputVisible: false,
      inputValue: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('tags' in nextProps) {
      this.setState({ tags: nextProps.tags });
    }
  }
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    }, () => this.triggerChange());
  }

  saveInputRef = input => this.input = input


  triggerChange = () => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    console.log('nnn', onChange);
    if (onChange) {
      onChange(this.state.tags);
    }
  }
  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type='text'
            size='small'
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && <Button size='small' type='dashed' onClick={this.showInput}>+ New Tag</Button>}
      </div>
    );
  }
}

export default DynamicTags;
