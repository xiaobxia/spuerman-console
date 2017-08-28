
import http from 'util/httpUtil';
import * as types from './logAuditMutationTypes';

const actions = {
  querySysLogAudits ({ commit }, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.LOG_AUDIT_QUERY_LOGS_BEGIN);

    return http.get(`sys/logAudit/logAudits?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(logAudits => {
        commit(types.LOG_AUDIT_QUERY_LOGS_SUC, {logAudits});
      });
  },

  querySysLogAuditsCount ({ commit }) {
    commit(types.LOG_AUDIT_QUERY_LOGS_COUNT_BEGIN);

    return http.get(`sys/logAudit/logAuditsCount`)
      .then(totalCount => {
        commit(types.LOG_AUDIT_QUERY_LOGS_COUNT_SUC, {totalCount});
      });
  }
};


export default actions;
