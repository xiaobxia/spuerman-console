
import actions from './logAuditAction';
import mutations from './logAuditMutation';

const state = {
  totalCount: 0,
  logAudits: []
};

const getters = {
  getSysLogAudits: state => state.logAudits,
  getSysLogAuditTotalCount: state => state.totalCount
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
