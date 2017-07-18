import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import DynamicTags from 'Tags/DynamicTags';

const FormItem = Form.Item;

const ProfileFrom = Form.create({})(
  (props) => {
    const { getFieldDecorator } = props.form;
    const checkTags = (rule, value, callback) => {
      console.log(value);
      callback();
    };
    return (
      <Form layout='vertical'>
        <FormItem label='Name'>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input the user name!' }],
            initialValue: props.user.username,
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label='Tags'>
          {
            getFieldDecorator('tags', {
              rules: [{ validator: checkTags }],
            })(<DynamicTags />)
          }
        </FormItem>
      </Form>
    );
  }
);

class ProfileModal extends Component {
  state = {
    visible: false,
  }
  show() {
    this.setState({ visible: true });
  }
  transform(values) {
    return Object.assign({}, values, { tags: _.map(values.tags, (it) => { return { name: it }; }) });
  }
  handleOK() {
    this.form.validateFields((err, values) => {
      if (err) return;
      const newValues = this.transform(values);
      console.log(newValues);
      this.props.updateUserInfo(newValues);
      this.handleCancel();
    });
  }
  handleCancel() {
    this.form.resetFields();
    this.setState({ visible: false });
  }
  render() {
    return (
      <Modal
        title='Change User Info'
        visible={this.state.visible}
        onOk={() => this.handleOK()}
        onCancel={() => this.handleCancel()}
      >
        <ProfileFrom ref={ref => this.form = ref} user={this.props.user}/>
      </Modal>
    );
  }
}

export default ProfileModal;
