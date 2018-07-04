import React from 'react';
import UserStatusModel from './UserStatusModel';
import { Table, Form, Radio, Input, InputNumber } from 'antd';
import { researchNameToId, getResearches, getProjects, projectNameToId, getRecommendations, recommendationNameToId } from 'Utils/dataFromServer'

const FormItem = Form.Item;
const { Column } = Table;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

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
      value: rawData.language_reading + '+' + rawData.language_listening + '+' + rawData.language_speaking + '+' + rawData.language_writing,
    }, {
      key: 'GRE',
      value: rawData.gre_verbal + '+' + rawData.gre_quantitative + '+' + rawData.gre_writing,
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
    let newVisibel = {};
    switch(e.key) {
      case "TOEFL":
        newVisibel = { language: true }
        break;
      case "IELTS":
        newVisibel = { language: true }
        break;
      case "GRE":
        newVisibel = { gre: true }
        break;
      case "学院":
        newVisibel = { college: true }
        break;
      case "专业":
        newVisibel = { major: true }
        break;
      case "GPA":
        newVisibel = { gpa: true }
        break;
      case "研究情况":
        newVisibel = { research: true }
        break;
      case "项目情况":
        newVisibel = { project: true }
        break;
      case "推荐信":
        newVisibel = { recommendation: true }
        break;
      default: null;    
    }
    this.setState({
      visible: {
        ...this.state.visible,
        ...newVisibel
      }
    });
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
                record.key === "学院" ?
                  <UserStatusModel
                    visible={visible.college}
                    onCancel={this.handleCancel}
                    title="修改学院"
                  >
                    {
                      (form) =>
                        (<Form layout="vertical">
                          <FormItem label="学院">
                            {form.getFieldDecorator("college", {
                              initialValue: record.value,
                              rules: [{ required: true, message: "请输入你的学院" }],
                            })(
                              <Input />
                            )}
                          </FormItem>
                        </Form>)
                    }
                  </UserStatusModel>
                  : null
              }
              {
                record.key === "专业" ?
                  <UserStatusModel
                    visible={visible.major}
                    onCancel={this.handleCancel}
                    title="专业"
                  >
                    {
                      (form) =>
                        (<Form layout="vertical">
                          <FormItem label="专业">
                            {form.getFieldDecorator("major", {
                              initialValue: record.value,
                              rules: [{ required: true, message: "请输入你的专业" }],
                            })(
                              <Input />
                            )}
                          </FormItem>
                        </Form>)
                    }
                  </UserStatusModel>
                  : null
              }
              {
                record.key === "GPA" ?
                  <UserStatusModel
                    visible={visible.gpa}
                    onCancel={this.handleCancel}
                    title="修改GPA"
                  >
                    {
                      (form) =>
                        (<Form layout="vertical">
                          <FormItem label="GPA">
                            {form.getFieldDecorator("gpa", {
                              initialValue: record.value,
                              rules: [{ required: true, message: "请输入你的GPA" }],
                            })(
                              <Input />
                            )}
                          </FormItem>
                        </Form>)
                    }
                  </UserStatusModel>
                  : null
              }
              {
                record.key === "研究情况" ?
                  <UserStatusModel
                    visible={visible.research}
                    onCancel={this.handleCancel}
                    title="修改研究情况"
                  >
                    {
                      (form) =>
                        ( <Form layout="vertical">
                            <FormItem label="研究情况">
                              {form.getFieldDecorator("research_id", {
                                initialValue: researchNameToId(record.value),
                                rules: [{ required: true, message: "请输入你的研究情况" }],
                              })(
                                <RadioGroup>
                                  {
                                    getResearches().map((item) => {
                                      return (
                                        <Radio key={item.id} style={radioStyle} value={item.id}>{item.name}</Radio>
                                      );
                                    })
                                  }
                                </RadioGroup>
                              )}
                            </FormItem>
                          </Form>)
                    }
                  </UserStatusModel>
                  : null
              }
              {
                record.key === "项目情况" ?
                  <UserStatusModel
                    visible={visible.project}
                    onCancel={this.handleCancel}
                    title="修改项目情况"
                  >
                    {
                      (form) =>
                        ( <Form layout="vertical">
                            <FormItem label="项目情况">
                            {form.getFieldDecorator("project_id", {
                                initialValue: projectNameToId(record.value),
                                rules: [{ required: true, message: "请输入你的项目经历" }],
                            })(
                                <RadioGroup>
                                {
                                    getProjects().map((item) => {
                                        return(
                                            <Radio key={item.id} style={radioStyle} value={item.id}>{item.name}</Radio>
                                        );
                                    })
                                }   
                                </RadioGroup>
                            )}
                            </FormItem>                
                          </Form>)
                    }
                  </UserStatusModel>
                  : null
              }
              {
                record.key === "推荐信" ?
                  <UserStatusModel
                    visible={visible.recommendation}
                    onCancel={this.handleCancel}
                    title="修改推荐信情况"
                  >
                    {
                      (form) =>
                        ( <Form layout="vertical">
                            <FormItem label="推荐信">
                            {form.getFieldDecorator("recommendation_id", {
                                initialValue: recommendationNameToId(record.value),
                                rules: [{ required: true, message: "请输入你的推荐信情况" }],
                            })(
                                <RadioGroup>
                                {
                                  getRecommendations().map((item) => {
                                      return(
                                          <Radio key={item.id} style={radioStyle} value={item.id}>{item.name}</Radio>
                                      );
                                  })
                                }   
                                </RadioGroup>
                            )}
                            </FormItem>                
                          </Form>)
                    }
                  </UserStatusModel>
                  : null
              }
              {
                record.key === "TOEFL" || record.key === "IELTS" ?
                  <UserStatusModel
                    visible={visible.language}
                    onCancel={this.handleCancel}
                    title="修改语言考试分数"
                  >
                    {
                      (form) => {
                        const initLanguage = record.value.split('+');
                        const initReading = parseInt(initLanguage[0], 10);
                        const initListening = parseInt(initLanguage[1], 10);
                        const initSpeaking = parseInt(initLanguage[2], 10);
                        const initWriting = parseInt(initLanguage[3], 10);
                        return  ( <Form layout="vertical">
                                    <FormItem
                                    label="语言考试类型"
                                    >
                                    {form.getFieldDecorator('language_type', {
                                        initialValue: record.key,
                                        rules: [{
                                            required: true, message: '请选择你的语言考试类型!',
                                        }],
                                    })(
                                        <RadioGroup onChange={() => {
                                          form.setFieldsValue({
                                            language_reading: "",
                                            language_listening: "",
                                            language_speaking: "",
                                            language_writing: ""
                                          })
                                        }}>
                                        <RadioButton value="TOEFL">TOEFL</RadioButton>
                                        <RadioButton value="IELTS">IELTS</RadioButton>
                                        </RadioGroup>
                                    )}
                                    </FormItem>
                
                
                                    {form.getFieldValue('language_type') === 'IELTS' ?
                                        <div>
                                            <FormItem
                                            label="阅读"
                                            >
                                            {form.getFieldDecorator('language_reading', {
                                                initialValue: initReading,
                                                rules: [{ required: true, message: "请输入你的阅读成绩" }], 
                                            })(
                                                <InputNumber min={0} max={9} />
                                            )}
                                            </FormItem>
                                            <FormItem
                                            label="听力"
                                            >
                                            {form.getFieldDecorator('language_listening', {
                                                initialValue: initListening,
                                                rules: [{ required: true, message: "请输入你的听力成绩" }], 
                                            })(
                                                <InputNumber min={0} max={9} />
                                            )}
                                            </FormItem>
                                            <FormItem
                                            label="口语"
                                            >
                                            {form.getFieldDecorator('language_speaking', {
                                                initialValue: initSpeaking,
                                                rules: [{ required: true, message: "请输入你的口语成绩" }], 
                                            })(
                                                <InputNumber min={0} max={9} />
                                            )}
                                            </FormItem>
                                            <FormItem
                                            label="写作"
                                            >
                                            {form.getFieldDecorator('language_writing', {
                                                initialValue: initWriting,
                                                rules: [{ required: true, message: "请输入你的写作成绩" }], 
                                            })(
                                                <InputNumber min={0} max={9} />
                                            )}
                                            </FormItem>
                                        </div>
                                        : 
                                        <div>
                                            <FormItem
                                            label="阅读"
                                            >
                                            {form.getFieldDecorator('language_reading', {
                                                initialValue: initReading,
                                                rules: [{ required: true, message: "请输入你的阅读成绩" }], 
                                            })(
                                                <InputNumber min={0} max={30} />
                                            )}
                                            </FormItem>
                                            <FormItem
                                            label="听力"
                                            >
                                            {form.getFieldDecorator('language_listening', {
                                                initialValue: initListening,
                                                rules: [{ required: true, message: "请输入你的听力成绩" }], 
                                            })(
                                                <InputNumber min={0} max={30} />
                                            )}
                                            </FormItem>
                                            <FormItem
                                            label="口语"
                                            >
                                            {form.getFieldDecorator('language_speaking', {
                                                initialValue: initSpeaking,
                                                rules: [{ required: true, message: "请输入你的口语成绩" }], 
                                            })(
                                                <InputNumber min={0} max={30} />
                                            )}
                                            </FormItem>
                                            <FormItem
                                            label="写作"
                                            >
                                            {form.getFieldDecorator('language_writing', {
                                                initialValue: initWriting,
                                                rules: [{ required: true, message: "请输入你的写作成绩" }], 
                                            })(
                                                <InputNumber min={0} max={30} />
                                            )}
                                            </FormItem>
                                        </div>
                                    }            
                                </Form>)
                      }
                       
                    }
                  </UserStatusModel>
                  : null
              }
              {
                record.key === "GRE" ?
                  <UserStatusModel
                    visible={visible.gre}
                    onCancel={this.handleCancel}
                    title="修改GRE"
                  >
                    {
                      (form) => {
                        const initGre = record.value.split('+');
                        const initVerbal = parseInt(initGre[0], 10);
                        const initQuantitative = parseInt(initGre[1], 10);
                        const initWriting = parseInt(initGre[2], 10);
                        return  ( <Form layout="vertical">
                                    <FormItem label="GRE Verbal">
                                      {form.getFieldDecorator('gre_verbal', {
                                        initialValue: initVerbal,
                                        rules: [{ required: true, message: "请输入你的GRE词汇成绩" }], 
                                      })(
                                        <InputNumber min={130} max={170} />
                                      )}
                                    </FormItem>
                                    <FormItem label="GRE Quantitative">
                                      {form.getFieldDecorator('gre_quantitative', {
                                        initialValue: initQuantitative,
                                        rules: [{ required: true, message: "请输入你的GRE数学成绩" }], 
                                      })(
                                        <InputNumber min={130} max={170} />
                                      )}
                                    </FormItem>
                                    <FormItem label="GRE Writing">
                                      {form.getFieldDecorator('gre_writing', {
                                        initialValue: initWriting,
                                        rules: [{ required: true, message: "请输入你的GRE写作成绩" }], 
                                      })(
                                        <InputNumber min={2.0} max={5.0} />
                                      )}
                                    </FormItem>                           
                                  </Form>);
                      }
                    }
                  </UserStatusModel>
                  : null
              }
            </span>
          )}
        />
      </Table>
    );
  }
}

export default UserInfoStatusTabel;