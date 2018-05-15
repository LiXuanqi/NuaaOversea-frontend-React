import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Divider, Icon, Table } from 'antd';
import styles from './index.css';
import avatar from '../../assets/avatar4.jpg';

const { Column } = Table;
const data = [{
        key: '1',
        result: 'ad',
        university: 'CMU',
        major: 'CS'
    }, {
        key: '2',
        result: 'rej',
        university: 'NEU',
        major: 'IS'
    }, {
        key: '3',
        result: 'offer',
        university: 'TAMU',
        major: 'EE'
}];

const LoginPage = () => {
    return (
        <div>
            <Row className={styles.container} type="flex" justify="center" gutter={24}>

                <Col span={5} className={styles.sideBar}>
                        <div className={styles.avatarContainer}>
                            <img alt="avatar" src={avatar} width="100%" />    
                        </div>
                     
                        <span className={styles.username}>
                            Xuanqi Li
                        </span>
                        <Button style={{width: '100%'}}>报三维</Button>
                        <Divider />
                        <Icon style={{marginRight: '8px'}} type="mail" />
                        <span className={styles.email}>lixuanqi1995@gmail.com</span>
                </Col>
                <Col span={16} >
                    <div className={styles.headerContainer}>
                        <h2>你的录取汇报</h2>
                        <Button>报Offer</Button>
                    </div>
                    <div className={styles.contentContainer}>
                        <Table dataSource={data} >
                            <Column
                                title="录取结果"
                                dataIndex="result"
                                key="result"
                            />
                
                            <Column
                            title="学校"
                            dataIndex="university"
                            key="university"
                            />
                            <Column
                            title="专业"
                            dataIndex="major"
                            key="major"
                            />
                            <Column
                            title="操作"
                            key="action"
                            render={(text, record) => (
                                <span>
                                <a href="javascript:;">编辑</a>
                                <Divider type="vertical" />
                                <a href="javascript:;">删除</a>
        
                                </span>
                            )}
                            />
                        </Table>
                    </div>
                   
                    <div className={styles.headerContainer}>
                        <h2>你的三维</h2>
                        <Button>编辑三维</Button>
                    </div>

                    <div className={styles.contentContainer}>
                        <Table dataSource={data} >
                            <Column
                                title="录取结果"
                                dataIndex="result"
                                key="result"
                            />
                
                            <Column
                            title="学校"
                            dataIndex="university"
                            key="university"
                            />
                            <Column
                            title="专业"
                            dataIndex="major"
                            key="major"
                            />
                            <Column
                            title="操作"
                            key="action"
                            render={(text, record) => (
                                <span>
                                <a href="javascript:;">编辑</a>
                                <Divider type="vertical" />
                                <a href="javascript:;">删除</a>
        
                                </span>
                            )}
                            />
                        </Table>
                    </div>

                </Col>

            </Row>
        </div>
    );
}

LoginPage.propTypes = {
};

export default connect()(LoginPage);
