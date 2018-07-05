import auth from 'Services/auth';
import { getApplicant, postApplicant, patchApplicant, updateApplicant } from 'Services/applicants';
import { getApplicationsByApplicantId, postApplication, deleteApplication, patchApplication } from 'Services/applications';
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
    },
    *patchDetail({ formData, resolve, reject }, { call, put, select }) {
      const applicantId = yield select((state) => {
        return state['user']['profile']['applicant_id'];
      })
      const { data, err } = yield call(patchApplicant, applicantId, formData);
      if (!err) {
        yield put({
          type: 'fetchDetail',
          applicantId
        })
        resolve();
      } else {
        reject(err);
      }
    },
    *postDetail({ formData, resolve, reject }, { call, put }) {
      const { data, err } = yield call(postApplicant, formData);
      if (!err) {
        const applicantId = data['id'];
        yield put({
          type: 'fetchProfile'
        })
        yield put({
          type: 'fetchDetail',
          applicantId
        })
        resolve();
      } else {
        reject(err);
      }
    },
    *updateDetail({ formData, resolve, reject }, { call, put, select }) {
      const applicantId = yield select((state) => {
        return state['user']['profile']['applicant_id'];
      })
      const { data, err } = yield call(updateApplicant, applicantId, formData);
      if (!err) {
        yield put({
          type: 'fetchDetail',
          applicantId
        });
        resolve();
      } else {
        reject(err);
      }
    },
    *updateOrPostDetail({ formData, resolve, reject }, { call, put, select }) {
      let applicantId = yield select((state) => {
        return state['user']['profile']['applicant_id'];
      })
      const { data, err } = applicantId ? yield call(updateApplicant, applicantId, formData) : yield call(postApplicant, formData);
      if (!err) {
        applicantId = data['id'];
        // workaround way.
        let outResolve = resolve;
        new Promise((resolve, reject) => {
          window.g_app._store.dispatch({
            type: 'user/fetchProfile',
            resolve
          })
          .then(() => {
            outResolve()
          })
        })
        yield put({
          type: 'fetchDetail',
          applicantId
        })
      } else {
        reject(err);
      }
    },
    *postCases({ cases, resolve, reject }, { call, put, select }) {
      const applicantId = yield select((state) => {
        return state['user']['profile']['applicant_id'];
      })
      if (applicantId) {
        const data = yield cases.map((item) => {
          return call(postApplication, {
            ...item,
            applicant_id: applicantId
          });
        })
        let isSuccess = true;
        data.forEach(item => {
          if (item.err) {
            isSuccess = false;
          }
        });
        if (isSuccess) {
          yield put({
            type: 'fetchCases',
            applicantId
          });
          resolve(); 
        } else {
          reject();
        }
      } else {
        console.log('没有applicant_id')
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