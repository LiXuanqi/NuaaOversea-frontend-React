import { Modal, Form, Radio } from 'antd';
import React from 'react'
import { connect } from 'dva'
import { getProjects, projectNameToId } from '../utils/dataFromServer';

const FormItem = Form.Item;

const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const UserProjectModal = Form.create()(
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
                        redirect_url: '/profile'
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
                title="修改项目情况"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem label="项目情况">
                    {getFieldDecorator("project_id", {
                        initialValue: projectNameToId(this.props.initValue),
                        rules: [{ required: true, message: "请输入你的项目经历" }],
                    })(
                        <RadioGroup>
                        {
                            getProjects().map((item) => {
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

export default connect()(UserProjectModal);