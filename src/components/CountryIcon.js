import React from 'react';
import canadaIcon from '../assets/countries/canada.png';
import germanyIcon from '../assets/countries/germany.png';
import singaporeIcon from '../assets/countries/singapore.png';
import japanIcon from '../assets/countries/japan.png';
import franceIcon from '../assets/countries/france.png';
import australiaIcon from '../assets/countries/australia.png';
import unitedStatesIcon from '../assets/countries/united-states.png';
import unitedKindomIcon from '../assets/countries/united-kingdom.png';
const CountryIcon = ({ country }) => {
    return (
        <div>
            {country === "加拿大" ? <img alt={country} src={canadaIcon} width="32px" height="32px"/> : null}
            {country === "德国" ? <img alt={country} src={germanyIcon} width="32px" height="32px"/> : null}
            {country === "新加坡" ? <img alt={country} src={singaporeIcon} width="32px" height="32px"/> : null}
            {country === "日本" ? <img alt={country} src={japanIcon} width="32px" height="32px"/> : null}
            {country === "法国" ? <img alt={country} src={franceIcon} width="32px" height="32px"/> : null}
            {country === "澳大利亚" ? <img alt={country} src={australiaIcon} width="32px" height="32px"/> : null}
            {country === "美国" ? <img alt={country} src={unitedStatesIcon} width="32px" height="32px"/> : null}
            {country === "英国" ? <img alt={country} src={unitedKindomIcon} width="32px" height="32px"/> : null}
        </div>
    );
};

CountryIcon.propTypes = {
};

export default CountryIcon;
