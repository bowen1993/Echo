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

  onOk() {
    this.form.validateFields((err, { content }) => {
      if (err) return;

      this.props.onCreateAnswer(this.props.question.id, content);
      this.props.changePanelVisible();
    });
  }

  cancelEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { question } = this.props;
    if (!this.props.visible) return null;
    return (
      <article className={`${style.answer}`} onClick={e => this.cancelEvent(e)}>
        <h1>{question.title}</h1>
        <AnswerFrom ref={ref => this.form = ref}/>
        <Button className={`${style.pullRight}`} type='primary' onClick={() => this.onOk()}>Submit</Button>
      </article>
    );
  }
}

const mapStateToProps = ({ answers }, ownProps) => {
  return {
    visible: answers.panelVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateAnswer: (questionId, answer) => {
      dispatch({ type: 'answers/onCreate', payload: { questionId, answer } });
    },
    changePanelVisible: () => {
      dispatch({ type: 'answers/changePanelVisible' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, { withRef: true })(AnswerPanel);
