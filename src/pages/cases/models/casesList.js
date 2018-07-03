import pathToRegexp from 'path-to-regexp';
import { getApplications, getApplicationsByTopic  } from 'Services/applications';

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
        *fetchCasesByTopic({ topic }, { call, put }) {
          const data = yield call(getApplicationsByTopic, topic);
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
                            topic: query.topic
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