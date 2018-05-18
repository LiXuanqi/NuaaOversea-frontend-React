import React from 'react';
import { Form, Icon, Button, Divider, Checkbox, message } from 'antd';
import CaseInput from './CaseInput';

const FormItem = Form.Item;
let uuid = 0;

class CaseReportForm extends React.Component {
    componentDidMount(){
        this.props.onRef(this)
    }

    check = (action) => {
        const data = this.props.form.getFieldsValue();   
        console.log(data);
        if (action === "next") {
            if (this.validate(data) === true) {
                this.props.nextPage();
            } else {
                message.warn('请完善你的表单');
            }  
        }
        if (action === "prev") {

            this.props.prevPage();
        }
    }

    validate = (data) => {
        let validate = true;
        if (data.keys.length === 0) {
            return false;
        }
        data.keys.forEach((item) => {
            if (data.cases[item] === undefined) {
                validate = false;
                return;
            }
            if (data.cases[item].country_id === undefined || data.cases[item].country_id === "") {
                validate = false;
                return;
            }
            if (data.cases[item].degree === undefined || data.cases[item].degree === "") {
                validate = false;
                return;
            }
            if (data.cases[item].is_transfer === undefined) {
                validate = false;
                return;
            }
            if (data.cases[item].major === undefined || data.cases[item].major === "") {
                validate = false;
                return;
            }
            if (data.cases[item].result === undefined || data.cases[item].result === "") {
                validate = false;
                return;
            }
            if (data.cases[item].term === undefined || data.cases[item].term === "") {
                validate = false;
                return;
            }
            if (data.cases[item].university === undefined || data.cases[item].university === "") {
                validate = false;
                return;
            }
        });
        return validate;
    }

    remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
        return;
    }

    // can use data-binding to set
    form.setFieldsValue({
        keys: keys.filter(key => key !== k),
    });
    }

    add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
        keys: nextKeys,
    });
    }

    handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (err) {
            return;
        }
        // TODO: format the Date data.
        console.log('Received values of form: ', values);
    });
    }

    onInfoRepeatChanged = (e) => {
        const isChecked = e.target.checked;
        const checkedValue = e.target.value;

        const oldCase = this.props.form.getFieldValue(`cases[${checkedValue}]`);
        console.log(oldCase);
        const university = oldCase === undefined ? undefined : oldCase.university ;
        const result = oldCase === undefined ? undefined : oldCase.result;
        
        if (isChecked === true) {
            // auto repeated form's last field.
            
            
            const keys = this.props.form.getFieldValue('keys');

            const index = keys.indexOf(checkedValue);

            const lastNameIndex = keys[index - 1];
            const lastCase = this.props.form.getFieldValue(`cases[${lastNameIndex}]`);
            // console.log(this.props.cases);
            // console.log('checkedValue:' + checkedValue);
            // console.log('keys:');
            // console.log(keys);   
            // console.log('index:' + index);
            // console.log(lastCase);


            let newCase = {...lastCase, university, result};
            
            let caseName = 'cases[' + checkedValue + ']';
            this.props.form.setFieldsValue({
                [caseName]: newCase,
            });
        } else {


            const degree = undefined;
            const major = '';
            const country_id = undefined;
            const term = undefined;
            let newCase = {...oldCase, university, result, degree, major, country_id, term};

            let caseName = 'cases[' + checkedValue + ']';
            this.props.form.setFieldsValue({
                [caseName]: newCase,
            });
        }  

    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
            },
            wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
            },
        };

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {

            return (
            <FormItem
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? '案例:' : ''}
                required={false}
                key={k}
            >

                {getFieldDecorator(`cases[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                    type: 'object',
                    required: true,
                    whitespace: true,
                    message: "请完善录取结果信息或删除该区域。"
                }],
                })(
                    <CaseInput>
                        {
                            index !== 0 ? (
                                <Checkbox value={k} onChange={this.onInfoRepeatChanged}>与上个案例一致</Checkbox>
                            ) : null
                        }
                    </CaseInput>
                )}

                {
                    keys.length > 1 ? (
                        <Button type="danger" onClick={() => this.remove(k)}>删除该案例</Button>
                    ) : null
                }
                <Divider />
            </FormItem>
            
            );
        });

        return (
            <Form >

                {formItems}

                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> 添加案例
                    </Button>
                </FormItem>
                {/* <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem> */}
            </Form>
        );
    }
}

const WrappedCaseReportForm = Form.create({
    onFieldsChange(props, changedFields) {
      props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        let formField = {
            keys: Form.createFormField({
                ...props.keys,
                value: props.keys.value,
            }),
        };

        props.cases.map((key, index) => {
            let name = 'cases[' + index + ']';
            let newCase ={
                [name] : Form.createFormField({...props.cases[index]}),
            };
            formField = {
                ...formField,
                ...newCase
            }
            return null;
        })

        return formField;
    },
    onValuesChange(_, values) {
    //   console.log(values);
    },
  })(CaseReportForm);
export default WrappedCaseReportForm;