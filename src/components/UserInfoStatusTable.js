import React from 'react';
import { Table, Divider } from 'antd';
import request from '../utils/request';
import PropTypes from 'prop-types';
const { Column } = Table;


class UserInfoStatusTabel extends React.Component {
    state = {
        data: [],
    }
    async componentWillMount(){
        const { data } = await request('/oversea/api/applicants/'+ this.props.applicant_id);

        const newData = [{
            key: '学院',
            value: data.college,
        }, {
            key: '专业',
            value: data.major,
        }, {
            key: 'GPA',
            value: data.gpa,
        }, {
            key: data.language_type,
            value: data.language_reading+'+'+data.language_listening+'+'+data.language_speaking+'+'+data.language_writing,
        }, {
            key: 'GRE',
            value: data.gre_verbal+'+'+data.gre_quantitative+'+'+data.gre_writing,
        }, {
            key: '研究情况',
            value: data.research,
        }, {
            key: '项目情况',
            value: data.project,
        }, {
            key: '推荐信',
            value: data.recommendation,
        }]
            
        this.setState({
            data: [...newData]
        })

    }

    render() {

        return (
            <Table dataSource={this.state.data} >
                <Column
                    dataIndex="key"
                    key="key"
                />
                <Column
                dataIndex="value"
                key="value"
                />
        
                <Column
                title="操作"
                key="action"
                render={(text, record) => (
                    <span>
                    <a href="javascript:;">编辑</a>       
                    </span>
                )}
                />
            </Table>    
          
        );
    }
}

UserInfoStatusTabel.propTypes = {
    applicant_id: PropTypes.number
};

export default UserInfoStatusTabel;