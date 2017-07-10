import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Editor from './Editor';

const FormItem = Form.Item;

const CreateFrom = Form.create({})(
  (props) => {
    const { getFieldDecorator } = props.form;
    const checkContent = () => {};
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
      if (err) {
        console.log(err);
        return;
      }
      console.log(values);
    });
  }

  onCancel() {
    console.log('close');
    this.setState({ visible: false });
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

export default CreateQuestionModal;
