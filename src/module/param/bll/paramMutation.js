

import * as types from './paramMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.PARAM_QUERY_PARAMS_BEGIN](state) {
    state.params = [];
  },
  [types.PARAM_QUERY_PARAMS_SUC](state, {params}) {
    state.params = params;
  },

  [types.PARAM_QUERY_PARAMS_COUNT_BEGIN](state) {

  },
  [types.PARAM_QUERY_PARAMS_COUNT_SUC](state, {totalCount}) {
    state.totalCount = totalCount
  },

  [types.PARAM_ADD_SUC] (state, {param}) {
    let params = state.params || [];
    params.push(param);
    state.params = params;
  },
  [types.PARAM_QUERY_BEGIN](state) {

  },
  [types.PARAM_QUERY_SUC](state, data) {
    console.log('query user suc', data);

    state.form = data.user;
  },


  [types.PARAM_UPDATE_SUC](state, {param}) {
    for (let i = 0; i < state.params.length; i++) {
      let item = state.params[i];
      if (item.id === param.id) {
        item.paramValue = param.paramValue;
        item.paramText = param.paramText;
        item.paramMoreValue = param.paramMoreValue;
        item.description = param.description;

        break;
      }
    }
  },

  [types.PARAM_DELETE_BEGIN](state) {
  },

  [types.PARAM_DELETE_SUC](state, {paramId}) {
    //从列表中移除userId
    for (let i = 0; i < state.params.length; i++) {
      let param = state.params[i];

      if (param.id === paramId) {
        console.log(`remove param[${paramId}] in state.params`);
        state.params.splice(i, 1);
        break;
      }
    }
  },

  [types.PARAM_DELETE_FAIL](state) {

  }

};

export default mutations;
