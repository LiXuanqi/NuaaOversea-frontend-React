import React, { Component } from 'react';
// import loading from './loading.svg';
import auth from '../../services/auth';
import loading from '../../../src/assets/loading.svg';
import styles from './index.css';

const handleAuthentication = ({location}) => {
  const token = location['query']['token'];
  if (token) {
    auth.handleAuthentication(token);
  }
}

class Callback extends Component {
  render() {
    handleAuthentication(this.props);
    return (
      <div className={styles.loading}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;