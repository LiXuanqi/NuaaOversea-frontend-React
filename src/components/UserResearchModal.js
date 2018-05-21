import { Modal, Form, Radio } from 'antd';
import React from 'react'
import { connect } from 'dva'
import { researchNameToId, getResearches } from '../utils/dataFromServer'

const FormItem = Form.Item;

const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const UserResearchModal = Form.create()(
    
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
                title="修改研究情况"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem label="研究情况">
                    {getFieldDecorator("research_id", {
                        initialValue: researchNameToId(this.props.initValue),
                        rules: [{ required: true, message: "请输入你的研究情况" }],
                    })(
                        <RadioGroup>
                        {
                            getResearches().map((item) => {
                                return(
                                    <Radio key={item.id} style={radioStyle} value={item.id}>{item.name}</Radio>
                                );
                            })
                        }   
                        </RadioGroup>
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
export default connect(mapStateToProps)(UserResearchModal);