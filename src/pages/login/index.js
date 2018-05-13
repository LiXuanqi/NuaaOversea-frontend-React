import React from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd'
import styles from './index.less'
import logo from '../../assets/logo.png'

const FormItem = Form.Item

const LoginPage = ({
    history,
    dispatch,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
    },
}) => {
    function handleOk () {
        validateFieldsAndScroll((errors, values) => {
          if (errors) {
            return
          }
          const redirect_url = history.location.query.redirect_url;
          dispatch({
            type: 'user/login',
            payload: {
                ...values,
                redirect_url: redirect_url
            }
          })
        })
    }

    return (
        <div className={styles.form}>
            <div className={styles.logo}>
                <img alt="logo" src={logo} />
                <span>NuaaOversea</span>
            </div>
            <form>
                <FormItem hasFeedback>
                    {getFieldDecorator('username', {
                    rules: [
                        {
                        required: true,
                        },
                    ],
                    })(<Input onPressEnter={handleOk} placeholder="Username" />)}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                    rules: [
                        {
                        required: true,
                        },
                    ],
                    })(<Input type="password" onPressEnter={handleOk} placeholder="Password" />)}
                </FormItem>
                <Row>
                    <Button type="primary" onClick={handleOk}>
                        登陆
                    </Button>
                    <p>
                        <span>Username：guest</span>
                        <span>Password：guest</span>
                    </p>
                    <p>
                        <span>还没有账号吗？ 注册</span>
                    </p>
                </Row>
            </form>
      </div>
    );
}

LoginPage.propTypes = {
};

export default connect()(Form.create()(LoginPage));
