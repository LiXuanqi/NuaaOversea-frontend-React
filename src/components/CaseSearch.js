// 127.0.0.1:5000/search/applications?q=university:CM+major:CS+term:2018
import React from 'react';
import { Input } from 'antd';
import { connect } from 'dva'
import withRouter from 'umi/withRouter';
import router from 'umi/router';
const Search = Input.Search;

const CaseSearch = ({ dispatch, history }) => {
    const handleSearch = (str) => {
        console.log(history);
        if (history.location.pathname !== "/cases") {
            router.push('/cases');
        }
        let lists = str.split(' ');
        let topic = "";
        for (let i = 0; i < lists.length; i++) {
            topic = topic + (i === 0 ? "" : "*") + lists[i];
        }
        dispatch({
            type: 'cases/fetchCasesByTopic',
            payload: topic
        })
   
    }
    return (
      <div>
            <Search
                placeholder="2018 CMU CS"
                onSearch={handleSearch}
                size="large"
                style={{ width: '100%', height: '100%' }}
            />
      </div>
    );
  };
  
  CaseSearch.propTypes = {
  };
  
  export default connect()(withRouter(CaseSearch));