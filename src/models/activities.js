

export default {
  namespace: 'activity',

  state: {
    list: [],
  },

  effects: {
    *fetchList(_, { call, put }) {
     /*  const response = yield call(queryActivities); */
     /*  yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      }); */
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
