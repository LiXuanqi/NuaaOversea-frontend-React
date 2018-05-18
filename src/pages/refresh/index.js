import React from 'react';
import Redirect from 'umi/redirect';
// import WrappedEvaluationForm from '../../components/EvaluationForm';
import withRouter from 'umi/withRouter';

function RefreshPage({ history }) {
    const redirect_url = history.location.query.redirect_url;
    return (
        <Redirect to={redirect_url} />
    );
}

export default withRouter(RefreshPage);
