import pathToRegexp from 'path-to-regexp';
import request from '../utils/request';

export default {
    namespace: 'cases',
    state: {
        cases_list: [],
        case_data: {},
        related_cases_list: [],
    },
    reducers: {
        saveAllCasesList(state, { payload: { data: newData } }) {
            // console.log(newData.data.posts_list[0].body);
            return { ...state,
                cases_list: newData.data.applications,
            }
        },
        saveRelatedCasesList(state, { payload: { relatedData: newData } }) {
            // console.log(newData.data.posts_list[0].body);
            return { ...state,
                related_cases_list: newData.data.applications,
            }
        },
        saveOneCase(state, { payload: {data: newData } }) {
            return { ...state,
                case_data: newData.data,
            }
        },
    },
    effects: {
        // get all posts.
        *fetchAllCasesList(action, { call, put }) {
            const data = yield call(request, '/api/applications');
            yield put({
                type: 'saveAllCasesList',
                payload: {
                    data,
                },
            });
        },
        *fetchRelatedCasesListByApplicantId({ payload: applicant_id }, { call, put }) {
            const data = yield call(request, '/api/applications?applicant_id='+applicant_id);
            yield put({
                type: 'saveRelatedCasesList',
                payload: {
                    data,
                },
            });
        },
        *fetchOneCase({ payload: response }, { call, put }){
            // FIXME: this is a workaround, it would be better if I can split it into 2 methods.
            const data = yield call(request, '/api/applications/'+response.caseId);            

            const applicant_id = data.data.applicant_id;
            console.log(applicant_id);
            const relatedData = yield call(request, '/api/applications?applicant_id='+applicant_id);

            yield put({
                type: 'saveOneCase',
                payload: {
                    data,
                },
            });

            yield put({
                type: 'saveRelatedCasesList',
                payload: {
                    relatedData,
                },
            });
        },
        *fetchCasesByTopic({ payload: topic }, { call, put}){
            const data = yield call(request, '/api/search/applications?q=topic:' + topic);
            yield put({
                type: 'saveAllCasesList',
                payload: {
                    data,
                },
            });
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname })=> {
                if (pathToRegexp('/cases').exec(pathname)) {
                    dispatch({
                        type: 'fetchAllCasesList',
                    });
                } 
                const match = pathToRegexp('/cases/:caseId').exec(pathname);
                if (match) {
                    const caseId = match[1];
                    dispatch({
                        type: 'fetchOneCase',
                        payload: { caseId },
                    });
                }                  
            });
        },
    },
};