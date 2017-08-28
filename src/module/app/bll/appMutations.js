import * as types from '../../../store/mutationTypes';
import routerUtil from '../../../router/routerUtil';

const mutations = {
  //
  [types.LOGIN_BEGIN](state) {
    state.loginUser = null;
  },
  [types.LOGIN_SUC](state, {loginUser}) {
    state.loginUser = loginUser;
    state.globalLoading = false;
    state.globalLoginDialog = false;

    localStorage.setItem('userCode', loginUser.userCode);
  },
  [types.LOGIN_FAIL](state) {
  },
//
  [types.LOGIN_CHECK_BEGIN](state) {
    state.loginUser = null;
  },
  [types.LOGIN_CHECK_SUC] (state, {loginUser}) {
    console.log('login check suc', loginUser);
    if (loginUser.login) {
      state.loginUser = loginUser;
      localStorage.setItem('userCode', loginUser.userCode);
    }
  },
  [types.LOGIN_CHECK_FAIL] (state) {
  },
  //
  [types.LOGOUT_BEGIN] (state) {

  },
  [types.LOGOUT_SUC] (state) {
    state.loginUser = null;
  },
  [types.LOGOUT_FAIL] (state) {

  },
  //
  [types.APP_QUERY_MENU_BEGIN] (state) {
    state.menu = [];
  },
  [types.APP_QUERY_MENU_SUC] (state, {menu = []} = {}) {

    const item = {
      'id': 0,
      'name': '首页',
      'path': '/dashboard',
      'url': 'common/dashboard',
      'icon': 'fa-tachometer'
    };
    menu.splice(0, 0, item);

    state.menu = routerUtil.generateMenuComponent(menu);
  },
  [types.APP_QUERY_MENU_FAIL] (state) {

  },
  [types.APP_USER_CHANGE_PWD_SUC](state, {user}) {
    state.loginUser = null;
  }
};

export default mutations;
