import React from 'react';
import { connect } from 'dva';
// import WrappedEvaluationForm from '../../components/EvaluationForm';

function EvaluationPage() {
    return (
       <div>
          {/* <WrappedEvaluationForm />  */}
       </div>
    );
}

EvaluationPage.propTypes = {
};

export default connect()(EvaluationPage);
