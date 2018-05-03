import React from 'react';
import fetch from 'dva/fetch';
import { connect } from 'dva';
import { Form, Input, Cascader, Checkbox, Button, Radio, InputNumber } from 'antd';
import { loginUser, login } from '../utils/user';
import request from '../utils/request';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// TODO: if the info exists, should ask user whether update the info?
class EvaluationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

  
    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values)
        
                // fetch('/api/applicants', {
                //     method: 'POST',
                //     headers: {
                //       'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         ...values,
                //         college: values.major[0],
                //         major: values.major[1],
                //         name: user_info.name,
                //         student_id: user_info.stu_num,
                //         user_id: user_info.id
                //     })
                //   })
                //   .then(function(response) {
                //     return response.json()
                //   }).then(function(json) {
                //     console.log('parsed json', json)
                //     // get new user_info and store in cookie(applicant_id will change)
                //     login();
           
                //   }).catch(function(ex) {
                //     console.log('parsing failed', ex)
                //   })
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render() {
        const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        };
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
        };
        const tailFormItemLayout = {
        wrapperCol: {
            xs: {
            span: 24,
            offset: 0,
            },
            sm: {
            span: 16,
            offset: 8,
            },
        },
        };

        return (
            // TOEFL GPA GRE
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                {...formItemLayout}
                label="本科专业"
                >
                {getFieldDecorator('major', {
                    initialValue: ['能源与动力学院', '飞行器动力工程'],
                    rules: [{ type: 'array', required: true, message: '请选择你的本科专业' }],
                })(
                    <Cascader />
                )}
                </FormItem>    
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}
// const WrappedUserReportForm = Form.create()(UserReportForm);
const WrappedEvaluationForm = Form.create()(connect(mapStateToProps)(EvaluationForm));

export default WrappedEvaluationForm;