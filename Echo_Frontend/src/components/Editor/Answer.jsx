import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'dva';
import Editor from './Editor';
import style from './Answer.less';

const FormItem = Form.Item;

const AnswerFrom = Form.create({})(
  (props) => {
    const { getFieldDecorator } = props.form;
    const checkContent = (rule, value, callback) => {
      if (value) {
        callback();
        return;
      }
      callback('you must answer something!!!');
    };
    return (
      <Form layout='vertical'>
        <FormItem label=''>
          {getFieldDecorator('content', {
            rules: [{ validator: checkContent }],
          })(
            <Editor />
          )}
        </FormItem>
      </Form>
    );
  }
);


class AnswerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  onOk() {
    this.form.validateFields((err, { content }) => {
      if (err) return;

      this.props.onCreateAnswer(this.props.question.id, content);
    });
  }

  onCancel() {
    this.setState({ visible: false });
  }

  show() {
    this.setState({ visible: true });
  }

  cancelEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { question } = this.props;
    if (!this.state.visible) return null;
    return (
      <article className={`${style.answer}`} onClick={e => this.cancelEvent(e)}>
        <h1>{question.title}</h1>
        <AnswerFrom ref={ref => this.form = ref}/>
        <Button type='primary' onClick={() => this.onOk()}>Submit</Button>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAnswer: (questionId, answer) => {
      dispatch({ type: 'answers/onCreate', payload: { questionId, answer } });
    },
  };
};

export default connect(null, mapDispatchToProps, undefined, { withRef: true })(AnswerPanel);
