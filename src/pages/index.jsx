import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card } from 'antd';
import Cover from '../components/Cover';
import cardCover1 from '../assets/card-1.jpg';
import cardCover2 from '../assets/card-2.jpg';
import cardCover3 from '../assets/card-3.jpg';
const { Meta } = Card;

function IndexPage() {
  return (
    <div>
      <Row>
        <Col span={24}>
          <Cover />
        </Col>
      </Row>
      <div style={{ padding: 24 }}>
        {/* <span className={styles.bbsName}>论坛</span> */}
        <Row gutter={16} type="flex" justify="space-around">
          <Col xl={8} lg={12} sm={24}>
            <Link to="/cases">
              <Card
                style={{ width: '100%', marginBottom: '8px' }}
                cover={<img alt="example" src={cardCover1} />}
              >
                <Meta
                  title="飞跃榜"
                  description="This is the description"
                />
              </Card>
            </Link>
          </Col>
          <Col xl={8} lg={12} sm={24}>
            <Link to="/tutorial">
              <Card
                style={{ width: '100%', marginBottom: '16px' }}
                cover={<img alt="example" src={cardCover2} />}
              >
                <Meta
                  title="留学指南"
                  description="This is the description"
                />
              </Card>
            </Link>

          </Col>
          <Col xl={8} lg={12} sm={24}>
            <Link to="/about">
              <Card
                style={{ width: '100%', marginBottom: '8px' }}
                cover={<img alt="example" src={cardCover3} />}
              >
                <Meta
                  title="关于我们"
                  description="This is the description"
                />
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
