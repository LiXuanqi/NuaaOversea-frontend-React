import pathToRegexp from 'path-to-regexp';
import { getApplications } from 'Services/applications';

export default {
    namespace: 'casesList',
    state: {
        list: []
    },
    reducers: {
        saveCases(state, { payload: { data: newData } }) {
            return { ...state,
                list: newData.data.applications,
            }
        }
    },
    effects: {
        *fetchCases(action, { call, put }) {
            const data = yield call(getApplications);
            yield put({
                type: 'saveCases',
                payload: {
                    data,
                },
            });
        },
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
                            type: 'fetchCases',
                        });
                    }
                }         
            });
        },
    },
};