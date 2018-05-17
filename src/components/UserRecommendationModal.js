import { Modal, Form, Radio } from 'antd';
import React from 'react'
import { connect } from 'dva'
import request from '../utils/request'

const FormItem = Form.Item;

const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const UserRecommendationModal = Form.create()(
    
    class extends React.Component {
        state = {
            recommendationItems: []
        }

        async componentWillMount(){
            const recommendationsResponse = await request('/oversea/api/recommendations');
            let recommendationsFromServer = recommendationsResponse.data.recommendations;
            this.setState({
                recommendationItems: [...recommendationsFromServer]
            })

        }

        NameToId = (name) => {
            const items = this.state.recommendationItems;
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
                console.log(values);
                this.props.dispatch({
                    type: 'applicants/patchApplicant',
                    payload: values
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
                        initialValue: this.NameToId(this.props.initValue),
                        rules: [{ required: true, message: "请输入你的推荐信情况" }],
                    })(
                        <RadioGroup>
                        {
                            this.state.recommendationItems.map((item) => {
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

export default connect()(UserRecommendationModal);