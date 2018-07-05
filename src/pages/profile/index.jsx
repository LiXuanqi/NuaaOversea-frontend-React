import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Divider, Icon, Table } from 'antd';
import styles from './index.css';
import avatar from '../../assets/avatar4.jpg';
import UserInfoCasesTabel from 'Components/UserInfoCasesTabel.jsx';
import UserInfoStatusTable from 'Components/UserInfoStatusTable.jsx';

import Link from 'umi/link'


class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchProfile'
    });
  }
  render() {
    const { profile, userDetail, userCases } = this.props;

    const dataSource = [{
      key: '1',
      username: profile.username,
      email: profile.email,
    }];
    
    const columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }];

    return (
      <div>
        <Row className={styles.container} type="flex" justify="center" gutter={24}>
  
          <Col xs={0} sm={5} className={styles.sideBar}>
            <div className={styles.avatarContainer}>
              <img alt="avatar" src={avatar} width="100%" />
            </div>
            <span className={styles.username}>
              {profile.username}
            </span>
            <Link to="/user_report"><Button style={{ width: '100%' }}>报三维</Button></Link>
            <Divider />
            <Icon style={{ marginRight: '8px' }} type="mail" />
            <span className={styles.email}>{profile.email}</span>
          </Col>
          <Col xs={22} sm={16} >
            <div className={styles.mobileInfo}>
              <div className={styles.headerContainer}>
                <h2>用户信息</h2>
                <Link to="/user_report"><Button style={{ width: '100%' }}>报三维</Button></Link>
              </div>
              <div className={styles.contentContainer}>
                <Table dataSource={dataSource} columns={columns} />
              </div>
            </div>

            <div className={styles.headerContainer}>
              <h2>你的录取汇报</h2>
              <Link to="/case_report"><Button>报Offer</Button></Link>
            </div>
            <div className={styles.contentContainer}>
              <UserInfoCasesTabel initData={userCases} />
            </div>
  
            <div className={styles.headerContainer}>
              <h2>你的三维</h2>
            </div>
            <div className={styles.contentContainer}>
              <UserInfoStatusTable initData={userDetail} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

}

ProfilePage.propTypes = {

};

function mapStateToProps(state) {
  return {
    profile: state.user.profile,
    userDetail: state.user.detail,
    userCases: state.user.cases
  }
}

export default connect(mapStateToProps)(ProfilePage);
