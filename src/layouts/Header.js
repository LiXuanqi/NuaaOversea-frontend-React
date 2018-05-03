import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import styles from './Header.css';
import { Button, Dropdown, Avatar, Menu, message } from 'antd';
import { isLogin, logout } from '../utils/user.js';
import CaseSearch from '../components/CaseSearch';
import router from 'umi/router';
function Header({ history, dispatch }) {

    const handleUserActionMenuClicked = function ({ key }) {
        console.log(`Click on item ${key}`);
        if (key === 'logout') {
            handleLogout();
        }
    };

    const menu = (
        <Menu onClick={handleUserActionMenuClicked}>
          <Menu.Item key="user_info">个人信息</Menu.Item>
          <Menu.Item key="logout">注销</Menu.Item>
        </Menu>
    );

    const handleLogin = () => {
        // 1. judge isLogin();
        // 2. if yes, 
        // 3. if no, navigate to /sso-v2/oauth/12345678?redirect_uri=' + history.location.pathname
        if (!isLogin()) {
            window.location.href = '/sso-v2/oauth/12345678?redirect_uri=' + history.location.pathname;
        }
        // will get code.
  
    };
    
    const handleLogout = () => {
        logout();
    };
    const handleReportOffer = () => {
        if (isLogin()) {
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
                        <img src="../../public/logo.png" alt="logo" width="48px"/>
                    </span>
                </Link>
                <div className={styles.brand}>
                    <span className={styles.brandName}>Oversea</span>
                    <span className={styles.brandIntro}>Cases for everyone</span>
                </div>
                <CaseSearch />
            </div>
            <div className={styles.headerRight}>
                <div className={styles.actionContainer}>
                  
                    <Button size="large" type="dashed" onClick={handleReportOffer}>报OFFER</Button>
               
                </div>
                <div className={styles.userInfoContainer}>
                    {
                        isLogin()
                            ?
                            <div>
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                                </Dropdown>

                            </div>
                            :
                            <Button size="large" type="primary" onClick={handleLogin}>登陆</Button> 
                    }
                </div>
            </div>
        </div>
  );
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(withRouter(Header));