import http from '../../../util/httpUtil';
import * as types from './cacheMutationTypes';

const actions = {

  querySysCacheValue({ commit }, cacheOption) {
    commit(types.CACHE_VALUE_RESET);

    return http.post(`sys/cache/get`, cacheOption).then(value => {
      commit(types.CACHE_QUERY_VALUE_SUC, {value});
    })
  },

  deleteCacheValue ({ commit }, { key } = {}) {
    commit(types.CACHE_VALUE_RESET);

    return http.post(`sys/cache/delete`, {key}).then(value => {
      commit(types.CACHE_DELETE_VALUE_SUC, {value});
    })
  }
};


export default actions;
