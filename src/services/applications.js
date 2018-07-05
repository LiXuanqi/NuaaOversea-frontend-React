import request from '../utils/request';
import auth from 'Services/auth';

const getApplications = () => {
  return request('/oversea/api/applications');
}

const getApplication = (id) => {
  return request(`/oversea/api/applications/${id}`);
}

const getApplicationsByApplicantId = (applicantId) => {
  return request(`/oversea/api/applications?applicant_id=${applicantId}`);
}

const getApplicationsByTopic = (topic) => {
  return request(`/oversea/api/search/applications?q=topic:${topic}`);
}

const deleteApplication = (id) => {
  const token = auth.getAccessToken();
  return request(`/oversea/api/applications/${id}`, {
    method: 'DELETE',
    headers: {
      "Token": token
    }
  });
}

const patchApplication = (id, data) => {
  const token = auth.getAccessToken();
  return request(`/oversea/api/applications/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json; charset=UTF-8;",
      "Token": token
    },
    body: JSON.stringify(data)
  });
}

const postApplication = (data) => {
  const token = auth.getAccessToken();
  return request('/oversea/api/applications', {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8;",
      "Token": token
    },
    body: JSON.stringify(data)
  });
}

export {
  getApplications,
  getApplication,
  getApplicationsByApplicantId,
  getApplicationsByTopic,
  postApplication,
  deleteApplication,
  patchApplication
}