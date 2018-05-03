import request from '../utils/request';
import { login } from '../utils/user';

export default {
    namespace: 'app',
    state: {

    },
    reducers: {

    },
    effects: {      
        *fetchToken({ payload: args }, { call, put }){
            console.log(args);
            const response = yield call(request, '/api/tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: args.code,
                    redirect_uri: args.pathname
                }),
                credentials: 'include'
            })

            let { access_token, redirect_uri } = response.data;

            if (access_token) {
                sessionStorage.setItem('access_token', access_token);
                login();
            }
            if (redirect_uri) {
                window.location.href = redirect_uri;
            }

         
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, search, push })=> {
 
                var reg = /(\?code=)([^\s]*)/;
                if(search.match(reg)){
                    const code = search.match(reg)[2];
                    dispatch({
                        type: 'fetchToken',
                        payload: { code, pathname, push },
                    });
                }
            });
        },
    },
};