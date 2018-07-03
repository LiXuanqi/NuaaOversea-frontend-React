import auth from '../services/auth';

export default {
  namespace: 'user',
  state: {
    profile: {}
  },
  reducers: {
    saveProfile(state, { payload }) {
      return {
        ...state,
        profile: payload,
      }
    }
  },
  effects: {
    *fetchProfile(action, { call, put }) {
      const { data, err } = yield call(auth.getProfile)
      if (!err) {
        yield put({
          type: 'saveProfile',
          payload: data
        })
      }
    }
  },
  subscriptions: {
    // TODO: check whether userInfo exists, if yes, not fetch every time.
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        const profile = window.g_app._store.getState()['user']['profile'];
        if (JSON.stringify(profile) === "{}") {
          dispatch({
            type: 'fetchProfile',
          })
        }
      });
    },
  },
};