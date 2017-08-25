import * as types from './cacheMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {

  [types.CACHE_VALUE_RESET](state) {
    state.value = null;
  },
  [types.CACHE_QUERY_VALUE_SUC](state, {value}) {
    state.value = parseObj(value);
  },

  [types.CACHE_DELETE_VALUE_SUC](state, {value}) {
    state.value = parseObj(value);
  }
};

function parseObj(val) {
  return JSON.stringify(val || {}, null, 4);
}

export default mutations;
