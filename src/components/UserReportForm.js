import React from 'react';

import { connect } from 'dva';
import { Form, Input, Cascader, Checkbox, Button, Radio, InputNumber } from 'antd';
import { loginUser } from '../utils/user';
import { getRecommendations, getResearches, getProjects, projectNameToId, recommendationNameToId, researchNameToId } from '../utils/dataFromServer';
import request from '../utils/request';

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
        initData: {},
    };

    async componentWillMount(){
        if (loginUser().applicant_id) {
            const { data } = await request('/oversea/api/applicants/' + loginUser().applicant_id);
            this.setState({
                ...this.state,
                initData: {...data}
            })
        }
    }

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
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                const newValues = {
                    ...values,
                    college: values.major[0],
                    major: values.major[1]
                }
                if (loginUser().applicant_id) {
                    this.props.dispatch({
                        type: 'applicants/updateApplicant',
                        payload: {
                            formData: newValues,
                            redirect_url: '/cases',
                        }
                    })
                } else {       
                    this.props.dispatch({
                        type: 'applicants/postApplicant',
                        payload: {
                            formData: newValues,
                            redirect_url: '/cases',
                        }
                    })
                }              
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
        const { initData } = this.state;

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
                    initialValue: [initData.college, initData.major],
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
                    initialValue: initData.gpa,
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
                    initialValue: initData.language_type,
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
                            initialValue: initData.language_reading,
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
                            initialValue: initData.language_listening,
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
                            initialValue: initData.language_speaking,
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
                            initialValue: initData.language_writing,
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
                            initialValue: initData.language_reading,
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
                            initialValue: initData.language_listening,
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
                            initialValue: initData.language_speaking,
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
                            initialValue: initData.language_writing,
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
                    initialValue: initData.gre_verbal,
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
                    initialValue: initData.gre_quantitative,
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
                    initialValue: initData.gre_writing,
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
                    initialValue: researchNameToId(initData.research),
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
                    initialValue: projectNameToId(initData.project),
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
                    initialValue: recommendationNameToId(initData.recommendation),
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
        
            
                {
                    this.props.hasSubmitButton === 'true' ?
                    (
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">注册</Button>
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

    },
})(UserReportForm);


function mapStateToProps(state) {
    return {
    };
}
// const WrappedUserReportForm = Form.create()(UserReportForm);
const WrappedUserReportForm = Form.create()(connect(mapStateToProps)(UserReportForm));

export {WrappedUserComplementReportForm, WrappedUserReportForm};