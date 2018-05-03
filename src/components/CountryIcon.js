import React from 'react';

const CountryIcon = ({ country }) => {
    return (
        <div>
            {country === "加拿大" ? <img alt={country} src="/public/countries/canada.png" width="32px" height="32px"/> : null}
            {country === "德国" ? <img alt={country} src="/public/countries/germany.png" width="32px" height="32px"/> : null}
            {country === "新加坡" ? <img alt={country} src="/public/countries/singapore.png" width="32px" height="32px"/> : null}
            {country === "日本" ? <img alt={country} src="/public/countries/japan.png" width="32px" height="32px"/> : null}
            {country === "法国" ? <img alt={country} src="/public/countries/france.png" width="32px" height="32px"/> : null}
            {country === "澳大利亚" ? <img alt={country} src="/public/countries/austrialia.png" width="32px" height="32px"/> : null}
            {country === "美国" ? <img alt={country} src="/public/countries/united-states.png" width="32px" height="32px"/> : null}
            {country === "英国" ? <img alt={country} src="/public/countries/united-kindom.png" width="32px" height="32px"/> : null}
        </div>
    );
};

CountryIcon.propTypes = {
};

export default CountryIcon;
