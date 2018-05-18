import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import { Row, Col } from 'antd';
import { WrappedUserReportForm } from '../../components/UserReportForm';
import BillboardCard from '../../components/BillboardCard';

class UserReport extends React.Component {  

    render() {
        return (

            <div className={styles.container}>
                <Row gutter={32}>
                    <Col span={18} className={styles.contentContainer}>
                        
                        <WrappedUserReportForm hasSubmitButton='true' onRef={()=>{}}/>
                    </Col>
                    <Col span={6} className={styles.sidebarContainer}>
              
                        <BillboardCard />
                        <BillboardCard />
                    </Col>
                </Row>
            </div>     

        );
    }
}

UserReport.propTypes = {
};

export default connect()(UserReport);