import request from '../utils/request';

import { message } from 'antd';
import router from 'umi/router';

export default {
    namespace: 'user',
    state: {
        isLogin: false,
        userInfo: {}
    },
    reducers: {
        saveUserInfo(state, { payload }) {
            return {
                ...state,
                userInfo: payload,
                isLogin: true
            }
        },
        deleteUserInfo(state) {
            return {
                ...state,
                userInfo: {},
                isLogin: false
            }
        },
        updateApplicantId(state, { payload }) {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    applicant_id: payload
                }
            }
        }
    },
    effects: { 
        *fetchUserInfo(action, {call, put}) {
            const { data,err } = yield call(request, '/oversea/api/users?token=' + sessionStorage.getItem('token'))                     
            if (!err) {
                yield put({
                    type: 'saveUserInfo',
                    payload: data
                })
            }
        },  
        *register({ payload: formData }, { call, put, take }){
            const { data } = yield call(request, '/oversea/api/users', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8;"
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    will_contact: formData.will_contact
                })
            });
            if (data.id) {
                const { data: res } = yield call(request, '/oversea/api/tokens', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8;"
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password
                    })
                })
       
                if (!res.error) {
                    const token = res.token;
                    if (token) {
                        sessionStorage.setItem('token', token);
                        yield put({
                            type: 'fetchUserInfo'
                        })
                      
                        // FIXME: should make sure the fetchUserInfo is finished and then redirect.
                        router.push('/');
                        message.success('注册成功!')
                    }
                } else {
                    message.warn(res.error);
                }

            }
        }
    },
    subscriptions: {

    },
};