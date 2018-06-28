import request from '../utils/request';

const getApplications = () => {
  return request('/oversea/api/applications');
}

const getApplication = (id) => {
  return request('/oversea/api/applications/'+id);
}

const getApplicationsByApplicantId = (applicantId) => {
  return request('/oversea/api/applications?applicant_id='+applicantId);
}

const getApplicationsByTopic = (topic) => {
  return request('/oversea/api/search/applications?q=topic:' + topic);
}

const deleteApplication = (id) => {
  return request();
}

const updateApplication = () => {

}

const postApplication = () => {
  
}

export {
  getApplications,
  getApplication,
  getApplicationsByApplicantId,
  getApplicationsByTopic
}