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
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  onOk() {
    this.form.validateFields((err, values) => {
      if (err) return;
      this.props.onCreateNewQuestion(values);
    });
  }

  onCancel() {
    this.setState({ visible: false }, () => this.form.resetFields());
  }

  showModal() {
    this.setState({ visible: true });
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title='Create A Question'
        onOk={() => this.onOk()}
        onCancel={() => this.onCancel()}
      >
        <CreateFrom ref={ref => this.form = ref}/>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateNewQuestion: (question) => {
      dispatch({ type: 'questions/onCreate', payload: { question } });
    },
  };
};

export default connect(null, mapDispatchToProps, undefined, { withRef: true })(CreateQuestionModal);
