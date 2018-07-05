import request from '../utils/request';
import auth from 'Services/auth';

const getApplicants = () => {
  return request(`/oversea/api/applicants/`);
}

const getApplicant = (id) => {
  return request(`/oversea/api/applicants/${id}`);
}

const postApplicant = (data) => {
  const token = auth.getAccessToken();
  return request(`/oversea/api/applicants`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8;",
      "Token": token
    },
    body: JSON.stringify(data)
  });
}

const patchApplicant = (id, data) => {
  const token = auth.getAccessToken();
  return request(`/oversea/api/applicants/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json; charset=UTF-8;",
      "Token": token
    },
    body: JSON.stringify(data)
  });
}

const updateApplicant = (id, data) => {
  const token = auth.getAccessToken();
  return request(`/oversea/api/applicants/${id}`, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json; charset=UTF-8;",
      "Token": token
    },
    body: JSON.stringify(data)
  });
}

export {
  getApplicant,
  getApplicants,
  postApplicant,
  patchApplicant,
  updateApplicant
}