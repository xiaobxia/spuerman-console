/**
 * Created by 周翔 on 2017/4/17.
 */
import actions from './groupAction';
import mutations from './groupMutation';

const state = {
  groups: [],
  currentPage: 1,
  totalCount: 0
};

const getters = {
  getSysGroups: state => state.groups,
  getSysGroupsCurrentPage: state => state.currentPage,
  getSysGroupsTotalCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
