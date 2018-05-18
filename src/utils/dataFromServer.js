import request from './request';

// ---------------------------- TAG -----------------------------------

async function fetchTags() {
    const { data } = await request('/oversea/api/tags');
    sessionStorage.setItem('tags', JSON.stringify(data.tags));
    return data.tags;
}

const getTags = () => {
    let str = sessionStorage.getItem('tags');
    let tags = JSON.parse(str);
    if (tags === null) {
        tags = fetchTags();
    }
    return tags;
}

const getTagsList = () => {
    const tagsHashMap = getTags();
    const tags = tagsHashMap.map((item) => {
        return item.name;
    })
    return tags;
}
const tagsFromServer = getTagsList();

// ---------------------------- COUNTRY -----------------------------------

async function fetchCountries() {
    const { data } = await request('/oversea/api/countries');
    sessionStorage.setItem('countries', JSON.stringify(data.countries));
    return data.countries;
}

const getCountries = () => {
    let str = sessionStorage.getItem('countries');
    let countries = JSON.parse(str);
    if (countries === null) {
        countries = fetchCountries();
    }
    return countries;
}

const getCountriesList = () => {
    const countriesHashMap = getCountries();
    const countries = countriesHashMap.map((item) => {
        return item.name;
    })
    return countries;
}

const countryNameToId = (name) => {   
    const items = getCountries();
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === name) {
            return items[i].id;
        }                 
    }
}

const countryIdToName = (id) => {
    const items = getCountries();
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i].name;
        }
    }
}


const countriesFromServer = getCountriesList();

// ---------------------------- PROJECT -----------------------------------

async function fetchProjects() {
    const { data } = await request('/oversea/api/projects');
    sessionStorage.setItem('projects', JSON.stringify(data.projects));
    return data.projects;
}

const getProjects = () => {
    let str = sessionStorage.getItem('projects');
    let projects = JSON.parse(str);
    if (projects === null) {
        projects = fetchProjects();
    }
    return projects;
}

const getProjectsList = () => {
    const projectsHashMap = getProjects();
    const projects = projectsHashMap.map((item) => {
        return item.name;
    })
    return projects;
}

const projectNameToId = (name) => {   
    const items = getProjects();
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === name) {
            return items[i].id
        }
    }
}

const projectIdToName = (id) => {
    const items = getProjects();
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i].name;
        }
    }
}
// ---------------------------- RECOMMENDATION -----------------------------------

async function fetchRecommendations() {
    const { data } = await request('/oversea/api/recommendations');
    sessionStorage.setItem('recommendations', JSON.stringify(data.recommendations));
    return data.recommendations;
}

const getRecommendations = () => {
    let str = sessionStorage.getItem('recommendations');
    let recommendations = JSON.parse(str);
    if (recommendations === null) {
        recommendations = fetchRecommendations();
    }
    return recommendations;
}

const getRecommendationsList = () => {
    const recommendationsHashMap = getRecommendations();
    const recommendations = recommendationsHashMap.map((item) => {
        return item.name;
    })
    return recommendations;
}

const recommendationNameToId = (name) => {   
    const items = getRecommendations();
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === name) {
            return items[i].id
        }
    }
}

const recommendationIdToName = (id) => {
    const items = getRecommendations();
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i].name;
        }
    }
}

// ---------------------------- RESEARCH -----------------------------------

async function fetchResearches() {
    const { data } = await request('/oversea/api/researches');
    sessionStorage.setItem('researches', JSON.stringify(data.researches));
    return data.researches;
}

const getResearches = () => {
    let str = sessionStorage.getItem('researches');
    let researches = JSON.parse(str);
    if (researches === null) {
        researches = fetchResearches();
    }
    return researches;
}

const getResearchesList = () => {
    const researchesHashMap = getResearches();
    const researches = researchesHashMap.map((item) => {
        return item.name;
    })
    return researches;
}

const researchNameToId = (name) => {   
    const items = getResearches();
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === name) {
            return items[i].id
        }
    }
}

const researchIdToName = (id) => {
    const items = getResearches();
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i].name;
        }
    }
}

// ---------------------------- OTHER -----------------------------------

const degreesFromServer = ['Ph.D', 'Master'];
const resultsFromServer = ['ad', 'rej', 'offer'];

export {
    degreesFromServer,
    resultsFromServer,
    tagsFromServer,
    countriesFromServer,
    getCountries,
    countryNameToId,
    projectNameToId,
    getProjects,
    getRecommendations,
    recommendationNameToId,
    getResearches,
    researchNameToId,
    researchIdToName,
    projectIdToName,
    recommendationIdToName,
    countryIdToName
}
