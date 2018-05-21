import request from '../utils/request';

import { message } from 'antd';
import { BASE_URL } from '../utils/config';
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
        *login({ payload: formData }, { call, put }){
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
            if (res.error) {
                message.warn(res.error);
            } 
            if (res.token) {
                const token = res.token;
                if (token) {
                    sessionStorage.setItem('token', token);
                    yield put({
                        type: 'fetchUserInfo'
                    });
                }
                if (formData.redirect_url) {
                    // window.location.href = BASE_URL + formData.redirect_url
  
                    router.push(formData.redirect_url);
                } else {
                    router.push('/');
                }
            }
        },   
        *logout(action, { call, put }) {
            sessionStorage.removeItem('token');
            yield put({
                type: 'deleteUserInfo'
            })
        },
        *fetchUserInfo(action, {call, put}) {
            const { data,err } = yield call(request, '/oversea/api/users?token=' + sessionStorage.getItem('token'))                     
            if (!err) {
                yield put({
                    type: 'saveUserInfo',
                    payload: data
                })
            }
        },  
        *register({ payload: formData }, { call, put }){
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
                        });
                        router.push('/profile');
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