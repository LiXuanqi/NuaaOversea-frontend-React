import request from '../utils/request';

import router from 'umi/router';
import { message } from 'antd';

export default {
    namespace: 'applicants',
    state: {

    },
    reducers: {

    },
    effects: {
        *postApplicant({ payload }, { call, put } ) {
            const { data } = yield call(request, '/oversea/api/applicants', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8;"
                },
                body: JSON.stringify({
                    ...payload.formData,
                    token: sessionStorage.getItem('token')

                })
            })
            if (data.id) {
                yield put({
                    type: 'user/updateApplicantId',
                    payload: data.id
                })
                router.push(payload.redirect_url);
                message.success('添加成功');
                // FIXME: fetch user info again to update applicant_id in cookie.
            }
        },
        *updateApplicant({ payload }, { call, put }) {
            const { data } = yield call(request, '/oversea/api/applicants/' + payload.applicant_id, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json; charset=UTF-8;"
                },
                body: JSON.stringify({
                    ...payload.formData,
                    token: sessionStorage.getItem('token')
                })
            })
            if (data.id) {
                if (payload.redirect_url) {
                    router.push(payload.redirect_url);
                    message.success('修改成功');
                }
               
                
            }
        },
        *patchApplicant({ payload }, { call, put }) {
            const { data } = yield call(request, '/oversea/api/applicants/' + payload.applicant_id, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json; charset=UTF-8;"
                },
                body: JSON.stringify({
                    ...payload.formData,
                    token: sessionStorage.getItem('token')
                })
            });
            if (data.id) {
                router.push('/refresh?redirect_url='+payload.redirect_url);
                message.success('修改成功');
            }
        }
    },
    subscriptions: {
      
    },
};