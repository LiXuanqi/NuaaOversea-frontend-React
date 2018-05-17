import request from '../utils/request';
import { loginUser } from '../utils/user';
export default {
    namespace: 'applicants',
    state: {

    },
    reducers: {
    
    },
    effects: {
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
            console.log(data);
        }
    },
    subscriptions: {
      
    },
};