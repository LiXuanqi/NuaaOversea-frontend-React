import React from 'react';
import { Table } from 'antd';
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
  formatData = (rawData) => {
    const formatedData = [{
      key: '学院',
      value: rawData.college,
    }, {
      key: '专业',
      value: rawData.major,
    }, {
      key: 'GPA',
      value: rawData.gpa,
    }, {
      key: rawData.language_type,
      value: rawData.language_reading+'+'+rawData.language_listening+'+'+rawData.language_speaking+'+'+rawData.language_writing,
    }, {
      key: 'GRE',
      value: rawData.gre_verbal+'+'+rawData.gre_quantitative+'+'+rawData.gre_writing,
    }, {
      key: '研究情况',
      value: rawData.research,
    }, {
      key: '项目情况',
      value: rawData.project,
    }, {
      key: '推荐信',
      value: rawData.recommendation,
    }]   
    return formatedData; 
  }
  showEditModal = (e) => {
    if (e.key === "TOEFL" || e.key === "IELTS") {
      this.setState({
        visible: {
          ...this.state.visible,
          language: true
        }
      });
    }
    if (e.key === "GRE") {
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
      });
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
    const rawData = this.props.initData;
    const formatedData = this.formatData(rawData);
    console.log(rawData);
    return (
      <Table dataSource={formatedData} >
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

export default UserInfoStatusTabel;