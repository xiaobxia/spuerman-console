import http from 'util/httpUtil';
import * as types from './versionMutationTypes';

const actions = {
  querySysApps ({ commit }) {
    return http.get('sys/app/apps').then(apps => {
      commit(types.VERSION_APP_QUERY_APPS_SUC, {apps});
    });
  },

  queryVersions({ commit }, pageIndex = 1, pageSize = 10) {
    commit(types.VERSION_QUERY_VERSIONS_BEGIN);

    return http.get(`sys/appversion/versions?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(versions => {
        commit(types.VERSION_QUERY_VERSIONS_SUC, {versions});
      });
  },
  queryVersionsCount ({ commit }) {
    commit(types.VERSION_QUERY_VERSIONS_COUNT_BEGIN);

    return http.get('sys/appversion/versionsCount').then(totalCount => {
      commit(types.VERSION_QUERY_VERSIONS_COUNT_SUC, {totalCount});
    });
  },

  saveVersion ({ commit }, versionObj) {
    commit(types.VERSION_SAVE_BEGIN);

    return http.post('sys/appversion/add', versionObj).then(version => {
      version.appId = versionObj.appId;
      version.appName = versionObj.appName;

      commit(types.VERSION_SAVE_SUC, {version});
    });
  },
  updateVersion({ commit }, version) {
    return http.post('sys/appversion/update', version).then(data => {
      commit(types.VERSION_UPDATE_SUC, {version});
    });
  },

  deleteVersion({ commit }, { versionId } = {}) {
    commit(types.VERSION_DELETE_BEGIN);

    return http.delete(`sys/appversion/delete/${versionId}`).then(data => {
      commit(types.VERSION_DELETE_SUC, {versionId});
    });
  }

};

export default actions;
