import request from '../utils/request';

const getApplicants = () => {
  return request(`/oversea/api/applicants/`);
}

const getApplicant = (id) => {
  return request(`/oversea/api/applicants/${id}`);
}

export {
  getApplicant,
  getApplicants
}