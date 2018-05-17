import { Modal, Form, Input } from 'antd';
import React from 'react'
const FormItem = Form.Item;

const UserGreModal = Form.create()(
    
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
            let { visible, onCancel, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                visible={visible}
                title="修改GRE"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem label="GRE">
                    {getFieldDecorator("gre", {
                        initialValue: this.props.initValue,
                        rules: [{ required: true, message: "请输入你的gre分数" }],
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

export default UserGreModal;