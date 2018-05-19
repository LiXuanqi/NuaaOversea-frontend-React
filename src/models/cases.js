import pathToRegexp from 'path-to-regexp';
import request from '../utils/request';
import { message } from 'antd'
import router from 'umi/router';
export default {
    namespace: 'cases',
    state: {
        cases_list: [],
        case_data: {},
        related_cases_list: [],
    },
    reducers: {
        saveAllCasesList(state, { payload: { data: newData } }) {

            return { ...state,
                cases_list: newData.data.applications,
            }
        },
        saveRelatedCasesList(state, { payload: { relatedData: newData } }) {

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
            const data = yield call(request, '/oversea/api/applications');
            yield put({
                type: 'saveAllCasesList',
                payload: {
                    data,
                },
            });
        },
        *fetchRelatedCasesListByApplicantId({ payload: applicant_id }, { call, put }) {
            const data = yield call(request, '/oversea/api/applications?applicant_id='+applicant_id);
            yield put({
                type: 'saveRelatedCasesList',
                payload: {
                    data,
                },
            });
        },
        *fetchOneCase({ payload: response }, { call, put }){
            // FIXME: this is a workaround, it would be better if I can split it into 2 methods.
            const data = yield call(request, '/oversea/api/applications/'+response.caseId);            

            const applicant_id = data.data.applicant_id;

            const relatedData = yield call(request, '/oversea/api/applications?applicant_id='+applicant_id);

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
            const data = yield call(request, '/oversea/api/search/applications?q=topic:' + topic);
            yield put({
                type: 'saveAllCasesList',
                payload: {
                    data,
                },
            });
        },
        *deleteCaseById({ payload }, { call, put }){
            const {data} = yield call(request, '/oversea/api/applications/' + payload.application_id + '?token=' + sessionStorage.getItem('token'), {
                method: 'DELETE'
            });
            if (data === "") {
                router.push('/refresh?redirect_url='+payload.redirect_url);
                message.success('删除成功');
            }
        },
        *updateCase({ payload }, { call, put }) {
            const { data } = yield call(request, '/oversea/api/applications/' + payload.application_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...payload.formData,
                    term: payload.formData.term[0] + payload.formData.term[1],
                    applicant_id: payload.applicant_id,
                    token: sessionStorage.getItem('token')
                })
            });
            if (data.id) {
                router.push('/refresh?redirect_url='+payload.redirect_url);
                message.success('修改成功');
            }
        },
        *postCase({ payload: formData }, { call, put}) {
            const { data } = yield call(request, '/oversea/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    token: sessionStorage.getItem('token')
                })
            })
            if (data.id) {
                message.success("添加案例成功")
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query })=> {
                if (pathToRegexp('/cases').exec(pathname)) {
                    // with topic in query.
                    if (query.topic) {
                        dispatch({
                            type: 'fetchCasesByTopic',
                            payload: query.topic
                        })
                    } else {
                        dispatch({
                            type: 'fetchAllCasesList',
                        });
                    }
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