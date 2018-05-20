import request from '../utils/request';
import { login } from '../utils/user';
import { message } from 'antd';
import { BASE_URL } from '../utils/config';

export default {
    namespace: 'user',
    state: {

    },
    reducers: {

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
                    login();
                }
                if (formData.redirect_url) {
                    window.location.href = BASE_URL + formData.redirect_url
                } 
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
                        login();
                    }
             
                    window.location.href = BASE_URL+ '/profile';
                } else {
                    message.warn(res.error);
                }

            }
        }
    },
    subscriptions: {

    },
};