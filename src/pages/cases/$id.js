import React from 'react';
import { connect } from 'dva';
import styles from './$id.css';
import { Divider, Rate } from 'antd';

import ResultCard from '../../components/ResultCard';
import CaseCard from '../../components/CaseCard';
class Case extends React.Component {  
    renderResultCard(key, university, major, result){
        return (
            <ResultCard
                key={key}
                university={university}
                major={major}
                result={result}
            />
        );
    };    
    
    render() {
        const case_data = this.props.case_data;
        return (
            <div className={styles.content}>
                <CaseCard
                    id={case_data.id}
                    result={case_data.result}
                    country={case_data.country}
                    university={case_data.university}
                    major={case_data.major}
                    degree={case_data.degree}
                    term={case_data.term}
                    gpa={case_data.gpa}
                    language_type={case_data.language_type}
                    language_reading={case_data.language_reading}
                    language_listening={case_data.language_listening}
                    language_speaking={case_data.language_speaking}
                    language_writing={case_data.language_writing}
                    gre_verbal={case_data.gre_verbal}
                    gre_quantitative={case_data.gre_quantitative}
                    gre_writing={case_data.gre_writing}
                    tags={case_data.tags}
                />  

                <div className={styles.rateContainer}>
                    <span className={styles.rateText}>研究经历</span>
                    <Rate disabled defaultValue={case_data.research !== undefined ? case_data.research.value : null} />
                    <span>{case_data.research !== undefined ? case_data.research.name : null}</span>
                </div>

                <div className={styles.rateContainer}>
                    <span className={styles.rateText}>实习经历</span>
                    <Rate disabled defaultValue={case_data.project !== undefined ? case_data.project.value : null} />
                    <span>{case_data.research !== undefined ? case_data.project.name : null}</span>
                </div>

                <div className={styles.rateContainer}>
                    <span className={styles.rateText}>推荐信</span>
                    <Rate disabled defaultValue={case_data.recommendation !== undefined ? case_data.recommendation.value : null} />
                    <span>{case_data.research !== undefined ? case_data.recommendation.name : null}</span>
                </div>

      
                <Divider />
                <h2>其它录取结果</h2>
                {/* {this.renderResultCard("CMU", "MS in Marketing", "rej")} */}

                {
                    this.props.related_cases_list.map((item, index)=>{

                        return this.renderResultCard(
                            index,
                            item.university,
                            item.major,
                            item.result,
                        );
                    })
                }
            </div>
        );
    }
}

Case.propTypes = {
};

function mapStateToProps(state) {
    return {
        case_data : state.cases.case_data,
        related_cases_list: state.cases.related_cases_list,
    };
}

export default connect(mapStateToProps)(Case);