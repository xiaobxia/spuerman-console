
import * as types from './logAuditMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.LOG_AUDIT_QUERY_LOGS_BEGIN](state) {
    state.logAudits = [];
  },
  [types.LOG_AUDIT_QUERY_LOGS_SUC](state, {logAudits}) {
    state.logAudits = logAudits;
  },

  [types.LOG_AUDIT_QUERY_LOGS_COUNT_BEGIN](state) {

  },
  [types.LOG_AUDIT_QUERY_LOGS_COUNT_SUC](state, {totalCount}) {
    state.totalCount = totalCount;
  }
};

export default mutations;
