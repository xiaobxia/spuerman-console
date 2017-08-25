import * as types from './appMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.APP_QUERY_APPS_BEGIN](state) {
    state.apps = [];
  },
  [types.APP_QUERY_APPS_SUC](state, {apps}) {
    state.apps = apps;
  },
  [types.APP_ADD_SUC] (state, {app}) {
    let apps = state.apps || [];
    apps.push(app);
    state.apps = apps;
  },
  [types.APP_UPDATE_SUC](state, {app}) {
    for (let i = 0; i < state.apps.length; i++) {
      let item = state.apps[i];
      if (item.appId === app.appId) {
        item.appName = app.appName;
        item.appType = app.appType;
        item.description = app.description;
        break;
      }
    }
  },

  [types.APP_DELETE_BEGIN](state) {
  },

  [types.APP_DELETE_SUC](state, {appId}) {
    //从列表中移除userId
    for (let i = 0; i < state.apps.length; i++) {
      let item = state.apps[i];

      if (item.appId === appId) {
        console.log(`remove param[${appId}] in state.apps`);
        state.apps.splice(i, 1);
        break;
      }
    }
  }

};

export default mutations;
