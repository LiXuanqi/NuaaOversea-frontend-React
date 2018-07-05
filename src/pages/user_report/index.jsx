import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import { Row, Col } from 'antd';
import { WrappedUserReportForm } from 'Components/UserReportForm';
import BillboardCard from 'Components/BillboardCard';


const UserReport = ({ userDetail, applicantId }) => {
  return (
    <div className={styles.container}>
      <Row gutter={32}>
        <Col xs={24} sm={18} className={styles.contentContainer}>
          <WrappedUserReportForm
            hasSubmitButton='true'
            onRef={() => { }}
            initData={userDetail}
            applicantId={applicantId}
          />
        </Col>
        <Col xs={0} sm={6} className={styles.sidebarContainer}>
          <BillboardCard />
          <BillboardCard />
        </Col>
      </Row>
    </div>
  );
}

UserReport.propTypes = {
};

function mapStateToProps(state) {
  return {
    userDetail: state.user.detail,
    applicantId: state.user.profile['applicant_id']
  }
}
export default connect(mapStateToProps)(UserReport);