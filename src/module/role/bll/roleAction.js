import http from '../../../util/httpUtil';
import * as types from './roleMutationTypes';

const actions = {

  querySysRole({ commit }, { roleId } = {}) {
    //commit(types.ROLE_QUERY_ROLE_BEGIN);

    return http.get(`sys/role/${roleId}`).then(role => {
      //commit(types.ROLE_QUERY_ROLE_SUC, {role});
      return role;
    })
  },

  querySysRoles ({ commit }, { pageIndex = 1, pageSize = 10 } = {}) {
    commit(types.ROLE_QUERY_ROLES_BEGIN);

    return http.get(`sys/role/roles?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(roles => {
        commit(types.ROLE_QUERY_ROLES_SUC, {roles});
      })
  },

  querySysRolesCount({ commit }) {
    commit(types.ROLE_QUERY_ROLES_COUNT_BEGIN);
    return http.get(`sys/role/rolesCount`).then(totalCount => {
      commit(types.ROLE_QUERY_ROLES_COUNT_SUC, {totalCount});
    });
  },

  saveSysRole({ commit }, role) {
    return http.post('sys/role/add', role).then(data => {
      commit(types.ROLE_ADD_SUC)
    });
  },

  updateSysRole({ commit }, role) {
    return http.post('sys/role/update', role).then(data => {
      commit(types.ROLE_UPDATE_SUC)
    });
  },

  deleteSysRole({ commit }, { roleId } = {}) {
    commit(types.ROLE_DELETE_BEGIN);

    return http.get(`sys/role/delete/${roleId}`).then(data => {
      commit(types.ROLE_DELETE_SUC, {roleId});
    });
  },

  //
  queryUserRolesCount({ commit }, { roleId }) {
    commit(types.USERROLE_QUERY_COUNT_BEGIN);
    //TODO
    return http.get(`sys/user/userrole/${roleId}`).then(userroles => {
      commit(types.USERROLE_QUERY_SUC, {userroles});
    })
  },

  queryUserRoles({ commit }, {roleId, pageIndex = 1, pageSize = 10} = {}) {
    commit(types.USERROLE_QUERY_BEGIN);
    //TODO 分页
    return http.get(`sys/user/userrole/${roleId}`).then(userroles => {
      commit(types.USERROLE_QUERY_SUC, {userroles});
    })
  },
  saveUserRole({ commit }, {userRole, user} = {}) {
    commit(types.USERROLE_ADD_BEGIN);

    return http.post('sys/userrole/add', userRole).then(data => {
      commit(types.USERROLE_ADD_SUC, {user});
    });
  },

  deleteUserRole({ commit }, { userId, roleId }) {
    commit(types.USERROLE_DELETE_BEGIN);
    return http.delete(`sys/userrole/${userId}/${roleId}`).then(data => {
      commit(types.USERROLE_DELETE_SUC, {userId});
    });
  },

  queryRolePrivsCount({commit}, {roleId}) {
    commit(types.ROLEPRIV_QUERY_BEGIN);
  },

  queryRolePrivs({commit}, {roleId, pageIndex = 1, pageSize = 10} = {}) {
    commit(types.ROLEPRIV_QUERY_BEGIN);
    //TODO
    return http.get(`sys/priv/rolepriv?roleId=${roleId}`).then(roleprivs => {
      commit(types.ROLEPRIV_QUERY_SUC, {roleprivs});
    })
  },

  saveRolePriv({ commit }, {rolePriv, priv}) {
    commit(types.ROLEPRIV_ADD_BEGIN)

    return http.post('sys/rolepriv/add', rolePriv).then(() => {
      commit(types.ROLEPRIV_ADD_SUC, {priv});
    });
  },

  deleteRolePriv({commit}, {roleId, privId}) {
    commit(types.ROLEPRIV_DELETE_BEGIN);

    return http.delete(`sys/rolepriv/${roleId}/${privId}`).then(() => {
      commit(types.ROLEPRIV_DELETE_SUC, {privId});
    })
  }

};


export default actions;
