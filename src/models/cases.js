import pathToRegexp from 'path-to-regexp';
import request from 'Utils/request';
import { message } from 'antd'
import router from 'umi/router';
import { getApplication, getApplicationsByApplicantId, getApplicationByTopic } from 'Services/applications';
export default {
    namespace: 'cases',
    state: {
        case_data: {},
        related_cases_list: [],
    },
    reducers: {
        saveOneCase(state, { payload: {data: newData } }) {
            return { ...state,
                case_data: newData.data,
            }
        },
    },
    effects: {
        *fetchCasesByTopic({ payload: topic }, { call, put}){
            const data = yield call(getApplicationByTopic, topic);
            yield put({
                type: 'saveAllCasesList',
                payload: {
                    data,
                },
            });
        },
        *postCase({ payload: formData }, { call, put}) {
            const { data } = yield call(request, '/oversea/api/applications', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8;"
                },
                body: JSON.stringify({
                    ...formData,
                    token: sessionStorage.getItem('token')
                })
            })
            if (data.id) {
                // message.success("添加案例成功")
                yield put({
                    type: 'fetchAllCasesList'
                })
            }
        }
    },
    subscriptions: {

    },
};