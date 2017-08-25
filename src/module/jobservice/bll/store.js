/**
 * Created by shi.pengyan on 2017-01-12.
 */
import actions from './action';
import mutations from './mutation';

const state = {
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  jobs: []
};

const getters = {
  getSysJobs: state => state.jobs,
  getSysJobTotalCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
