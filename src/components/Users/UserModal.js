import React, {Component} from 'react'
import { Modal, Form, Input, Button } from 'antd'

const FormItem = Form.Item;

class UserEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    console.log(props);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal dialog will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { id, name } = this.props.record; 

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>add</Button>
        <Modal title="add users"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem
            label="id"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
            >
            {
              getFieldDecorator('id', {
                  initialValue: id,
              })(<Input />)
            }
            </FormItem>
          </Form>  
        </Modal>
      </div>
    );
  }
}

export default Form.create()(UserEditModal);