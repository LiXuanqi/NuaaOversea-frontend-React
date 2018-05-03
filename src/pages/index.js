import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card} from 'antd';
import Cover from '../components/Cover';

const { Meta } = Card;

function IndexPage() {
    return (
        <div>
            <Cover />
            <div style={{ padding: 24 }}>
                {/* <span className={styles.bbsName}>论坛</span> */}
                <Row gutter={16} type="flex" justify="space-around">
                    <Col span={8}>
                        <Link to="/cases">
                            <Card
                                style={{ width: 350 }}
                                cover={<img alt="example" src="public/card-1.jpg" />}
                            >
                                <Meta
                                title="飞跃榜"
                                description="This is the description"
                                />
                            </Card>
                        </Link>
                    </Col>
                    <Col span={8}>
                       
                        <Card
                            style={{ width: 350 }}
                            cover={<img alt="example" src="public/card-2.jpg" />}
                        >
                            <Meta
                            title="选校测评"
                            description="This is the description"
                            />
                        </Card>
                    
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{ width: 350 }}
                            cover={<img alt="example" src="public/card-3.jpg" />}
                        >
                            <Meta
                            title="论坛专区"
                            description="This is the description"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
