import { Modal, Form, Input, Select, Switch, Icon, Cascader } from 'antd';
import React from 'react'

import request from '../utils/request';

const FormItem = Form.Item;
const Option = Select.Option;

const termOptions = [{
    value: '2017',
    label: '2017',
    children: [{
        value: 'spring',
        label: 'spring'   
    }, {
        value: 'fall',
        label: 'fall'   
    }],
  }, {
    value: '2018',
    label: '2018',
    children: [{
        value: 'spring',
        label: 'spring'   
    }, {
        value: 'fall',
        label: 'fall'   
    }],
  }];

const UserInfoCaseUpdateModal = Form.create()(
    
    class extends React.Component {
        state = {
            countriesItems: []
        }
        async componentWillMount(){
            const countriesResponse = await request('/oversea/api/countries');
            const countriesFromServer = countriesResponse.data.countries;
            this.setState({
                countriesItems: [...countriesFromServer]
            })
        }
        countryToCountryId(name) {   
            const items = this.state.countriesItems;
            for (let i = 0; i < items.length; i++) {
                if (items[i].name === name) {
                    return items[i].id;
                }                 
            }
        }

        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            const initData = this.props.initData;
            return (
                <Modal
                visible={visible}
                title="修改案例"
                okText="修改"
                onCancel={onCancel}
                onOk={onCreate}
                >
                {/* TODO: set initial value. */}
                <Form layout="vertical">
                    <FormItem label="学校">
                    {getFieldDecorator('university', {
                        initialValue: initData.university,
                        rules: [{ required: true, message: '请输入你所申请的学校!' }],
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem label="录取结果">
                    {getFieldDecorator('result', {
                        initialValue: initData.result,
                        rules: [{ required: true, message: '请输入你的录取结果!' }],
                    })(
                        <Select
                        >
                            <Option value="ad">ad</Option>
                            <Option value="rej">rej</Option>
                            <Option value="offer">offer</Option>
                        </Select>
                    )}
                    </FormItem>
                    <FormItem label="专业">
                    {getFieldDecorator('major', {
                        initialValue: initData.major,
                        rules: [{ required: true, message: '请输入你所申请的专业!' }],
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem label="转专业">
                    {getFieldDecorator('is_transfer', {
                        initialValue: initData.is_transfer,
                        rules: [{ required: true, message: '请选择你是否是转专业申请!' }],
                    })(
                        <Switch defaultChecked={initData.is_transfer} checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
                        
                    )}
                    </FormItem>
                    <FormItem label="学位">
                    {getFieldDecorator('degree', {
                        initialValue: initData.degree,
                        rules: [{ required: true, message: '请选择你所申请的学位!' }],
                    })(
                        <Select>
                            <Option value="Master">Master</Option>
                            <Option value="Ph.D">Ph.D</Option>
                        </Select>
                    )}
                    </FormItem>
                    <FormItem label="国家">
                    {getFieldDecorator('country_id', {
                        initialValue: this.countryToCountryId(initData.country),
                        rules: [{ required: true, message: '请选择你所申请的国家!' }],
                    })(
                        <Select> 
                            {
                                this.state.countriesItems.map((item) => {
                                    return (
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    );
                                })
                            }    
                        </Select>
                    )}
                    </FormItem>
                    <FormItem label="入学日期">
                    {getFieldDecorator('term', {
                        initialValue: initData.term,
                        rules: [{ required: true, message: '请选择你的入学日期!' }],
                    })(
                        <Cascader options={termOptions}/>
                    )}
                    </FormItem>
                 
                </Form>
                </Modal>
                
            );
        }
    }
);

export default UserInfoCaseUpdateModal;