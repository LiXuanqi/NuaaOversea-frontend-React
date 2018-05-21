import { Modal, Form, Input } from 'antd';
import React from 'react'
import { connect } from 'dva'
const FormItem = Form.Item;

const UserGpaModal = Form.create()(
    
    class extends React.Component {
        onCreate = () => {
            const form = this.props.form;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                this.props.dispatch({
                    type: 'applicants/patchApplicant',
                    payload: {
                        formData: values,
                        redirect_url: '/profile',
                        applicant_id: this.props.userInfo.applicant_id
                    }
                });
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
                title="修改GPA"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem label="GPA">
                    {getFieldDecorator("gpa", {
                        initialValue: this.props.initValue,
                        rules: [{ required: true, message: "请输入你的GPA" }],
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
function mapStateToProps(state) {
    return {
        userInfo: state.user.userInfo
    };
}
export default connect(mapStateToProps)(UserGpaModal);