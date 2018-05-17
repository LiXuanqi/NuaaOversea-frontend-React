import request from '../utils/request';
import { login } from '../utils/user';
import pathToRegexp from 'path-to-regexp';

export default {
    namespace: 'user',
    state: {

    },
    reducers: {

    },
    effects: { 
        *login({ payload: formData }, { call, put }){
            console.log(formData);
            const { data: res } = yield call(request, '/oversea/api/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })
            console.log(res);
            if (res.status === true) {
                const { data } = res;
                const { token } = data;
                if (token) {
                    sessionStorage.setItem('token', token);
                    login();
                }
                if (formData.redirect_url) {
                    window.location.href = formData.redirect_url;
                } 
            }
   
        },     
        *register({ payload: formData }, { call, put }){
            console.log(formData);
            const response = yield call(request, '/oversea/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    will_contact: formData.will_contact
                })
            });
            const { data } = response;
            console.log(data);
            if (data) {
                // TODO: login and redirect to personal center.
                const { data: res } = yield call(request, '/oversea/api/tokens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password
                    })
                })
       
                if (res.status === true) {
                    const { data } = res;
                    const { token } = data;
                    if (token) {
                        sessionStorage.setItem('token', token);
                        login();
                    }
                    window.location.href = '/profile';
                }

            }
        }
    },
    subscriptions: {

    },
};