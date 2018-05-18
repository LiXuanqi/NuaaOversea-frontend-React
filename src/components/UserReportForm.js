import React from 'react';
import fetch from 'dva/fetch';
import { connect } from 'dva';
import { Form, Input, Cascader, Checkbox, Button, Radio, InputNumber } from 'antd';
import { loginUser, login } from '../utils/user';
import { getRecommendations, getResearches, getProjects } from '../utils/dataFromServer';
import router from 'umi/router';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
// TODO: click next should validate data.
// TODO: 收集学校的所有专业名,fetch from database.
const majors = [{
    value: '能源与动力学院',
    label: '能源与动力学院',
    children: [{
        value: '飞行器动力工程',
        label: '飞行器动力工程',
    }, {
        value: '车辆工程',
        label: '车辆工程',
    }],
    }, {
    value: '外国语学院',
    label: '外国语学院',
    children: [{
        value: '商务英语',
        label: '商务英语',
    }],
}];

// TODO: if the info exists, should ask user whether update the info?
class UserReportForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount(){
        this.props.onRef(this)
    }

    check = () => {
        this.props.form.validateFieldsAndScroll(
            (err) => {
                if (!err) {
                console.info('success');
                this.props.nextPage();
                }
            },
        );
      }

    handleSubmit = (e) => {

        const user_info = loginUser();
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values)
        
                fetch('/oversea/api/applicants', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...values,
                        college: values.major[0],
                        major: values.major[1],
                        name: user_info.name,
                        student_id: user_info.stu_num,
                        user_id: user_info.id
                    })
                  })
                  .then(function(response) {
                    return response.json()
                  }).then(function(json) {
                    console.log('parsed json', json)
            
                    if (json.id) {
                        router.push('/profile');
                    }
           
                  }).catch(function(ex) {
                    console.log('parsing failed', ex)
                    // TODO: 错误提示
                  })
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    handleTestTypeChange = () => {
        this.props.form.setFieldsValue({
            language_reading: "",
            language_listening: "",
            language_speaking: "",
            language_writing: ""
          });
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
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                {...formItemLayout}
                label="本科专业"
                >
                {getFieldDecorator('major', {
                    initialValue: ['能源与动力学院', '飞行器动力工程'],
                    rules: [{ type: 'array', required: true, message: '请选择你的本科专业' }],
                })(
                    <Cascader options={majors} />
                )}
                </FormItem>
                {/* TODO: validate the range of GPA. */}
                <FormItem
                {...formItemLayout}
                label="本科GPA"
                >
                {getFieldDecorator('gpa', {
                    rules: [{
                    required: true, message: '请输入你的本科GPA!',
                    }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="语言考试类型"
                >
                {getFieldDecorator('language_type', {
                    rules: [{
                        required: true, message: '请选择你的语言考试类型!',
                    }],
                })(
                    <RadioGroup onChange={this.handleTestTypeChange}>
                    <RadioButton value="TOEFL">TOEFL</RadioButton>
                    <RadioButton value="IELTS">IELTS</RadioButton>
                    </RadioGroup>
                )}
                </FormItem>


                {   getFieldValue('language_type') === 'IELTS' ?
                    <div>
                        <FormItem
                        {...formItemLayout}
                        label="阅读"
                        >
                        {getFieldDecorator('language_reading', {
                            initialValue: 7,
                            rules: [{
                                required: true, message: '请选择你的阅读成绩!',
                            }]
                        })(
                            <InputNumber min={0} max={9} />
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="听力"
                        >
                        {getFieldDecorator('language_listening', {
                            initialValue: 7,
                            rules: [{
                                required: true, message: '请选择你的听力成绩!',
                            }]
                        })(
                            <InputNumber min={0} max={9} />
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="口语"
                        >
                        {getFieldDecorator('language_speaking', {
                            initialValue: 7,
                            rules: [{
                                required: true, message: '请选择你的口语成绩!',
                            }]
                        })(
                            <InputNumber min={0} max={9} />
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="写作"
                        >
                        {getFieldDecorator('language_writing', {
                            initialValue: 7,
                            rules: [{
                                required: true, message: '请选择你的写作成绩!',
                            }]
                        })(
                            <InputNumber min={0} max={9} />
                        )}
                        </FormItem>
                    </div>
                    : 
                    <div>
                        <FormItem
                        {...formItemLayout}
                        label="阅读"
                        >
                        {getFieldDecorator('language_reading', {
                            initialValue: 20,
                            rules: [{
                                required: true, message: '请选择你的阅读成绩!',
                            }]
                        })(
                            <InputNumber min={0} max={30} />
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="听力"
                        >
                        {getFieldDecorator('language_listening', {
                            initialValue: 20,
                            rules: [{
                                required: true, message: '请选择你的听力成绩!',
                            }]
                        })(
                            <InputNumber min={0} max={30} />
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="口语"
                        >
                        {getFieldDecorator('language_speaking', {
                            initialValue: 20,
                            rules: [{
                                required: true, message: '请选择你的口语成绩!',
                            }]
                        })(
                            <InputNumber min={0} max={30} />
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="写作"
                        >
                        {getFieldDecorator('language_writing', {
                            initialValue: 20,
                            rules: [{
                                required: true, message: '请选择你的写作成绩!',
                            }]
                        })(
                            <InputNumber min={0} max={30} />
                        )}
                        </FormItem>
                    </div>
                }

                <FormItem
                {...formItemLayout}
                label="GRE Verbal"
                >
                {getFieldDecorator('gre_verbal', {
                    initialValue: 150,
                    rules: [{
                        required: true, message: '请选择你的GRE词汇成绩!',
                    }]
                })(
                    <InputNumber min={130} max={170} />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="GRE Quantitative"
                >
                {getFieldDecorator('gre_quantitative', {
                    initialValue: 150,
                    rules: [{
                        required: true, message: '请选择你的GRE数学成绩!',
                    }]
                })(
                    <InputNumber min={130} max={170} />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="GRE Writing"
                >
                {getFieldDecorator('gre_writing', {
                    initialValue: 3.5,
                    rules: [{
                        required: true, message: '请选择你的GRE写作成绩!',
                    }]
                })(
                    <InputNumber min={2.0} max={5.0} />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="研究经历"
                >
                {getFieldDecorator('research_id', {
                    rules: [{
                    required: true, message: '请输入你的研究经历!',
                    }],
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
                <FormItem
                {...formItemLayout}
                label="实习经历"
                >
                {getFieldDecorator('project_id', {
                    rules: [{
                    required: true, message: '请输入你的项目经历!',
                    }],
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
                <FormItem
                {...formItemLayout}
                label="推荐信"
                >
                {getFieldDecorator('recommendation_id', {
                    rules: [{
                    required: true, message: '请输入你的信息!',
                    }],
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
            
                {/* FIXME: when you click the checkbox twice, It will pop-up nothing. */}
                <FormItem {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                    rules: [{
                        required: true, message: '请同意用户守则!',
                    }],
                })(
                    <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                )}
                </FormItem>
                {
                    this.props.hasSubmitButton === 'true' ?
                    (
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </FormItem>
                    ) : null
                }
            </Form>
        );
    }
}

const WrappedUserComplementReportForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
            return {
                major: Form.createFormField({
                    ...props.major,
                    value: props.major.value,
                }),
                gpa: Form.createFormField({
                    ...props.gpa,
                    value: props.gpa.value,
                }),
                language_type: Form.createFormField({
                    ...props.language_type,
                    value: props.language_type.value,
                }),
                language_reading: Form.createFormField({
                    ...props.language_reading,
                    value: props.language_reading.value,
                }),
                language_listening: Form.createFormField({
                    ...props.language_listening,
                    value: props.language_listening.value,
                }),
                language_speaking: Form.createFormField({
                    ...props.language_speaking,
                    value: props.language_speaking.value,
                }),
                language_writing: Form.createFormField({
                    ...props.language_writing,
                    value: props.language_writing.value,
                }),
                gre_verbal: Form.createFormField({
                    ...props.gre_verbal,
                    value: props.gre_verbal.value,
                }),
                gre_quantitative: Form.createFormField({
                    ...props.gre_quantitative,
                    value: props.gre_quantitative.value,
                }),
                gre_writing: Form.createFormField({
                    ...props.gre_writing,
                    value: props.gre_writing.value,
                }),
                research_id: Form.createFormField({
                    ...props.research_id,
                    value: props.research_id.value,
                }),
                project_id: Form.createFormField({
                    ...props.project_id,
                    value: props.project_id.value,
                }),
                recommendation_id: Form.createFormField({
                    ...props.recommendation_id,
                    value: props.recommendation_id.value,
                }),
                agreement: Form.createFormField({
                    ...props.agreement,
                    value: props.agreement.value,
                }),
            };
    },
    onValuesChange(_, values) {
    //   console.log(values);
    },
})(UserReportForm);


function mapStateToProps(state) {
    return {
    };
}
// const WrappedUserReportForm = Form.create()(UserReportForm);
const WrappedUserReportForm = Form.create()(connect(mapStateToProps)(UserReportForm));

export {WrappedUserComplementReportForm, WrappedUserReportForm};