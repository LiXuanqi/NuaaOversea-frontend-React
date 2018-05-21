import { Modal, Form, Input } from 'antd';
import React from 'react'
import { connect } from 'dva'
const FormItem = Form.Item;

const UserCollegeModal = Form.create()(  
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
            const { visible, onCancel, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                visible={visible}
                title="修改学院"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem label="学院">
                    {getFieldDecorator("college", {
                        initialValue: this.props.initValue,
                        rules: [{ required: true, message: "请输入你的学院" }],
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

export default connect(mapStateToProps)(UserCollegeModal);