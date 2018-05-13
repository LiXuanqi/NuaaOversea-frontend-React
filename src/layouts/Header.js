import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import router from 'umi/router';
import styles from './Header.css';
import { Button, Dropdown, Avatar, Menu, message } from 'antd';
import { isLogin, logout } from '../utils/user.js';
import CaseSearch from '../components/CaseSearch';
import logo from '../assets/logo.png';

function Header({ history, dispatch }) {

    const goToLoginPage = () => {

        router.push('/login?redirect_url=' + history.location.pathname);
    }

    const goToRegisterPage = () => {
        router.push('/register?redirect_url=' + history.location.pathname);
    }

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
                        <img src={logo} alt="logo" width="48px"/>
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
                            <div>
                                <Button size="large" type="primary" style={{ marginRight: '16px'}} onClick={goToLoginPage}>登陆</Button>
                               <Button size="large" type="primary" onClick={goToRegisterPage}>注册</Button>
                            </div>
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