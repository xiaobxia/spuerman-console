import config from './config'
import assignDeep from 'assign-deep'

import * as types from '../mutationTypes'

const state = {
  pkg,
  config,
  menu: [],
  routers: {},
  globalLoading: false,
  globalLoginDialog: false
};

const getters = {
  getGlobalLoading: state => state.globalLoading,
  getGlobalLoginDialog: state => state.globalLoginDialog
};

const actions = {
  INCREMENT ({ commit }) {
    commit('INCREMENT')
  },
  INCREMENT_ASYNC ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  },

  // Sidebar: show, hide, toggle
  SHOW_SIDEBAR ({ commit }) {
    commit('SIDEBAR', true)
  },
  HIDE_SIDEBAR ({ commit }) {
    commit('SIDEBAR', false)
  },
  TOGGLE_SIDEBAR ({ commit, state }) {
    commit('SIDEBAR', !state.config.sidebar)
  },

  //SideBar Menu
  openMenu ({ commit }, item) {
    commit(types.SIDEBAR_MENU_OPEN, {item});
  },
  closeMenu ({ commit }, item) {
    commit(types.SIDEBAR_MENU_CLOSE, {item});
  },
  toggleMenu ({ commit }, item) {
    commit(types.SIDEBAR_MENU_TOGGLE, {item});
  }
};

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  SIDEBAR (state, status = true) {
    state.config.sidebar = status
  },

  //global loading
  [types.GLOBAL_LOADING] (state, {loading}) {
    //{fullscreen: false, lock: true}
    state.globalLoading = !!loading
  },
  //global login dialog
  [types.GLOBAL_LOGIN_DIALOG_OPEN] (state) {
    state.globalLoginDialog = true
  },
  [types.GLOBAL_LOGIN_DIALOG_DISMISS] (state) {
    state.globalLoginDialog = false
  },

  [types.GLOBAL_ADD_ROUTES](state, data) {
    state.routes = assignDeep({}, state.routes, {[data.name]: data.component})
  },

  //sidebar menu
  [types.SIDEBAR_MENU_OPEN] (state, {item}) {
    item.meta.expanded = true;
  },
  [types.SIDEBAR_MENU_CLOSE] (state, {item}) {
    item.meta.expanded = false;
  },

  [types.SIDEBAR_MENU_TOGGLE] (state, {item}) {
    item.meta.expanded = !item.meta.expanded;
  }

};
export default {state, getters, mutations, actions};
