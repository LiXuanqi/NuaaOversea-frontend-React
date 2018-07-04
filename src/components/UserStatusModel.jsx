import { Modal, Form, Input } from 'antd';
import React from 'react'
import { connect } from 'dva'
const FormItem = Form.Item;

const UserStatusModal = Form.create()(
  class extends React.Component {
    onCreate = () => {
      const form = this.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        
        new Promise((resolve, reject) => {
          this.props.dispatch({
            type: 'user/patchDetail',
            formData: values,
            resolve,
            reject
          });
        })
        .then(() => {
          form.resetFields();
          this.props.onCancel();
        })

    
      });
    }
    render() {
      const { form, visible, title, onCancel } = this.props;
      return (
        <Modal
          visible={visible}
          title={title}
          okText="修改"
          onCancel={onCancel}
          onOk={this.onCreate}
        >
          {
            this.props.children(form)
          }
        </Modal>
      );
    }
  }
);

export default connect()(UserStatusModal);