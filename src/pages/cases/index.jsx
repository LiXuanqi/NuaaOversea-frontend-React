import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import { Tag, Divider, Row, Col, Cascader, Slider, Switch } from 'antd';
import CaseCard from '../../components/CaseCard';
import UserInfoCard from '../../components/UserInfoCard';
import BillboardCard from '../../components/BillboardCard';
import CaseSearch from '../../components/CaseSearch';

import pic1 from '../../assets/pic-1.jpg';

import { tagsFromServer, countriesFromServer, degreesFromServer, resultsFromServer } from '../../utils/dataFromServer';

const CheckableTag = Tag.CheckableTag;

const gpaMarks = {
  1: '1.0',
  3: '3.0',
  5: {
    style: {
      color: '#f50',
    },
    label: <strong>5.0</strong>,
  },
};

const greMarks = {
  280: '280',
  320: '320',
  340: {
    style: {
      color: '#f50',
    },
    label: <strong>340</strong>,
  },
};

const toeflMarks = {
  60: '60',
  100: '100',
  120: {
    style: {
      color: '#f50',
    },
    label: <strong>120</strong>,
  },
};

const ieltsMarks = {
  0: '0',
  7: '7',
  9: {
    style: {
      color: '#f50',
    },
    label: <strong>9.0</strong>,
  },
};

const termOptions = [{
  value: '2017',
  label: '2017',
  children: [{
    value: 'spring',
    label: 'spring'
  }, {
    value: 'fall',
    label: 'fall'
  }],
}, {
  value: '2018',
  label: '2018',
  children: [{
    value: 'spring',
    label: 'spring'
  }, {
    value: 'fall',
    label: 'fall'
  }],
}];


class CaseList extends React.Component {
  state = {
    selectedFilter: {
      selectedTags: [],
      selectedDegree: '',
      selectedResult: '',
      selectedCountry: '',
      selectedTerm: [],
    },

    rangeFilter: {
      type: 'TOEFL',
      gpa: [],
      gre: [],
      language: [80, 110]
    },
    filterByRange: false,
    filterBySelected: false,

  };

  filterCasesBySelected = () => {
    this.setState({
      filterBySelected: true
    })
  }
  OnTermChange = (value) => {
    this.setState({
      selectedFilter: {
        ...this.state.selectedFilter,
        selectedTerm: value
      }
    }, () => {
      this.filterCasesBySelected();
    });

  }
  handleChange(tag, checked) {

    const { selectedTags } = this.state.selectedFilter;
    const nextSelectedTags = checked ?
      [...selectedTags, tag] :
      selectedTags.filter(t => t !== tag);

    this.setState({
      selectedFilter: {
        ...this.state.selectedFilter,
        selectedTags: nextSelectedTags
      }
    }, () => {
      this.filterCasesBySelected();
    });
  }

  handleDegreeChange(tag, checked) {
    if (checked) {
      this.setState({
        selectedFilter: {
          ...this.state.selectedFilter,
          selectedDegree: tag
        }
      }, () => {
        this.filterCasesBySelected();
      });
    } else {
      this.setState({
        selectedFilter: {
          ...this.state.selectedFilter,
          selectedDegree: ''
        }
      }, () => {
        this.filterCasesBySelected();
      });
    }
  }

  handleResultChange(tag, checked) {
    if (checked) {
      this.setState({
        selectedFilter: {
          ...this.state.selectedFilter,
          selectedResult: tag
        }
      }, () => {
        this.filterCasesBySelected();
      });
    } else {
      this.setState({
        selectedFilter: {
          ...this.state.selectedFilter,
          selectedResult: ''
        }
      }, () => {
        this.filterCasesBySelected();
      });
    }
  }

  handleCountryChange(tag, checked) {
    if (checked) {
      this.setState({
        selectedFilter: {
          ...this.state.selectedFilter,
          selectedCountry: tag
        }
      }, () => {
        this.filterCasesBySelected();
      });
    } else {
      this.setState({
        selectedFilter: {
          ...this.state.selectedFilter,
          selectedDegree: ''
        }
      }, () => {
        this.filterCasesBySelected();
      });
    }
  }
  onGpaSliderChange(value) {

    this.setState({
      rangeFilter: {
        ...this.state.rangeFilter,
        gpa: value
      }
    }, () => { this.filterByRange() })
  }
  onGreSliderChange(value) {

    this.setState({
      rangeFilter: {
        ...this.state.rangeFilter,
        gre: value
      }
    }, () => { this.filterByRange() })
  }
  onToeflSliderChange(value) {

    this.setState({
      rangeFilter: {
        ...this.state.rangeFilter,
        language: value
      }
    }, () => { this.filterByRange() })
  }
  filterByRange() {

    this.setState({
      filterByRange: true
    })
  }
  onFilterTypeSwitchChanged(value) {
    let filterType = '';
    let range = [];
    if (value === true) {
      filterType = 'TOEFL'
      range = [80, 110];
    } else {
      filterType = 'IELTS'
      range = [5, 8];
    }
    this.setState({
      rangeFilter: {
        ...this.state.rangeFilter,
        type: filterType,
        language: range
      }
    })
  }
  // render a single CaseCard.
  renderCaseCard(key, id, university, country, result, major, term, degree, gpa, language_type, language_reading, language_listening, language_speaking, language_writing, gre_verbal, gre_quantitative, gre_writing, tags) {
    return (
      <CaseCard
        key={key}
        id={id}
        result={result}
        university={university}
        country={country}
        major={major}
        degree={degree}
        term={term}
        gpa={gpa}
        language_type={language_type}
        language_reading={language_reading}
        language_listening={language_listening}
        language_speaking={language_speaking}
        language_writing={language_writing}
        gre_verbal={gre_verbal}
        gre_quantitative={gre_quantitative}
        gre_writing={gre_writing}
        tags={tags}
      />
    );
  }

  render() {
    const { selectedFilter, rangeFilter, filterByRange, filterBySelected } = this.state;
    const { selectedTags, selectedDegree, selectedCountry, selectedResult, selectedTerm } = selectedFilter;
    const checkRangeFilter = (item) => {
      const minGpa = rangeFilter.gpa[0];
      const maxGpa = rangeFilter.gpa[1];
      const minGre = rangeFilter.gre[0];
      const maxGre = rangeFilter.gre[1];
      const minLanguage = rangeFilter.language[0];
      const maxLanguage = rangeFilter.language[1];
      const greTotal = item.gre_quantitative + item.gre_verbal;
      const type = rangeFilter.type
      if (type === "TOEFL") {
        const toeflTotal = item.language_reading + item.language_listening + item.language_speaking + item.language_writing;
        return (item.gpa >= minGpa && item.gpa <= maxGpa) && (greTotal <= maxGre && greTotal >= minGre) && (toeflTotal <= maxLanguage && toeflTotal >= minLanguage);
      }
      if (type === "IELTS") {
        let ieltsMean = (item.language_reading + item.language_listening + item.language_speaking + item.language_writing) / 4;
        if (ieltsMean % 1 === 0.25 || ieltsMean % 1 === 0.75) {
          ieltsMean = ieltsMean + 0.25;
        }
        return (item.gpa >= minGpa && item.gpa <= maxGpa) && (greTotal <= maxGre && greTotal >= minGre) && (ieltsMean <= maxLanguage && ieltsMean >= minLanguage);
      }
    }
    const checkSelectedFilter = (item) => {
      let isTagFit = false;
      let isDegreeFit = false;
      let isCountryFit = false;
      let isTermFit = false;
      let isResultFit = false;
      // TAG
      if (selectedTags.length === 0) {
        isTagFit = true;
      }
      for (let i = 0; i < item.tags.length; i++) {
        for (let j = 0; j < selectedTags.length; j++) {
          if (item.tags[i].name === selectedTags[j]) {
            isTagFit = true;
          }
        }
      }
      // Degree
      if (selectedDegree === "" || selectedDegree === item.degree) {
        isDegreeFit = true;
      }
      // Country
      if (selectedCountry === "" || selectedCountry === item.country) {
        isCountryFit = true;
      }
      // Result
      if (selectedResult === "" || selectedResult === item.result) {
        isResultFit = true;
      }
      // Term
      if (selectedTerm.length !== 2) {
        isTermFit = true;
      } else {
        let date = selectedTerm[0] + selectedTerm[1];
        if (date === item.term) {
          isTermFit = true;
        }
      }

      return isTagFit && isDegreeFit && isCountryFit && isTermFit && isResultFit;
    }
    return (
      <div className={styles.container}>
        <Row gutter={32}>
          <Col xs={24} sm={18}>
            <div className={styles.contentContainer}>

              <div className={styles.picContainer}>
                <div className={styles.pic}>
                  <img src={pic1} alt="pic-1" width="100%" height="368px" />
                </div>
                <div className={styles.picTextContainer}>
                  <span className={styles.picTextTitle}>飞跃榜</span>
                  <span className={styles.picTextIntro}>申请录取汇报</span>
                </div>
              </div>
       
              <div className={styles.filterContainer}>
                <CaseSearch />
                <Divider />
                <div className={styles.tagFilterContainer}>
                  <div className={styles.searchSelectContainer}>
                    <div className={styles.searchSelect}>
                      <Cascader options={termOptions} onChange={(value) => { this.OnTermChange(value) }} placeholder="请选择学期" />
                    </div>
                  </div>
                  <div>
                    <h6 className={styles.tagSelectTitle}>攻读学位:</h6>
                    {degreesFromServer.map(tag => (
                      <CheckableTag
                        key={tag}
                        checked={selectedDegree === tag}
                        onChange={checked => this.handleDegreeChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                  </div>
                  <div>
                    <h6 className={styles.tagSelectTitle}>申请结果:</h6>
                    {resultsFromServer.map(tag => (
                      <CheckableTag
                        key={tag}
                        checked={selectedResult === tag}
                        onChange={checked => this.handleResultChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                  </div>
                  <div>
                    <h6 className={styles.tagSelectTitle}>特色筛选:</h6>
                    {tagsFromServer.map(tag => (
                      <CheckableTag
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={checked => this.handleChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                  </div>
                  <div>
                    <h6 className={styles.tagSelectTitle}>申请国家:</h6>
                    {countriesFromServer.map(tag => (
                      <CheckableTag
                        key={tag}
                        checked={selectedCountry === tag}
                        onChange={checked => this.handleCountryChange(tag, checked)}
                      >
                        {tag}
                      </CheckableTag>
                    ))}
                  </div>
                </div>
                <Divider />
                <Row gutter={16}>
                  <Col xs={4} sm={2}>
                    <h6 className={styles.tagSelectTitle}>GPA:</h6>
                  </Col>
                  <Col xs={20} sm={6}>
                    <Slider
                      marks={gpaMarks}
                      range
                      defaultValue={[1.5, 3.5]}
                      step={0.1}
                      min={1.0}
                      max={5.0}
                      onChange={value => this.onGpaSliderChange(value)}
                    />
                  </Col>

                  <Col xs={4} sm={2}>
                    <h6 className={styles.tagSelectTitle}>{rangeFilter.type}:</h6>
                    <Switch checkedChildren="托" unCheckedChildren="雅" defaultChecked onChange={(value) => { this.onFilterTypeSwitchChanged(value) }} />
                  </Col>
                  <Col xs={20} sm={6}>
                    {/* FIXME: defalutValue will error, when switch language type */}
                    <Slider
                      marks={rangeFilter.type === 'TOEFL' ? toeflMarks : ieltsMarks}
                      range
                      value={rangeFilter.language}
                      step={rangeFilter.type === 'TOEFL' ? 1 : 0.5}
                      min={rangeFilter.type === 'TOEFL' ? 60 : 0}
                      max={rangeFilter.type === 'TOEFL' ? 120 : 9}
                      onChange={value => this.onToeflSliderChange(value)}
                    />
                  </Col>

                  <Col xs={4} sm={2}>
                    <h6 className={styles.tagSelectTitle}>GRE:</h6>
                  </Col>
                  <Col xs={20} sm={6}>
                    <Slider
                      marks={greMarks}
                      range
                      defaultValue={[300, 330]}
                      step={1}
                      min={280}
                      max={340}
                      onChange={value => this.onGreSliderChange(value)}
                    />
                  </Col>

                </Row>


                <Divider />


                <div className={styles.cardListContainer}>

                  {
                    this.props.casesList.filter(filterByRange === false ? () => true : checkRangeFilter).filter(filterBySelected === false ? () => true : checkSelectedFilter).map((item, index) => {

                      return this.renderCaseCard(
                        index,
                        item.id,
                        item.university,
                        item.country,
                        item.result,
                        item.major,
                        item.term,
                        item.degree,
                        item.gpa,
                        item.language_type,
                        item.language_reading,
                        item.language_listening,
                        item.language_speaking,
                        item.language_writing,
                        item.gre_verbal,
                        item.gre_quantitative,
                        item.gre_writing,
                        item.tags
                      );
                    })
                  }

                </div>
              </div>
            </div>
          </Col>
          <Col xs={0} sm={6}>

            <UserInfoCard
              username={this.props.profile.username}
              role={this.props.profile.role}
            />
            <BillboardCard />
            <BillboardCard />

          </Col>
        </Row>
      </div>
    );
  }
}

CaseList.propTypes = {
};

function mapStateToProps(state) {
  return {
    casesList: state.casesList.list,
    profile: state.user.profile
  };
}

export default connect(mapStateToProps)(CaseList);