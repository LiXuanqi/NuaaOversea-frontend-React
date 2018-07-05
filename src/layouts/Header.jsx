import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './Header.css';
import { Button, Dropdown, Avatar, Menu, message } from 'antd';
import CaseSearch from '../components/CaseSearch';
import logo from '../assets/logo.png';
import { WEBSITE_NAME, WEBSITE_INTRO } from '../utils/config';
import auth from '../services/auth';

function Header({ history, dispatch }) {

  const goToLoginPage = () => {
    router.push('/login?redirect_url=' + history.location.pathname);
  }

  const handleUserActionMenuClicked = function ({ key }) {
    switch(key) {
      case "user_info":
        router.push('/profile');
        break;
      case "logout":
        auth.logout();
        break;
      case "login":
        router.push('/login');
        break;
      case "register":
        router.push('/register');
        break;
      default: null;
    }
  };

  const loginMenu = (
    <Menu onClick={handleUserActionMenuClicked}>
      <Menu.Item key="user_info">个人信息</Menu.Item>
      <Menu.Item key="logout">注销</Menu.Item>
    </Menu>
  );

  const mobileUnLoginMenu = (
    <Menu onClick={handleUserActionMenuClicked}>
      <Menu.Item key="login">登陆</Menu.Item>
      <Menu.Item key="register">注册</Menu.Item>
    </Menu>
  );

  const handleReportOffer = () => {
    if (auth.isAuthenticated()) {
      router.push('/case_report')
    } else {
      message.error('请先登录！');
    }
  }
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/">
          <span>
            <img src={logo} alt="logo" width="48px" />
          </span>
        </Link>
        <div className={styles.brand}>
          <span className={styles.brandName}>{WEBSITE_NAME}</span>
          <span className={styles.brandIntro}>{WEBSITE_INTRO}</span>
        </div>
        <div className={styles.searchContainer}>
          <CaseSearch />
        </div>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.actionContainer}>
          <Button size="large" type="dashed" onClick={handleReportOffer}>报OFFER</Button>
        </div>
        <div className={styles.userInfoContainer}>
          {
            auth.isAuthenticated()
              ?
              <div>
                <Dropdown overlay={loginMenu} placement="bottomCenter">
                  <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                </Dropdown>

              </div>
              :
              <div>
                <Button size="large" type="primary" style={{ marginRight: '16px' }} onClick={goToLoginPage}>登陆</Button>
                <Link to='/register'><Button size="large" type="primary">注册</Button></Link>
              </div>
          }
        </div>
        <div className={styles.mobile}>
          {
            auth.isAuthenticated() ?
              <Dropdown overlay={loginMenu} placement="bottomCenter" trigger={['click']}>
                <Button shape="circle" icon="user"/>
              </Dropdown>
              : <Dropdown overlay={mobileUnLoginMenu} placement="bottomCenter" trigger={['click']}>
                  <Button shape="circle" icon="bars"/>
                </Dropdown>
          }
       
     
        </div>
      </div>
    </div>
  );
}


export default connect()(withRouter(Header));