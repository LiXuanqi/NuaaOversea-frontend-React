import React, { Component } from 'react';
import { connect } from 'dva';
import auth from '../../services/auth';

class AboutPage extends Component {
    UNSAFE_componentWillMount() {
      this.setState({ profile: {} });
      const { userProfile, getProfile } = auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({ profile });
        });
      } else {
        this.setState({ profile: userProfile });
      }
    }
    render() {
      const { profile } = this.state;
      return (
        <div>
        <h1>{profile.name}</h1>
    </div>
      );
    }
  }

AboutPage.propTypes = {
};

export default connect()(AboutPage);
