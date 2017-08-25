/**
 * Created by 周翔 on 2017/4/11.
 */
import actions from './bulletinAction';
import mutations from './bulletinMutation';

const state = {
  bulletins: [],
  groups: [],
  currentPage: 1,
  totalCount: 0
};

const getters = {
  getSysBulletins: state => state.bulletins,
  getSysGroups: state => state.groups,
  getSysBulletinsCurrentPage: state => state.currentPage,
  getSysBulletinsTotalCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
