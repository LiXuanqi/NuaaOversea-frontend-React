import React from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd'
import styles from './index.less'
import logo from '../../assets/logo.png'
import Link from 'umi/link';
import { WEBSITE_NAME } from '../../utils/config';
import auth from '../../services/auth';

const FormItem = Form.Item

const LoginPage = ({
  history,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const redirect_url = history.location.query.redirect_url;
      //   dispatch({
      //     type: 'user/login',
      //     payload: {
      //         ...values,
      //         redirect_url: redirect_url
      //     }
      //   })
      const { username, password } = values;
      auth.login(username, password);
    })
  }

  return (
    <div className={styles.form}>
      <Link to='/'>
        <div className={styles.logo}>
          <img alt="logo" src={logo} />
          <span>{WEBSITE_NAME}</span>
        </div>
      </Link>
      <div style={{ marginBottom: '8px' }}>
        <span className={styles.hasUser}>还没有账号？</span>
        <Link to="/register"><span className={styles.loginText}>注册</span></Link>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="用户名" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="密码" />)}
        </FormItem>
        <Row>
          <Button type="primary" onClick={handleOk}>
            登陆
                    </Button>
          <p>
            <span>Username：guest</span>
            <span>Password：guest</span>
          </p>

        </Row>
      </form>
    </div>
  );
}

LoginPage.propTypes = {
};

export default connect()(Form.create()(LoginPage));
