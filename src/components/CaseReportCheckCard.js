import React from 'react';
import { Table, Tag } from 'antd';
import { recommendationIdToName, researchIdToName, projectIdToName, countryIdToName } from '../utils/dataFromServer';
const { Column } = Table;

const CaseReportCheckCard = ({userInfoFields, casesFields}) => {

    const userData = [{
        key: '学院',
        value: userInfoFields.college,
    }, {
        key: '专业',
        value: userInfoFields.major,
    }, {
        key: 'GPA',
        value: userInfoFields.gpa,
    }, {
        key: userInfoFields.language_type,
        value: userInfoFields.language_reading+'+'+userInfoFields.language_listening+'+'+userInfoFields.language_speaking+'+'+userInfoFields.language_writing,
    }, {
        key: 'GRE',
        value: userInfoFields.gre_verbal+'+'+userInfoFields.gre_quantitative+'+'+userInfoFields.gre_writing,
    }, {
        key: '研究情况',
        value: researchIdToName(userInfoFields.research_id),
    }, {
        key: '项目情况',
        value: projectIdToName(userInfoFields.project_id),
    }, {
        key: '推荐信',
        value: recommendationIdToName(userInfoFields.recommendation_id),
    }]

   
    const caseData = casesFields.cases.map((item, index) => {
        return {
            key: index,
            university: item.university,
            country: countryIdToName(item.country_id),
            major: item.major,
            term: item.term,
            is_transfer: item.is_transfer ? <Tag>YES</Tag> : <Tag>NO</Tag>,
            degree: item.degree,
            result: <div>
                {item.result === 'ad' ? <Tag color="green">ad</Tag> : null}
                {item.result === 'offer' ? <Tag color="green">offer</Tag> : null}
                {item.result === 'rej' ? <Tag color="red">rej</Tag> : null}                
            </div>
        }
    });
    console.log(caseData);
    return (
        <div>    
            <div style={{marginBottom: '24px'}}>
                <h2>录取汇报</h2>                              
                <Table dataSource={caseData} pagination={false}>
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
                        title="学位"
                        dataIndex="degree"
                    />  
                    <Column
                        title="学期"
                        dataIndex="term"
                    />  
                    <Column
                        title="国家"
                        dataIndex="country"
                    />  
                    <Column
                        title="转专业"
                        dataIndex="is_transfer"
                    /> 
                </Table>
            </div>
            <div style={{marginBottom: '24px'}}>
            <h2>三维信息</h2>
            <Table dataSource={userData} pagination={false}>
                <Column
                    dataIndex="key"
                />
                <Column
                    dataIndex="value"
                />  
            </Table>
            </div>
        </div>
    );
};

CaseReportCheckCard.propTypes = {
};

export default CaseReportCheckCard;
