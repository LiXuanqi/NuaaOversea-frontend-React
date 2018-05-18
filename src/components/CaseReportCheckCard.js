import React from 'react';
import { Table } from 'antd';
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
        value: userInfoFields.research,
    }, {
        key: '项目情况',
        value: userInfoFields.project,
    }, {
        key: '推荐信',
        value: userInfoFields.recommendation,
    }]
    
    const { cases : caseData } = casesFields;
      
    return (
        <div>                                  
            <Table dataSource={caseData}>
                <Column
                    title="学校"
                    dataIndex="university"
                />
                <Column
                    title="专业"
                    dataIndex="major"
                />  
                <Column
                    title="国家"
                    dataIndex="country_id"
                />  
                <Column
                    title="学期"
                    dataIndex="term"
                />  
                <Column
                    title="学位"
                    dataIndex="degree"
                />  
                <Column
                    title="转专业"
                    dataIndex="is_transfer"
                />       
            </Table>

            <Table dataSource={userData}>
                <Column
                    dataIndex="key"
                />
                <Column
                    dataIndex="value"
                />  
            </Table>
        </div>
    );
};

CaseReportCheckCard.propTypes = {
};

export default CaseReportCheckCard;
