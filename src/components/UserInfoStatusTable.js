import React from 'react';
import { Table } from 'antd';
import request from '../utils/request';
import PropTypes from 'prop-types';
import UserCollegeModal from './UserCollegeModal';
import UserGpaModal from './UserGpaModal';
import UserMajorModal from './UserMajorModal';
import UserResearchModal from './UserResearchModal';
import UserProjectModal from './UserProjectModal';
import UserRecommendationModal from './UserRecommendationModal';
import UserLanguageModal from './UserLanguageModal';
import UserGreModal from './UserGreModal';

const { Column } = Table;
class UserInfoStatusTabel extends React.Component {
    state = {
        data: [],
        visible: {
            college: false,
            major: false,
            gpa: false,
            language: false,
            gre: false,
            research: false,
            project: false,
            recommendation: false
        }
     
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

    showEditModal = (e) => {
        if (e.key === "TOEFL" || e.key === "IELTS") {
            console.log('language')
            this.setState({
                visible: {
                    ...this.state.visible,
                    language: true
                }
            });
        }
        if (e.key === "GRE") {
            console.log('gre')
            this.setState({
                visible: {
                    ...this.state.visible,
                    gre: true
                }
            });
        }

        if (e.key === "学院") {
            this.setState({
                visible: {
                    ...this.state.visible,
                    college: true
                }
            }, ()=>{console.log(this.state.visible)});
        }  
        if (e.key === "专业") {
            this.setState({
                visible: {
                    ...this.state.visible,
                    major: true
                }
            });
        }
        if (e.key === "GPA") {
            this.setState({
                visible: {
                    ...this.state.visible,
                    gpa: true
                }
            });
        }
        if (e.key === "研究情况") {
            this.setState({
                visible: {
                    ...this.state.visible,
                    research: true
                }
            });
        }
        if (e.key === "项目情况") {
            this.setState({
                visible: {
                    ...this.state.visible,
                    project: true
                }
            });
        }
        if (e.key === "推荐信") {
            this.setState({
                visible: {
                    ...this.state.visible,
                    recommendation: true
                }
            });
        }
     
    }

    handleCancel = () => {
        this.setState({
            visible: {
                college: false,
                major: false,
                gpa: false,
                language: false,
                gre: false,
                research: false,
                project: false,
                recommendation: false
            }
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        const { visible } = this.state;
        return (
            <Table dataSource={this.state.data} >
                <Column
                    dataIndex="key"
                />
                <Column
                dataIndex="value"
                />
        
                <Column
                    title="操作"            
                    render={(text, record) => (
                        <span>
                            <a onClick={() => this.showEditModal(record)}>编辑</a>
                            {
                                record.key === "学院"
                                ?
                                <UserCollegeModal                                    
                                    visible={visible.college}
                                    onCancel={this.handleCancel}                      
                                    initValue={record.value}
                                /> : null                    
                            }
                            {
                                record.key === "专业"
                                ?
                                <UserMajorModal                
                                visible={visible.major}
                                onCancel={this.handleCancel}                                
                                initValue={record.value}
                                /> : null                    
                            }
                            {
                                record.key === "GPA"
                                ?
                                <UserGpaModal                          
                                    visible={visible.gpa}
                                    onCancel={this.handleCancel}
                                    initValue={record.value}
                                /> : null                    
                            }
                            {
                                record.key === "研究情况"
                                ?
                                <UserResearchModal                          
                                    visible={visible.research}
                                    onCancel={this.handleCancel}
                                    initValue={record.value}
                                /> : null                    
                            }
                            {
                                record.key === "项目情况"
                                ?
                                <UserProjectModal                          
                                    visible={visible.project}
                                    onCancel={this.handleCancel}
                                    initValue={record.value}
                                /> : null                    
                            }
                            {
                                record.key === "推荐信"
                                ?
                                <UserRecommendationModal                          
                                    visible={visible.recommendation}
                                    onCancel={this.handleCancel}
                                    initValue={record.value}
                                /> : null                    
                            }
                            {
                                record.key === "TOEFL" || record.key === "IELTS"
                                ?
                                <UserLanguageModal                          
                                    visible={visible.language}
                                    onCancel={this.handleCancel}
                                    initValue={record.value}
                                    testType={record.key}
                                /> : null                    
                            }
                            {
                                record.key === "GRE"
                                ?
                                <UserGreModal                          
                                    visible={visible.gre}
                                    onCancel={this.handleCancel}
                                    initValue={record.value}
                                 
                                /> : null                    
                            }
                       
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