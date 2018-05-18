import request from '../utils/request';
import { loginUser } from '../utils/user';
export default {
    namespace: 'applicants',
    state: {

    },
    reducers: {
    
    },
    effects: {
        *updateApplicant({ payload: formData }, { call, put }) {
            const { data } = yield call(request, '/oversea/api/applicants/' + loginUser().applicant_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData
                })
            })
            if (data.id) {
                console.log('修改成功，写代码啊')
            }
        },
        *patchApplicant({ payload: formData }, { call, put }) {
            const { data } = yield call(request, '/oversea/api/applicants/' + loginUser().applicant_id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData
                })
            });
            if (data.id) {
                window.location.reload();
            }
        }
    },
    subscriptions: {
      
    },
};