import React, { Component } from 'react';
import { connect } from 'dva';
import auth from '../../services/auth';

class AboutPage extends Component {
  render() {
    const { profile } = this.state;
    return (
      <div>
        <h1>{profile.id}</h1>
      </div>
    );
  }
}

AboutPage.propTypes = {
};

export default connect()(AboutPage);
