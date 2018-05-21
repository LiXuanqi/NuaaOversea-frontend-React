import { Modal, Form, InputNumber } from 'antd';
import React from 'react'
import { connect } from 'dva'
const FormItem = Form.Item;

const UserGreModal = Form.create()(
    
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
            let { visible, onCancel, form, initValue } = this.props;
            const { getFieldDecorator } = form;
            const initGre = initValue.split('+');
            const initVerbal = parseInt(initGre[0], 10);
            const initQuantitative = parseInt(initGre[1], 10);
            const initWriting = parseInt(initGre[2], 10);
            return (
                <Modal
                visible={visible}
                title="修改GRE"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem
                    label="GRE Verbal"
                    >
                    {getFieldDecorator('gre_verbal', {
                        initialValue: initVerbal,
                        rules: [{ required: true, message: "请输入你的GRE词汇成绩" }], 
                    })(
                        <InputNumber min={130} max={170} />
                    )}
                    </FormItem>
                    <FormItem
                    label="GRE Quantitative"
                    >
                    {getFieldDecorator('gre_quantitative', {
                        initialValue: initQuantitative,
                        rules: [{ required: true, message: "请输入你的GRE数学成绩" }], 
                    })(
                        <InputNumber min={130} max={170} />
                    )}
                    </FormItem>
                    <FormItem
                    label="GRE Writing"
                    >
                    {getFieldDecorator('gre_writing', {
                        initialValue: initWriting,
                        rules: [{ required: true, message: "请输入你的GRE写作成绩" }], 
                    })(
                        <InputNumber min={2.0} max={5.0} />
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
export default connect(mapStateToProps)(UserGreModal);