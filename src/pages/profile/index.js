import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Divider, Icon } from 'antd';
import styles from './index.css';
import avatar from '../../assets/avatar4.jpg';
import UserInfoCasesTabel from '../../components/UserInfoCasesTabel';
import UserInfoStatusTable from '../../components/UserInfoStatusTable';
import Link from 'umi/link'
import { loginUser } from '../../utils/user';

// TODO: check the login status before render, if not , redirect to home page.

const ProfilePage = () => {
    const userInfo = loginUser();
    return (
        <div>
            <Row className={styles.container} type="flex" justify="center" gutter={24}>

                <Col span={5} className={styles.sideBar}>
                        <div className={styles.avatarContainer}>
                            <img alt="avatar" src={avatar} width="100%" />    
                        </div>
                     
                        <span className={styles.username}>
                            { userInfo.username }
                        </span>
                        <Link to="/user_report"><Button style={{width: '100%'}}>报三维</Button></Link>
                        <Divider />
                        <Icon style={{marginRight: '8px'}} type="mail" />
                        <span className={styles.email}>{ userInfo.email }</span>
                </Col>
                <Col span={16} >
                    <div className={styles.headerContainer}>
                        <h2>你的录取汇报</h2>
                        <Link to="/case_report"><Button>报Offer</Button></Link>
                    </div>
                    <div className={styles.contentContainer}>
                        <UserInfoCasesTabel applicant_id={ loginUser().applicant_id }/>
                    </div>
                   
                    <div className={styles.headerContainer}>
                        <h2>你的三维</h2>
                    </div>
                    <div className={styles.contentContainer}>
                        <UserInfoStatusTable applicant_id={ loginUser().applicant_id }/>  
                    </div>

                </Col>

            </Row>
        </div>
    );
}

ProfilePage.propTypes = {
};

export default connect()(ProfilePage);
