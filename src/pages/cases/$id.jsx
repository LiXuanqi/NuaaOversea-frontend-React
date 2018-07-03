import React from 'react';
import { connect } from 'dva';
import styles from './$id.css';
import { Divider, Rate } from 'antd';
import pathToRegexp from 'path-to-regexp';
import ResultCard from '../../components/ResultCard';
import CaseCard from '../../components/CaseCard';
class Case extends React.Component {
  componentDidMount() {
    const pathname = this.props.history.location.pathname;
    const match = pathToRegexp('/cases/:caseId').exec(pathname);
    if (match) {
      const applicationId = match[1];
      this.props.fetchCase(applicationId);
    }
  }
  renderResultCard(key, university, major, result) {
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
    const caseData = this.props.caseData;
    return (
      this.props.loading ?
      <h1>载入中</h1>
      : <div className={styles.content}>
          <CaseCard
            id={caseData.id}
            result={caseData.result}
            country={caseData.country}
            university={caseData.university}
            major={caseData.major}
            degree={caseData.degree}
            term={caseData.term}
            gpa={caseData.gpa}
            language_type={caseData.language_type}
            language_reading={caseData.language_reading}
            language_listening={caseData.language_listening}
            language_speaking={caseData.language_speaking}
            language_writing={caseData.language_writing}
            gre_verbal={caseData.gre_verbal}
            gre_quantitative={caseData.gre_quantitative}
            gre_writing={caseData.gre_writing}
            tags={caseData.tags}
          />

          <div className={styles.rateContainer}>
            <span className={styles.rateText}>研究经历</span>
            <Rate disabled defaultValue={caseData['research']['value']} />
            <span>{caseData['research']['name']}</span>
          </div>

          <div className={styles.rateContainer}>
            <span className={styles.rateText}>实习经历</span>
            <Rate disabled defaultValue={caseData['project']['value']} />
            <span>{caseData['project']['name']}</span>
          </div>

          <div className={styles.rateContainer}>
            <span className={styles.rateText}>推荐信</span>
            <Rate disabled defaultValue={caseData['recommendation']['value']} />
            <span>{caseData['recommendation']['name']}</span>
          </div>


          <Divider />
          <h2>其它录取结果</h2>
          {/* {this.renderResultCard("CMU", "MS in Marketing", "rej")} */}

          {
            this.props.relatedCases.map((item, index) => {

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
    loading: state.loading.global,
    caseData: state.case.data,
    relatedCases: state.case.relatedCases,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCase: (applicationId) => {
      dispatch({
        type: 'case/fetchCase',
        applicationId: applicationId
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Case);