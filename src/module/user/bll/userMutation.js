import * as types from './userMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.USER_QUERY_USERS_BEGIN](state) {
    state.users = [];
  },
  [types.USER_QUERY_USERS_SUC](state, {users}) {
    state.users = users;
  },
  [types.USER_QUERY_USERS_TOTALCOUNT_BEGIN](state) {
  },
  [types.USER_QUERY_USERS_TOTALCOUNT_SUC](state, data) {
    state.totalCount = data.totalCount;
  },
  [types.USER_ADD_SUC] (state) {

  },
  [types.USER_QUERY_USER_BEGIN](state) {

  },
  [types.USER_QUERY_USER_SUC](state, data) {
    console.log('query user suc', data);

    state.form = data.user;
  },
  [types.USER_UPDATE_SUC](state) {

  },

  [types.USER_DELETE_BEGIN](state) {
  },

  [types.USER_DELETE_SUC](state, {userId}) {
    //从列表中移除userId
    let user = state.users.find(user => {
      return user.userId === userId;
    });
    user.state = 'X';
  },
  [types.USER_LOCK_SUC] (state, {userId}) {
    let user = state.users.find(user => {
      return user.userId === userId;
    });
    user.isLocked = 'Y';
  },
  [types.USER_UNLOCK_SUC] (state, {userId}) {
    let user = state.users.find(user => {
      return user.userId === userId;
    });
    user.isLocked = 'N';
  },
  //
  [types.USER_USERROLE_QUERY_BEGIN](state) {
    state.userRoleList = [];
  },
  [types.USER_USERROLE_QUERY_SUC](state, {userRoleList}) {
    state.userRoleList = userRoleList;
  },
  [types.USER_USERPRIV_QUERY_BEGIN](state) {
    state.userPrivList = [];
  },
  [types.USER_USERPRIV_QUERY_SUC](state, {userPrivList} = {}) {
    state.userPrivList = userPrivList;
  }

};

export default mutations;
