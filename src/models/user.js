import auth from 'Services/auth';
import { getApplicant } from 'Services/applicants';
import { getApplicationsByApplicantId, deleteApplication, patchApplication } from 'Services/applications';

export default {
  namespace: 'user',
  state: {
    profile: {},
    detail: {},
    cases: []
  },
  reducers: {
    saveProfile(state, { data }) {
      return {
        ...state,
        profile: data,
      }
    },
    saveDetail(state, { data }) {
      return {
        ...state,
        detail: data
      }
    },
    saveCases(state, { data }) {
      return {
        ...state,
        cases: data['applications']
      }
    },
    saveDeleteCase(state, { applicationId }) {
      const newCases = state.cases.filter((item) => {
        return item.id !== applicationId;
      });
      return {
        ...state,
        cases: newCases
      }
    }
  },
  effects: {
    *fetchProfile(action, { call, put }) {
      const { data, err } = yield call(auth.getProfile)
      if (!err) {
        yield put({
          type: 'saveProfile',
          data
        });
      }
      const applicantId = data['applicant_id'];
      if (applicantId) {
        // fetch Details
        yield put({
          type: 'fetchDetail',
          applicantId
        });
        // fetch Cases
        yield put({
          type: 'fetchCases',
          applicantId
        });
      }
    },
    *fetchDetail({ applicantId }, { call, put }) {
      const { data, err } = yield call(getApplicant, applicantId);
      if (!err) {
        yield put({
          type: 'saveDetail',
          data
        });
      }
    },
    *fetchCases({ applicantId }, { call, put }) {
      const { data, err } = yield call(getApplicationsByApplicantId, applicantId);
      if (!err) {
        yield put({
          type: 'saveCases',
          data
        });
      }
    },
    *deleteCase({ applicationId }, { call, put }) {
      const { err } = yield call(deleteApplication, applicationId);
      if (!err) {
        yield put({
          type: 'saveDeletedCase',
          applicationId
        });
      }
    },
    *patchCase({ formData, applicationId, resolve, reject }, { call, put }) {
      const { data, err } = yield call(patchApplication, applicationId, formData);
      const applicantId = data['applicant_id'];
      if (!err) {
        yield put({
          type: 'fetchCases',
          applicantId
        });
        resolve();
      } else {
        reject(err);
      }
    }
  },
  subscriptions: {
    // TODO: check whether userInfo exists, if yes, not fetch every time.
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const profile = window.g_app._store.getState()['user']['profile'];
        if (JSON.stringify(profile) === "{}") {
          dispatch({
            type: 'fetchProfile',
          })
        }
      });
    },
  },
};