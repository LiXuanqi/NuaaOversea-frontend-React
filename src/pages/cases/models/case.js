
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
      *fetchCase({ applicationId }, { call, put }){
        const data = yield call(getApplication, applicationId);    
        // TODO: GraphGL        
        // const applicant_id = data.data.applicant_id;
        // const relatedData = yield call(getApplicationsByApplicantId, applicant_id);
        yield put({
            type: 'saveCase',
            payload: {
                data,
            },
        });
        // yield put({
        //     type: 'saveRelatedCases',
        //     payload: {
        //         relatedData,
        //     },
        // });
      },
    },
    subscriptions: {
     
    },
};