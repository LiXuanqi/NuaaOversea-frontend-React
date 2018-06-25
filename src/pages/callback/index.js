import React, { Component } from 'react';
// import loading from './loading.svg';
import auth from '../../services/auth';

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

class Callback extends Component {
  render() {
    handleAuthentication(this.props);
    return (
      <div>
        <h1>loading</h1>
        {/* <img src={loading} alt="loading"/> */}
      </div>
    );
  }
}

export default Callback;