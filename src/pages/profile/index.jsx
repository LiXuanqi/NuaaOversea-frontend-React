import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Divider, Icon } from 'antd';
import styles from './index.css';
import avatar from '../../assets/avatar4.jpg';
import UserInfoCasesTabel from '../../components/UserInfoCasesTabel';
import UserInfoStatusTable from '../../components/UserInfoStatusTable';
import Link from 'umi/link'
import auth from '../../services/auth';

class ProfilePage extends React.Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = auth;
    if (!userProfile) {
      getProfile()
        .then((data) => {
          this.setState({
            profile: data['data']
          });
        })
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state;
    return (
      <div>
        <Row className={styles.container} type="flex" justify="center" gutter={24}>
  
          <Col span={5} className={styles.sideBar}>
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
          <Col span={16} >
            <div className={styles.headerContainer}>
              <h2>你的录取汇报</h2>
              <Link to="/case_report"><Button>报Offer</Button></Link>
            </div>
            <div className={styles.contentContainer}>
              <UserInfoCasesTabel applicant_id={profile.applicant_id} />
            </div>
  
            <div className={styles.headerContainer}>
              <h2>你的三维</h2>
            </div>
            <div className={styles.contentContainer}>
              <UserInfoStatusTable applicant_id={profile.applicant_id} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

}

ProfilePage.propTypes = {
};

export default connect()(ProfilePage);
