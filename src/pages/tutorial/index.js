import React from 'react';
import { connect } from 'dva';
// import WrappedEvaluationForm from '../../components/EvaluationForm';

function TutorialPage() {
    return (
       <div>
          <h1>留学指南</h1>
       </div>
    );
}

TutorialPage.propTypes = {
};

export default connect()(TutorialPage);
