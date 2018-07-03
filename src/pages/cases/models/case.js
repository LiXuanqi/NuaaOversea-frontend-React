
import { getApplication, getApplicationsByApplicantId } from 'Services/applications';

export default {
    namespace: 'case',
    state: {
      data: {},
      relatedCases: []
    },
    reducers: {
      saveRelatedCases(state, { payload: { relatedData: newData } }) {
        return { ...state,
            relatedCases: newData.data.applications,
        }
      },
      saveCase(state, { payload: {data: newData } }) {
          return { ...state,
              data: newData.data,
          }
      },
    },
    effects: {
      *fetchCase({ applicationId }, { call, put }) {
        const data = yield call(getApplication, applicationId);    
        const applicant_id = data.data.applicant_id;

        yield put({
          type: 'case/fetchRelatedCases',
          applicant_id: applicant_id
        });

        yield put({
          type: 'saveCase',
          payload: {
              data,
          },
        });
      },
      *fetchRelatedCases({applicant_id}, { call, put }) {
        const relatedData = yield call(getApplicationsByApplicantId, applicant_id);
        yield put({
          type: 'saveRelatedCases',
          payload: {
              relatedData,
          },
        });
      }
    },
    subscriptions: {
     
    },
};