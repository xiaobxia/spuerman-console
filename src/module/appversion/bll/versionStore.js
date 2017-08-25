import actions from './versionAction';
import mutations from './versionMutation';

const state = {
  currentPage: 1,
  totalCount: 0,
  versions: [],
  apps: []
};

const getters = {
  getSysVersionCurrentPage: state => state.currentPage,
  getSysVersionTotalCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
