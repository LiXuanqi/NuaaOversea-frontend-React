import React from 'react';
import { connect } from 'dva';


const AboutPage = () => {
    return (
        <div>
            <h1>关于我们</h1>
        </div>
    );
}

AboutPage.propTypes = {
};

export default connect()(AboutPage);
