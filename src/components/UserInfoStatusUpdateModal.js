import { Modal, Form, Input, Radio } from 'antd';
import React from 'react'
import CaseInput from './CaseInput';
import request from '../utils/request';

const FormItem = Form.Item;

const UserInfoStatusUpdateModal = Form.create()(
    
    class extends React.Component {
        state = {
            countriesItems: [],
        }

        async componentWillMount(){
            const countriesResponse = await request('/oversea/api/countries');
            const countriesFromServer = countriesResponse.data.countries;
            this.setState({
                countriesItems: [...countriesFromServer]
            })
        }
        
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                visible={visible}
                title="修改案例"
                okText="修改"
                onCancel={onCancel}
                onOk={onCreate}
                >
                <Form layout="vertical">
                    <FormItem label="Title">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input the title of collection!' }],
                    })(
                        <CaseInput
                        countriesItems = {this.state.countriesItems}
                        >
                        
                        </CaseInput>
                    )}
                    </FormItem>
                    {/* <FormItem label="Description">
                    {getFieldDecorator('description')(<Input type="textarea" />)}
                    </FormItem>
                    <FormItem className="collection-create-form_last-form-item">
                    {getFieldDecorator('modifier', {
                        initialValue: 'public',
                    })(
                        <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                        </Radio.Group>
                    )}
                    </FormItem> */}
                </Form>
                </Modal>
                
            );
        }
    }
);

export default UserInfoStatusUpdateModal;