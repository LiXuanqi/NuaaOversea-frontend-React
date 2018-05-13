import React from 'react';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import styles from './UserInfoCard.css';
import { Button, Avatar } from 'antd';
import { isLogin } from '../utils/user';
import router from 'umi/router';
import avatar2 from '../assets/avatar2.jpg';

const UserInfoCard = ({ history, username, role, helpNumber }) => {

    const handleLogin = () => {
        router.push('/login?redirect_url=' + history.location.pathname);
    };

    return (
        <div className={styles.card}>
            <div className={styles.userInfoContainer}>
                <div className={styles.avatar}>
                    { 
                        username ?
                        // TODO: random avatar.
                        <Avatar size="large" src={avatar2} />
                        :
                        <Avatar size="large" icon="user" />
                    }
                    
                </div>

                <div className={styles.userInfo}>
                    <span className={styles.username}>{username ? username : '未登录'}</span>
                    <span className={styles.role}>{role ? role : '访问者'}</span>
                </div>
            </div>
            {
                username ?
                    <div className={styles.actionsContainer}>
                        <Link to="/case_report"><Button className={styles.buttonBlue} type="primary">报OFFER</Button></Link>
                        <Link to="/user_report"><Button className={styles.buttonBlue} type="primary">报三维</Button></Link>
                    </div>
                :
                    <div className={styles.actionsContainer}>
                        <Button className={styles.buttonBlue} type="primary" onClick={handleLogin}>登陆</Button>
                        <Button className={styles.buttonBlue} type="primary" disabled>报OFFER</Button>
                    </div>
            }

           <div className={styles.textContainer}>
                {
                    username ?
                    '你的录取汇报已经帮助了'+ helpNumber + '人。'
                    :
                    ''
                }
               
           </div>
        </div>
    );
};

UserInfoCard.propTypes = {
};

export default withRouter(UserInfoCard);
