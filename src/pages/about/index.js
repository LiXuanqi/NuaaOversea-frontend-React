import React, { Component } from 'react';
import { connect } from 'dva';

class AboutPage extends Component {
   
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
