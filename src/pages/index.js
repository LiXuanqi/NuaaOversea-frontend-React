import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card} from 'antd';
import Cover from '../components/Cover';
import cardCover1 from '../assets/card-1.jpg';
import cardCover2 from '../assets/card-2.jpg';
import cardCover3 from '../assets/card-3.jpg';
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
                                cover={<img alt="example" src={cardCover1} />}
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
                            cover={<img alt="example" src={cardCover2}/>}
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
                            cover={<img alt="example" src={cardCover3} />}
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
