import React from 'react';
import { connect } from 'dva';
import styles from './index.css'
import fetch from 'dva/fetch';
import { Steps, Icon, Button, Divider} from 'antd';
import WrappedCaseReportForm from '../../components/CaseReportForm';
import { WrappedUserComplementReportForm } from '../../components/UserReportForm';
import CaseReportCheckCard from '../../components/CaseReportCheckCard';
import BillboardCard from '../../components/BillboardCard';

import { loginUser } from '../../utils/user';
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
            research: {
                value: undefined
            },
            project: {
                value: undefined
            },
            recommendation: {
                value: undefined
            },
            email: {
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
                value: {},
            }],
        },
        };
    }

    componentDidMount() {

        const user_info = loginUser();
        const applicant_id = user_info.applicant_id;
        console.log(user_info);
        if (applicant_id) {
            fetch('/oversea/api/applicants/' + applicant_id, {
                method: 'GET',
            })
            .then(function(response) {
                return response.json()
            }).then((json) => {
                console.log('parsed json', json)
                let newMajor = [json.college, json.major];
                const newUserInfoFields = {
                    major: {
                        value: newMajor
                    },
                    gpa: {
                       value: json.gpa
                    },
                    language_type: {
                        value: json.language_type
                    },
                    language_reading: {
                        value: json.language_type
                    },
                    language_listening: {
                        value: json.language_listening
                    },
                    language_speaking: {
                        value: json.language_speaking
                    },
                    language_writing: {
                        value: json.language_writing
                    },
                    gre_verbal: {
                        value: json.gre_verbal
                    },
                    gre_quantitative: {
                        value: json.gre_quantitative
                    },
                    gre_writing: {
                        value: json.gre_writing
                    },
                    research: {
                        value: json.research
                    },
                    project: {
                        value: json.project
                    },
                    recommendation: {
                        value: json.recommendation
                    },
                    email: {
                        value: json.email
                    },
                    agreement: {
                        value: true
                    }
                }
                this.setState({
                    userInfoFields: newUserInfoFields, 
                    current: 1
                });
                console.log(this.state);
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
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
                casesFields: { ...casesFields, ...changedFields},
            }));
        }


      }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    handleSubmit() {
        const user_info = loginUser();
        const userInfoFields = this.userFormData();
        const casesFields = this.casesFormData();
        // TODO: handle user information update.
        console.log(userInfoFields);
        
        casesFields.cases.forEach((item, index) => {
            console.log(item);

            fetch('/oversea/api/applications', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...item,
                    applicant_id: user_info.applicant_id
                })
            })
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                console.log('parsed json', json)
            }).catch(function(ex) {
                console.log('parsing failed', ex)
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
            research: userInfoFields.research.value ? userInfoFields.research.value : "",
            project: userInfoFields.project.value ? userInfoFields.project.value : "",
            recommendation: userInfoFields.recommendation.value ? userInfoFields.recommendation.value : "",
            email: userInfoFields.email.value ? userInfoFields.email.value : ""
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
                <div className={styles.container}>

                    <div className={styles.contentContainer}> 
                        
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
                                    <WrappedUserComplementReportForm {...userInfoFields} onChange={this.handleUserFormChange}/>
                                  
                                </div>
                                : null
                        }
                        {
                            current === 1 ? 
                                <div>
                                    <WrappedCaseReportForm {...casesFields} keys={this.state.casesFields.keys} onChange={this.handleCasesFormChange} />
                             
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
                                <Button type="primary" onClick={() => this.next()}>Next</Button>
                            }
                            {
                                this.state.current === 2
                                &&
                                <Button type="primary" onClick={() => this.handleSubmit()}>Done</Button>
                            }
                            {
                                this.state.current > 0
                                &&
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                Previous
                                </Button>
                            }
                        </div>
                      
                    
                    </div>        
                    <div className={styles.sidebarContainer}>
                        <BillboardCard />
                        <BillboardCard />
                    </div>
                </div>     
        );
    }
}

CaseReport.propTypes = {
    
};

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(CaseReport);