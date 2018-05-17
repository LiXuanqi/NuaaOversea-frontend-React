import { Modal, Form, Input } from 'antd';
import React from 'react'
const FormItem = Form.Item;

const UserLanguageModal = Form.create()(
    
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
                title="修改语言成绩"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem label="语言成绩">
                    {getFieldDecorator("research", {
                        initialValue: this.props.initValue,
                        rules: [{ required: true, message: "请输入你的语言成绩" }],
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

export default UserLanguageModal;