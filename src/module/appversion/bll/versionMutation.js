import * as types from './versionMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.VERSION_APP_QUERY_APPS_SUC](state, {apps}) {
    state.apps = apps;
  },
  [types.VERSION_QUERY_VERSIONS_BEGIN](state) {
    state.versions = [];
  },
  [types.VERSION_QUERY_VERSIONS_SUC](state, {versions}) {
    state.versions = versions;
  },
  [types.VERSION_QUERY_VERSIONS_COUNT_BEGIN](state) {
  },
  [types.VERSION_QUERY_VERSIONS_COUNT_SUC](state, {totalCount}) {
    state.totalCount = totalCount;
  },
  [types.VERSION_SAVE_BEGIN] (state) {
  },
  [types.VERSION_SAVE_SUC] (state, {version}) {
    let versions = state.versions || [];
    versions.push(version);
    state.versions = versions;
  },

  [types.VERSION_UPDATE_SUC](state, {version}) {
    for (let i = 0; i < state.versions.length; i++) {
      let item = state.versions[i];
      if (item.versionId === version.versionId) {
        item.appId = version.appId;
        item.versionNumber = version.versionNumber;
        item.forceUpdate = version.forceUpdate;
        item.downloadPath = version.downloadPath;
        item.versionDesc = version.versionDesc;
        break;
      }
    }
  },

  [types.VERSION_DELETE_BEGIN](state) {
  },

  [types.VERSION_DELETE_SUC](state, {versionId}) {
    for (let i = 0; i < state.versions.length; i++) {
      let item = state.versions[i];

      if (item.versionId === versionId) {
        console.log(`remove param[${versionId}] in state.versions`);
        state.versions.splice(i, 1);
        break;
      }
    }
  }

};

export default mutations;
