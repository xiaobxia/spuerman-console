import http from 'util/httpUtil';
import * as types from './privMutationTypes';

const actions = {

  queryPriv({ commit }, { privId } = {}) {
    //commit(types.PRIV_QUERY_PRIV_BEGIN);

    return http.get(`sys/priv/${privId}`).then(priv => {
      //commit(types.PRIV_QUERY_PRIV_SUC, {priv});
      return priv;
    });
  },

  queryPrivs ({ commit }, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.PRIV_QUERY_PRIVS_BEGIN);

    return http.get(`sys/priv/privs?pageIndex=${pageIndex}&pageSize=${pageSize}`).then(privs => {
      commit(types.PRIV_QUERY_PRIVS_SUC, {privs});
    });
  },

  queryPrivsCount ({ commit }) {
    commit(types.PRIV_QUERY_PRIVS_COUNT_BEGIN);

    return http.get('sys/priv/privsCount').then(totalCount => {
      commit(types.PRIV_QUERY_PRIVS_COUNT_SUC, {totalCount});
    });
  },

  queryRootPrivs({ commit }) {
    commit(types.PRIV_QUERY_ROOT_PRIVS_BEGIN);

    return http.get('sys/priv/rootPrivs').then(rootPrivs => {
      commit(types.PRIV_QUERY_ROOT_PRIVS_SUC, {rootPrivs});
    });
  },

  savePriv({ commit }, priv) {
    return http.post('sys/priv/add', priv).then(data => {
      commit(types.PRIV_ADD_SUC);
    });
  },

  updatePriv({ commit }, priv) {
    return http.post('sys/priv/update', priv).then(data => {
      commit(types.PRIV_UPDATE_SUC);
    });
  },

  deletePriv({ commit }, { privId } = {}) {
    commit(types.PRIV_DELETE_BEGIN);

    return http.get(`sys/priv/delete/${privId}`).then(data => {
      commit(types.PRIV_DELETE_SUC, {privId});
    });
  }
};


export default actions;
