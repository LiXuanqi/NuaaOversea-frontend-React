import React from 'react';
import styles from './index.css';
import Header from './Header';
import { Row, Col } from 'antd';
import { simpleLayoutPages } from '../utils/config';
import withRouter from 'umi/withRouter';


function PageLayout({ children, location }) {
  if (simpleLayoutPages.includes(location.pathname)) {
    return (<div>{children}</div>);
  }
  return (
    <div className={styles.normal}>
      <Header />
      
      <Row type="flex" >
        <Col xl={2} md={1} xs={0}/>
        <Col xl={20} md={22} xs={24}>
          <div className={styles.content}>
            <div className={styles.main}>
              {children}
            </div>
          </div>
        </Col>
        <Col xl={2} md={1} xs={0}/>
      </Row>
    </div>
  );
}

export default withRouter(PageLayout);