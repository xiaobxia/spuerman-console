import actions from './roleAction';
import mutations from './roleMutation';

const state = {
  currentPage: 1,
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  roles: [],
  userroles: [],
  roleprivs: []
};

const getters = {
  getSysRoles: state => state.roles,
  getSysUserRoles: state => state.userroles,
  getSysRolePrivs: state => state.roleprivs,
  getSysRoleCurrentPage: state => state.currentPage,
  getSysRoleTotalCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
