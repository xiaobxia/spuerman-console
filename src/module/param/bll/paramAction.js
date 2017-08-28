import http from '../../../util/httpUtil';
import * as types from './paramMutationTypes';

const actions = {

  querySysParam({ commit }, { paramId } = {}) {
    //commit(types.PARAM_QUERY_PARAM_BEGIN);

    return http.get(`sys/param/${paramId}`).then(param => {
      //commit(types.PARAM_QUERY_PARAM_SUC, {param});
      return param;
    });
  },

  querySysParams ({ commit }, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.PARAM_QUERY_PARAMS_BEGIN);

    return http.get(`sys/param/params?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(params => {
        commit(types.PARAM_QUERY_PARAMS_SUC, {params});
      });
  },

  querySysParamsCount ({ commit }) {
    return http.get(`sys/param/paramsCount`)
      .then(totalCount => {
        commit(types.PARAM_QUERY_PARAMS_COUNT_SUC, {totalCount});
      });
  },

  saveSysParam({ commit }, param) {
    return http.post('sys/param/add', param).then(param => {
      commit(types.PARAM_ADD_SUC, {param});
    });
  },

  updateSysParam({ commit }, param) {
    return http.post('sys/param/update', param).then(() => {
      commit(types.PARAM_UPDATE_SUC, {param});
    });
  },

  deleteSysParam({ commit }, { paramId } = {}) {
    commit(types.PARAM_DELETE_BEGIN);

    return http.delete(`sys/param/delete/${paramId}`).then(() => {
      commit(types.PARAM_DELETE_SUC, {paramId});
    });
  }
};


export default actions;
