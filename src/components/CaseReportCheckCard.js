import React from 'react';

const CaseReportCheckCard = ({userInfoFields, casesFields}) => {
    return (
        <div>                                  
            <pre className="language-bash">
                {JSON.stringify(userInfoFields, null, 2)}
            </pre>
            <pre className="language-bash">
                {JSON.stringify(casesFields, null, 2)}
            </pre>

        </div>
    );
};

CaseReportCheckCard.propTypes = {
};

export default CaseReportCheckCard;
