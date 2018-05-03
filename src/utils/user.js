import Cookies from 'js-cookie';
import request from './request';

const loginUser = () => {
    const str = Cookies.get('current-user');
    if (str === undefined) {
        return {};
    }
    return JSON.parse(str);
}

const isLogin = () => {
    const user = loginUser();
    return !(JSON.stringify(user) === '{}');
}

async function login() {
    let access_token = sessionStorage.getItem('access_token');
    const response = await request('/api/tokens/' + access_token, {
        method: 'GET'
    });
    const userInfo = response.data;
    Cookies.set('current-user', userInfo);
}

async function logout() {
    let access_token = sessionStorage.getItem('access_token');
    const response = await request('/api/tokens/' + access_token, {
        method: 'DELETE'
    })
    console.log(response);
    // TODO: notice of success.
    Cookies.remove('current-user');
    window.location.reload();
}

export {
    loginUser,
    isLogin,
    login,
    logout
};
