import { Modal, Form, InputNumber, Radio } from 'antd';
import React from 'react'
import { connect } from 'dva'
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const UserLanguageModal = Form.create()(
    
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

        handleTestTypeChange = () => {
            this.props.form.setFieldsValue({
                language_reading: "",
                language_listening: "",
                language_speaking: "",
                language_writing: ""
              });
        }

        render() {
            let { visible, onCancel, initValue, testType } = this.props;
            const { getFieldDecorator, getFieldValue } = this.props.form;
 
            const initLanguage = initValue.split('+');
            const initReading = parseInt(initLanguage[0], 10);
            const initListening = parseInt(initLanguage[1], 10);
            const initSpeaking = parseInt(initLanguage[2], 10);
            const initWriting = parseInt(initLanguage[3], 10);
       

            return (
                <Modal
                visible={visible}
                title="修改语言成绩"
                okText="修改"
                onCancel={onCancel}
                onOk={this.onCreate}
                > 
                <Form layout="vertical">
                    <FormItem
                    label="语言考试类型"
                    >
                    {getFieldDecorator('language_type', {
                        initialValue: testType,
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
                            label="阅读"
                            >
                            {getFieldDecorator('language_reading', {
                                initialValue: initReading,
                                rules: [{ required: true, message: "请输入你的阅读成绩" }], 
                            })(
                                <InputNumber min={0} max={9} />
                            )}
                            </FormItem>
                            <FormItem
                            label="听力"
                            >
                            {getFieldDecorator('language_listening', {
                                initialValue: initListening,
                                rules: [{ required: true, message: "请输入你的听力成绩" }], 
                            })(
                                <InputNumber min={0} max={9} />
                            )}
                            </FormItem>
                            <FormItem
                            label="口语"
                            >
                            {getFieldDecorator('language_speaking', {
                                initialValue: initSpeaking,
                                rules: [{ required: true, message: "请输入你的口语成绩" }], 
                            })(
                                <InputNumber min={0} max={9} />
                            )}
                            </FormItem>
                            <FormItem
                            label="写作"
                            >
                            {getFieldDecorator('language_writing', {
                                initialValue: initWriting,
                                rules: [{ required: true, message: "请输入你的写作成绩" }], 
                            })(
                                <InputNumber min={0} max={9} />
                            )}
                            </FormItem>
                        </div>
                        : 
                        <div>
                            <FormItem
                            label="阅读"
                            >
                            {getFieldDecorator('language_reading', {
                                initialValue: initReading,
                                rules: [{ required: true, message: "请输入你的阅读成绩" }], 
                            })(
                                <InputNumber min={0} max={30} />
                            )}
                            </FormItem>
                            <FormItem
                            label="听力"
                            >
                            {getFieldDecorator('language_listening', {
                                initialValue: initListening,
                                rules: [{ required: true, message: "请输入你的听力成绩" }], 
                            })(
                                <InputNumber min={0} max={30} />
                            )}
                            </FormItem>
                            <FormItem
                            label="口语"
                            >
                            {getFieldDecorator('language_speaking', {
                                initialValue: initSpeaking,
                                rules: [{ required: true, message: "请输入你的口语成绩" }], 
                            })(
                                <InputNumber min={0} max={30} />
                            )}
                            </FormItem>
                            <FormItem
                            label="写作"
                            >
                            {getFieldDecorator('language_writing', {
                                initialValue: initWriting,
                                rules: [{ required: true, message: "请输入你的写作成绩" }], 
                            })(
                                <InputNumber min={0} max={30} />
                            )}
                            </FormItem>
                        </div>
                    }            
                </Form>
                </Modal>
            );
        }
    }
);

export default connect()(UserLanguageModal);