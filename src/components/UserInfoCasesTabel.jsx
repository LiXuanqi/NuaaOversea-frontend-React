import React from 'react';
import { Table, Divider, Popconfirm, Tag } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import UserInfoCaseUpdateModal from '../components/UserInfoCaseUpdateModal';
import { getApplicationsByApplicantId } from '../services/applications';

const { Column } = Table;

class UserInfoCasesTabel extends React.Component {
    state = {
        data: [],
        choosedCase: -1
    }

    async UNSAFE_componentWillMount(){

        const { data } = await getApplicationsByApplicantId(this.props.applicant_id);
        const applications = data.applications;
  
        const newApplications = applications.map((item, index)=>{
            // deal with init data.
            const term = [item.term.substring(0,4), item.term.substring(4)]

            let is_transfer = false;
            item.tags.forEach((item)=>{
                if (item.name === "转专业") {
                    is_transfer = true;
                }
            })
    
            const data = {
                key: index,
                application_id: item.id,
                result: item.result,
                university: item.university,
                major: item.major,
                term: term,
                degree: item.degree,
                country: item.country,
                is_transfer: is_transfer,
                description: 
                    <div>
                        <Tag color="red">{item.term}</Tag>
                        <Tag color="red">{item.degree}</Tag>
                        <Tag color="red">{item.country}</Tag>
                        {
                            item.tags.map((tag)=>{
                                return <Tag key={tag.id} color="blue">{tag.name}</Tag>
                            })
                        }
                    </div>
           
            }
   
            return data;
        })
        
        this.setState({
            data: [...newApplications]
        })
    }

    showEditModal = (applicant_id) => {
        this.setState({
            choosedCase: applicant_id
        });
    }

    handleCancel = () => {
        this.setState({
            choosedCase: -1
        });
    }

  

    deleteCase(application_id) {
        this.props.dispatch({
            type: 'cases/deleteCaseById',
            payload: {
                application_id,
                redirect_url: '/profile'
            }
        })       
    }

    render() {

        return (
            <Table 
                dataSource={this.state.data}
                expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            >
                <Column
                    title="录取结果"
                    dataIndex="result"
                />
                <Column
                title="学校"
                dataIndex="university"
       
                />
                <Column
                title="专业"
                dataIndex="major"
              
                />
                <Column
                title="操作"            
                render={(text, record) => (
         
                    <span>
                        <a onClick={() => this.showEditModal(record.application_id)}>编辑</a>
                        <UserInfoCaseUpdateModal
                            onCancel={this.handleCancel}
                            caseId={record.application_id}
                            choosedCase={this.state.choosedCase}
                            initData={record}
                        />

                        <Divider type="vertical" />
                        <Popconfirm title="你确定要删除吗?" onConfirm={() => this.deleteCase(record.application_id)}>
                        <a>删除</a>
                        </Popconfirm>
                    </span>
                )}
                />
               
            </Table>
        );
    }
}

UserInfoCasesTabel.propTypes = {
    applicant_id: PropTypes.number
};

export default connect()(UserInfoCasesTabel);