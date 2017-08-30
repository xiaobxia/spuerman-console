import * as types from './privMutationTypes';
import arrayUtil from 'util/arrayUtil';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.PRIV_QUERY_ROOT_PRIVS_BEGIN](state) {
    state.rootPrivs = [];
  },
  [types.PRIV_QUERY_ROOT_PRIVS_SUC](state, { rootPrivs }) {
    state.rootPrivs = rootPrivs;
  },

  [types.PRIV_QUERY_PRIVS_BEGIN](state) {
    state.privs = [];
  },
  [types.PRIV_QUERY_PRIVS_SUC](state, {privs}) {
    state.privs = privs;
  },

  [types.PRIV_QUERY_PRIVS_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },
  [types.PRIV_QUERY_PRIVS_COUNT_SUC] (state, {totalCount}) {
    state.totalCount = totalCount;
  },

  [types.PRIV_ADD_SUC] (state) {

  },
  [types.PRIV_QUERY_PRIV_BEGIN](state) {

  },
  [types.PRIV_QUERY_PRIV_SUC](state, data) {
    console.log('query user suc', data);

    state.form = data.user;
  },
  [types.PRIV_UPDATE_SUC](state) {

  },

  [types.PRIV_DELETE_BEGIN](state) {
  },

  [types.PRIV_DELETE_SUC](state, {privId}) {
    arrayUtil.removeObjectItem(state.privs, 'privId', privId);
  },

  [types.PRIV_DELETE_FAIL](state) {

  }

};

export default mutations;
