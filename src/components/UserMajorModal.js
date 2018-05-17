import { Modal, Form, Input } from 'antd';
import React from 'react'
const FormItem = Form.Item;

const UserMajorModal = Form.create()(
    
    class extends React.Component {
        onCreate = () => {
            const form = this.props.form;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                console.log(values);
                form.resetFields();
                this.props.onCancel();
            });
        }
        render() {
            const { visible, onCancel, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                visible={visible}
                title="修改专业"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem label="专业">
                    {getFieldDecorator("major", {
                        initialValue: this.props.initValue,
                        rules: [{ required: true, message: "请输入你的专业" }],
                    })(
                         <Input />
                    )}
                    </FormItem>                
                </Form>
                </Modal>
            );
        }
    }
);

export default UserMajorModal;