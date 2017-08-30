import arrayUtil from 'util/arrayUtil';
import * as types from './roleMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {

  [types.ROLE_QUERY_ROLES_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },
  [types.ROLE_QUERY_ROLES_COUNT_SUC](state, {totalCount}) {
    state.totalCount = totalCount;
  },

  [types.ROLE_QUERY_ROLES_BEGIN](state) {
    state.roles = [];
  },
  [types.ROLE_QUERY_ROLES_SUC](state, {roles}) {
    state.roles = roles;
  },
  [types.ROLE_ADD_SUC] (state) {

  },
  [types.ROLE_QUERY_ROLE_BEGIN](state) {

  },
  [types.ROLE_QUERY_ROLE_SUC](state, data) {
    console.log('query role suc', data);

    state.form = data.role;
  },
  [types.ROLE_UPDATE_SUC](state) {

  },

  [types.ROLE_DELETE_BEGIN](state) {
  },

  [types.ROLE_DELETE_SUC](state, {roleId}) {

    arrayUtil.removeObjectItem(state.roles, 'roleId', roleId);
    state.totalCount = state.totalCount - 1;
    //for (let i = 0; i < state.roles.length; i++) {
    //  let role = state.roles[i];
    //
    //  if (role.roleId === roleId) {
    //    console.log(`remove role[${roleId}] in state.roles`);
    //    state.roles.splice(i, 1);
    //    state.totalCount = state.totalCount - 1;
    //    break;
    //  }
    //}
  },

  [types.ROLE_DELETE_FAIL](state) {

  },


  //USERROLE
  [types.USERROLE_QUERY_BEGIN](state) {
    state.userroles = [];
  },
  [types.USERROLE_QUERY_SUC](state, {userroles}) {
    state.userroles = userroles;
  },
  [types.USERROLE_ADD_BEGIN](state) {

  },
  [types.USERROLE_ADD_SUC](state, {user}) {
    let userroles = state.userroles || [];
    userroles.push(user);

    state.userroles = userroles;
  },
  [types.USERROLE_DELETE_BEGIN](state) {
  },
  [types.USERROLE_DELETE_SUC](state, {userId}) {
    let userroles = state.userroles;
    if (userroles) {
      for (let i = 0; i < userroles.length; i++) {
        let user = userroles[i];
        if (user.userId === userId) {
          userroles.splice(i, 1);
          break;
        }
      }
    }
  },

  // ROLEPRIV
  [types.ROLEPRIV_QUERY_BEGIN](state) {
    state.roleprivs = [];
  },
  [types.ROLEPRIV_QUERY_SUC](state, {roleprivs}) {
    state.roleprivs = roleprivs;
  },
  [types.ROLEPRIV_ADD_BEGIN](state) {

  },
  [types.ROLEPRIV_ADD_SUC](state, {priv}) {
    let roleprivs = state.roleprivs || [];
    roleprivs.push(priv);

    state.roleprivs = roleprivs;
  },
  [types.ROLEPRIV_DELETE_BEGIN](state) {
  },
  [types.ROLEPRIV_DELETE_SUC](state, {privId}) {
    let list = state.roleprivs;
    let propName = 'privId';
    if (list) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item[propName] === privId) {
          list.splice(i, 1);
          break;
        }
      }
    }
  }
};

export default mutations;
