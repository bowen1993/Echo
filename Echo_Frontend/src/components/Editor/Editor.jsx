import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './Editor.less';

class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.content || EditorState.createEmpty(),
      editorContent: undefined,
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('content' in nextProps) {
      const content = nextProps.content;
      this.setState({ editorContent: content });
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  onContentStateChange = (editorContent) => {
    this.setState({
      editorContent,
    });
    this.triggerChange(JSON.stringify(editorContent));
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }
  render() {
    const { editorState } = this.state;
    return (<Editor
      editorState={editorState}
      editorClassName={`${styles.editor}`}
      toolbarClassName={`${styles.toolbar}`}
      onEditorStateChange={this.onEditorStateChange}
      onContentStateChange={this.onContentStateChange}
    />);
  }
}


export default MyEditor;
