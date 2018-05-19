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
    const { data: res } = await request('/oversea/api/users?token=' + token, {
        method: 'GET'
    });
    if (!res.error) {
        const userInfo = res;
        Cookies.set('current-user', userInfo);
    }
}

function logout() {
    sessionStorage.removeItem('token');
    Cookies.remove('current-user');
    window.location.reload();
}

function updateApplicantId(applicant_id) {
    const str = Cookies.get('current-user');
    let json = JSON.parse(str);
    const newJson = {
        ...json,
        applicant_id: applicant_id
    }
    Cookies.set('current-user', newJson);
}

export {
    loginUser,
    isLogin,
    login,
    logout,
    updateApplicantId
};
