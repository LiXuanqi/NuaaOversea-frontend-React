import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import request from '../utils/request';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import UserInfoStatusUpdateModal from '../components/UserInfoStatusUpdateModal';


const { Column } = Table;

class UserInfoCasesTabel extends React.Component {
    state = {
        data: [],
        visible: false,
    }
    
    async componentWillMount(){
        const { data } = await request('/oversea/api/applications?applicant_id='+this.props.applicant_id);
        const applications = data.applications;
        console.log(applications);
        const newApplications = applications.map((item, index)=>{
            const data = {
                key: index,
                application_id: item.id,
                result: item.result,
                university: item.university,
                major: item.major,
                description: item.term+'|'+item.degree
            }
   
            return data;
        })
        
        this.setState({
            data: [...newApplications]
        })
    }

    showModal = (applicant_id) => {
        console.log(applicant_id);
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          console.log('Received values of form: ', values);
          form.resetFields();
          this.setState({ visible: false });
        });
    }

    deleteCase(applicant_id) {
        this.props.dispatch({
            type: 'cases/deleteCaseById',
            payload: applicant_id,
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
                        <a href="javascript:;" onClick={() => this.showModal(record.application_id)}>编辑</a>
                        <UserInfoStatusUpdateModal
                            wrappedComponentRef={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                        />

                        <Divider type="vertical" />
                        <Popconfirm title="你确定要删除吗?" onConfirm={() => this.deleteCase(record.application_id)}>
                        <a href="javascript:;">删除</a>
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