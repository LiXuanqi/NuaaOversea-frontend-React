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
    let token = sessionStorage.getItem('token');
    const { data: res } = await request('/api/users?token=' + token, {
        method: 'GET'
    });
    console.log(res);
    const userInfo = res.data;
    Cookies.set('current-user', userInfo);
}

function logout() {
    sessionStorage.removeItem('token');
    Cookies.remove('current-user');
    window.location.reload();
}

export {
    loginUser,
    isLogin,
    login,
    logout
};
