import React from 'react';
import { Table, Divider, Popconfirm, Tag } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import UserInfoCaseUpdateModal from 'Components/UserInfoCaseUpdateModal';

const { Column } = Table;

class UserInfoCasesTabel extends React.Component {
  state = {
    data: [],
    choosedCase: -1
  }

  formatData = (rawData) => {
    const formatedData = rawData.map((item, index) => {
      // deal with init data.
      const term = [item.term.substring(0, 4), item.term.substring(4)]
      let is_transfer = false;
      item.tags.forEach((item) => {
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
              item.tags.map((tag) => {
                return <Tag key={tag.id} color="blue">{tag.name}</Tag>
              })
            }
          </div>
      }
      return data;
    })
    return formatedData;
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
  deleteCase(applicationId) {
    this.props.dispatch({
      type: 'user/deleteCase',
      applicationId
    });
  }

  render() {
    const { initData } = this.props;
    const formatedData = this.formatData(initData);
    return (
      <Table
        dataSource={formatedData}
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