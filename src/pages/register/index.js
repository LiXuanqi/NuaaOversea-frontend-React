import React from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input, Tooltip, Icon, Checkbox } from 'antd'
import styles from './index.less'
import logo from '../../assets/logo.png'
import Link from 'umi/link';
import { WEBSITE_NAME } from '../../utils/config';

const FormItem = Form.Item
  
class RegisterPage extends React.Component {
    state = {
        confirmDirty: false,
    }
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
          if (errors) {
            return
          }
          this.props.dispatch({ type: 'user/register', payload: values })
        })
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.form}>
                <Link to='/'>
                    <div className={styles.logo}>
                        <img alt="logo" src={logo} />
                        <span>{WEBSITE_NAME}</span>
                    </div>
                </Link>
                <div style={{marginBottom: '8px'}}>
                    <span className={styles.hasUser}>已有账号？</span>
                    <Link to="/login"><span className={styles.loginText}>登陆</span></Link>
                </div>

                <form>
                    <FormItem  
                        label="用户名"
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入你的用户名!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                            required: true, message: '请输入你的密码!',
                            }, {
                            validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>

                    <FormItem
                        label="密码确认"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                            required: true, message: '请确认你的密码!',
                            }, {
                            validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>

                    <FormItem
                        label={(
                            <span>
                            邮箱&nbsp;
                            <Tooltip title="邮箱主要用于密码找回，如果你希望把邮箱作为联系方式公开给学弟学妹，请勾选下方的选项。">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                            </span>
                        )}
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                            type: 'email', message: '这不是一个合法的 E-mail 地址!',
                            }, {
                            required: true, message: '请输入你的 E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('will_contact', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>我愿意通过电子邮件与学弟学妹进行联系</Checkbox>
                        )}
                    </FormItem>
                    <Row>
                        <Button type="primary" onClick={this.handleOk}>
                            注册
                        </Button>
                        {/* TODO: 验证码 */}
            
                    </Row>
                </form>
        </div>
        );
    }

}

RegisterPage.propTypes = {
};

export default connect()(Form.create()(RegisterPage));
