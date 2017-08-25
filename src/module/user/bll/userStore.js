import actions from './userAction';
import mutations from './userMutation';

const state = {
  currentEditUser: null, //当前编辑的用户
  totalCount: 0,
  users: [],
  userRoleList: [],
  userPrivList: []
};

const getters = {
  getSysUsers: state => state.users,
  getSysUserTotalCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
