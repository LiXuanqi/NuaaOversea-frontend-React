import { Modal, Form, Radio } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { getRecommendations, recommendationNameToId} from '../utils/dataFromServer';

const FormItem = Form.Item;

const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const UserRecommendationModal = Form.create()(
    
    class extends React.Component {

        NameToId = (name) => {
            const items = getRecommendations();
            for (let i = 0; i < items.length; i++) {
                if (items[i].name === name) {
                    return items[i].id
                }
            }
        }

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
                title="修改推荐信情况"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem label="推荐信">
                    {getFieldDecorator("recommendation_id", {
                        initialValue: recommendationNameToId(this.props.initValue),
                        rules: [{ required: true, message: "请输入你的推荐信情况" }],
                    })(
                        <RadioGroup>
                        {
                            getRecommendations().map((item) => {
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
export default connect(mapStateToProps)(UserRecommendationModal);