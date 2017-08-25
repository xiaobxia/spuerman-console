/**
 * Created by shi.pengyan on 2016-12-15.
 */

import http from '../../../util/httpUtil';
import * as types from '../../../store/mutationTypes'

const actions = {

  /**
   * 登陆
   * @param commit
   * @param userCode
   * @param pwd
   * @param clearUserInfo
   * @returns {Promise.<T>}
   */
  login ({ commit }, {userCode, pwd, clearUserInfo = true} = {}) {

    clearUserInfo && commit(types.LOGIN_BEGIN)

    return http.post('sys/login', {userCode, pwd}).then(loginUser => {
      commit(types.LOGIN_SUC, {loginUser})
    })
  },

  /**
   * check
   * @param commit
   * @returns {Promise.<T>}
   */
  checkLogin({ commit }) {
    commit(types.LOGIN_CHECK_BEGIN);

    return http.get('sys/isLogin').then(loginUser => {
      commit(types.LOGIN_CHECK_SUC, {loginUser})
    })
  },

  /**
   * 注销
   * @param commit
   * @returns {Promise.<T>}
   */
  logout ({ commit }) {
    commit(types.LOGOUT_BEGIN);

    return http.get('sys/logout').then(data => {
      commit(types.LOGOUT_SUC)
    })
  },

  /**
   * 查询菜单
   * @param commit
   * @returns {Promise.<T>}
   */
  queryMenu ({ commit }) {
    commit(types.APP_QUERY_MENU_BEGIN)

    return http.get('sys/priv/menu').then(menu => {
      commit(types.APP_QUERY_MENU_SUC, {menu})
    })
  },

  changePwd({ commit }, {oldPwd, newPwd}) {
    return http.post('sys/user/changePwd', {oldPwd, newPwd}).then(user => {
      commit(types.APP_USER_CHANGE_PWD_SUC, {user});
    });
  },

  dismissGlobalLoginDialog({ commit }) {
    commit(types.GLOBAL_LOGIN_DIALOG_DISMISS)
  }
}


export default actions
