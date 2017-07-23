import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'dva';
import Editor from './Editor';

const FormItem = Form.Item;

const CreateFrom = Form.create({})(
  (props) => {
    const { getFieldDecorator } = props.form;
    const checkContent = (rule, value, callback) => {
      if (value) {
        callback();
        return;
      }
      callback('nothing！！！');
    };
    return (
      <Form layout='vertical'>
        <FormItem label='Title'>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the title of question!' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label='Content'>
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


class CreateQuestionModal extends Component {

  onOk() {
    this.form.validateFields((err, values) => {
      if (err) return;
      this.props.onCreateNewQuestion(values);
    });
  }

  onCancel() {
    this.props.changeVisible();
    this.form.resetFields();
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title='Create A Question'
        onOk={() => this.onOk()}
        onCancel={() => this.onCancel()}
      >
        <CreateFrom ref={ref => this.form = ref}/>
      </Modal>
    );
  }
}

const mapStateToProps = ({ questions }, ownProps) => {
  return {
    visible: questions.visible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateNewQuestion: (question) => {
      dispatch({ type: 'questions/onCreate', payload: { question } });
    },
    changeVisible: () => {
      dispatch({ type: 'questions/changeVisible' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, { withRef: true })(CreateQuestionModal);
