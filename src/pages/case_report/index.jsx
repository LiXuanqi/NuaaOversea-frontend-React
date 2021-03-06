import React from 'react';
import { connect } from 'dva';
import styles from './index.css'
import { Steps, Icon, Button, Divider, message, Row, Col } from 'antd';
import WrappedCaseReportForm from '../../components/CaseReportForm';
import { WrappedUserComplementReportForm } from '../../components/UserReportForm';
import CaseReportCheckCard from '../../components/CaseReportCheckCard';
import BillboardCard from '../../components/BillboardCard';
import { researchNameToId, recommendationNameToId, projectNameToId } from '../../utils/dataFromServer';
import router from 'umi/router';

const Step = Steps.Step;

class CaseReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      userInfoFields: {
        major: {
          value: undefined
        },
        gpa: {
          value: undefined
        },
        language_type: {
          value: undefined
        },
        language_reading: {
          value: undefined
        },
        language_listening: {
          value: undefined
        },
        language_speaking: {
          value: undefined
        },
        language_writing: {
          value: undefined
        },
        gre_verbal: {
          value: undefined
        },
        gre_quantitative: {
          value: undefined
        },
        gre_writing: {
          value: undefined
        },
        research_id: {
          value: undefined
        },
        project_id: {
          value: undefined
        },
        recommendation_id: {
          value: undefined
        },
        agreement: {
          value: undefined
        }
      },
      casesFields: {
        keys: {
          value: [],
        },
        cases: [{
          value: undefined,
        }],
      },
    };
  }

  async UNSAFE_componentWillMount() {
    const {userDetail, applicantId } = this.props;

    if (applicantId) {
      const data = userDetail;
      let newMajor = [data.college, data.major];
      const newUserInfoFields = {
        major: {
          value: newMajor
        },
        gpa: {
          value: data.gpa
        },
        language_type: {
          value: data.language_type
        },
        language_reading: {
          value: data.language_reading
        },
        language_listening: {
          value: data.language_listening
        },
        language_speaking: {
          value: data.language_speaking
        },
        language_writing: {
          value: data.language_writing
        },
        gre_verbal: {
          value: data.gre_verbal
        },
        gre_quantitative: {
          value: data.gre_quantitative
        },
        gre_writing: {
          value: data.gre_writing
        },
        research_id: {
          value: researchNameToId(data.research)
        },
        project_id: {
          value: projectNameToId(data.project)
        },
        recommendation_id: {
          value: recommendationNameToId(data.recommendation)
        },
        agreement: {
          value: true
        }
      }
      this.setState({
        userInfoFields: newUserInfoFields,
        current: 1
      });
    }
  }

  handleUserFormChange = (changedFields) => {
    this.setState(({ userInfoFields }) => ({
      userInfoFields: { ...userInfoFields, ...changedFields },
    }));
  }

  handleCasesFormChange = (changedFields) => {
    // this is a wordaround, notice just the data that name index equal to value is valid.
    // it will happen when you delete the form field, the data will not be deleted meanwhile.
    // validate it before submit form.

    if (changedFields.cases !== undefined) {
      changedFields.cases.map((key, index) => {

        let cases = [...this.state.casesFields.cases];
        cases[index] = key;
        this.setState(({ casesFields }) => ({
          casesFields: {
            ...casesFields,
            cases
          }
        }));
        return null;
      });
    } else {
      this.setState(({ casesFields }) => ({
        casesFields: { ...casesFields, ...changedFields },
      }));
    }


  }
  // TRY
  onUserRef = (ref) => {
    this.userForm = ref;
  }

  onCaseRef = (ref) => {
    this.caseForm = ref;
  }

  handleNextClicked() {
    const current = this.state.current;
    if (current === 0) {
      this.userForm.check();
    }
    if (current === 1) {
      this.caseForm.check('next');
    }
  }

  handlePrevClicked() {
    const current = this.state.current;
    if (current === 1) {
      this.caseForm.check('prev');
    }
    if (current === 2) {
      this.prevPage();
    }
  }

  nextPage = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prevPage = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleSubmit() {
    const userInfoFields = this.userFormData();
    const casesFields = this.casesFormData();
    // TODO: make sure this executed before post cases.
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'user/updateOrPostDetail',
        formData: userInfoFields,
        resolve,
        reject
      })
    })
    .then(() => {
      new Promise((resolve, reject) => {
        this.props.dispatch({
          type: 'user/postCases',
          cases: casesFields.cases,
          resolve,
          reject
        });
      })
      .then(() => {
        router.push('/profile');
        message.success('添加成功');
      })
    })

    
  }

  userFormData = () => {
    const userInfoFields = this.state.userInfoFields;
    let data = {
      college: userInfoFields.major.value ? userInfoFields.major.value[0] : "",
      major: userInfoFields.major.value ? userInfoFields.major.value[1] : "",
      gpa: userInfoFields.gpa.value ? userInfoFields.gpa.value : "",
      language_type: userInfoFields.language_type.value ? userInfoFields.language_type.value : "",
      language_reading: userInfoFields.language_reading.value ? userInfoFields.language_reading.value : "",
      language_listening: userInfoFields.language_listening.value ? userInfoFields.language_listening.value : "",
      language_speaking: userInfoFields.language_speaking.value ? userInfoFields.language_speaking.value : "",
      language_writing: userInfoFields.language_writing.value ? userInfoFields.language_writing.value : "",
      gre_verbal: userInfoFields.gre_verbal.value ? userInfoFields.gre_verbal.value : "",
      gre_quantitative: userInfoFields.gre_quantitative.value ? userInfoFields.gre_quantitative.value : "",
      gre_writing: userInfoFields.gre_writing.value ? userInfoFields.gre_writing.value : "",
      research_id: userInfoFields.research_id.value ? userInfoFields.research_id.value : "",
      project_id: userInfoFields.project_id.value ? userInfoFields.project_id.value : "",
      recommendation_id: userInfoFields.recommendation_id.value ? userInfoFields.recommendation_id.value : ""
    }
    return data;
  }

  casesFormData = () => {
    const casesFields = this.state.casesFields;
    const keys = casesFields.keys.value;
    let data = {
      cases: []
    }
    for (let i in keys) {
      const index = keys[i];
      let singleCase = casesFields.cases[index];
      data.cases.push(singleCase.value);
    }
    return data;
  }

  render() {
    const { current } = this.state;
    const casesFields = this.state.casesFields;
    const userInfoFields = this.state.userInfoFields;
    return (
      <Row gutter={32} className={styles.container}>
        <Col xs={24} sm={18} className={styles.contentContainer}>

          {
            current === 0 ?
              <Steps>
                <Step status="process" title="三维汇报" icon={<Icon type="loading" />} />
                <Step status="wait" title="录取结果汇报" icon={<Icon type="solution" />} />
                <Step status="wait" title="信息确认" icon={<Icon type="check-circle-o" />} />
                <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
              </Steps>
              : null
          }

          {
            current === 1 ?
              <Steps>
                <Step status="finish" title="三维汇报" icon={<Icon type="user" />} />
                <Step status="process" title="录取结果汇报" icon={<Icon type="loading" />} />
                <Step status="wait" title="信息确认" icon={<Icon type="check-circle-o" />} />
                <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
              </Steps>
              : null
          }

          {
            current === 2 ?
              <Steps>
                <Step status="finish" title="三维汇报" icon={<Icon type="user" />} />
                <Step status="finish" title="录取结果汇报" icon={<Icon type="solution" />} />
                <Step status="process" title="信息确认" icon={<Icon type="loading" />} />
                <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
              </Steps>
              : null
          }

          <Divider />
          {/* <div className="steps-content">{steps[this.state.current].content}</div> */}
          {
            current === 0 ?
              <div>
                <WrappedUserComplementReportForm
                  applicantId={this.props.applicantId}
                  {...userInfoFields}
                  onChange={this.handleUserFormChange}
                  onRef={this.onUserRef}
                  nextPage={this.nextPage}
                />

              </div>
              : null
          }
          {
            current === 1 ?
              <div>
                <WrappedCaseReportForm {...casesFields} keys={this.state.casesFields.keys} onChange={this.handleCasesFormChange} onRef={this.onCaseRef} nextPage={this.nextPage} prevPage={this.prevPage} />

              </div>
              : null
          }
          {
            current === 2 ?
              <div>
                <h1>信息确认</h1>
                <CaseReportCheckCard
                  userInfoFields={this.userFormData()}
                  casesFields={this.casesFormData()}
                />
              </div>
              : null
          }

          <div className="steps-action">
            {
              this.state.current < 2
              &&
              <Button type="primary" onClick={() => this.handleNextClicked()}>Next</Button>
            }
            {
              this.state.current === 2
              &&
              <Button type="primary" onClick={() => this.handleSubmit()}>Done</Button>
            }
            {
              this.state.current > 0
              &&
              <Button style={{ marginLeft: 8 }} onClick={() => this.handlePrevClicked()}>
                Previous
              </Button>
            }
          </div>

        </Col>
        <Col xs={0} sm={6} >
          <BillboardCard />
          <BillboardCard />
        </Col>
      </Row>
    );
  }
}

CaseReport.propTypes = {

};

function mapStateToProps(state) {
  return {
    applicantId: state.user.profile['applicant_id'],
    userDetail: state.user.detail
  };
}

export default connect(mapStateToProps)(CaseReport);