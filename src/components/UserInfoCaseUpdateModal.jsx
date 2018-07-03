import React from 'react'
import { Modal, Form, Input, Select, Switch, Icon, Cascader } from 'antd';
import { getCountries, countryNameToId } from '../utils/dataFromServer';

import { connect } from 'dva';
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
    onCreate = () => {
      const form = this.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        this.props.dispatch({
          type: 'user/patchCase',
          formData: {
            ...values,
            term: values['term'][0] + values['term'][1]
          },
          applicationId: this.props.choosedCase
        })
        .then(() => {
          this.props.onCancel();
        })

        form.resetFields();
        this.setState({
          choosedCase: -1
        });
      });
    }

    render() {
      const { choosedCase, caseId, onCancel, form } = this.props;
      const { getFieldDecorator } = form;
      const initData = this.props.initData;

      return (

        <Modal
          visible={choosedCase === caseId}
          title="修改案例"
          okText="修改"
          onCancel={onCancel}
          onOk={this.onCreate}
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
                initialValue: countryNameToId(initData.country),
                rules: [{ required: true, message: '请选择你所申请的国家!' }],
              })(
                <Select>
                  {
                    getCountries().map((item) => {
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
                <Cascader options={termOptions} />
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
export default connect(mapStateToProps)(UserInfoCaseUpdateModal);