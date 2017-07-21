import React, { Component } from 'react';
import { Modal } from 'antd';

class TagModal extends Component {
  state = {
    visible: false,
  }
  handleOk() {

  }
  render() {
    return (
      <Modal
        title='User Tag'
        visible={this.state.visible}
        onOk={this.handleOk}
      >

      </Modal>
    );
  }
}

export default TagModal;
