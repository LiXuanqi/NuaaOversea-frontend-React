import auth from '../services/auth';

export default {
  namespace: 'app',
  state: {
    userInfo: {}
  },
  reducers: {
    saveUserInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload,
        isLogin: true
      }
    }
  },
  effects: {
    *fetchUserInfo(action, { call, put }) {
      const { data, err } = yield call(auth.getProfile)
      if (!err) {
        yield put({
          type: 'saveUserInfo',
          payload: data
        })
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history,state }) {
      return history.listen(({ pathname, query }) => {
        dispatch({
          type: 'fetchUserInfo',
        })
      });
    },
  },
};