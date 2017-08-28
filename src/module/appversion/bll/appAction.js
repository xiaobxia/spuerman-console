import http from '../../../util/httpUtil';
import * as types from './appMutationTypes';

const actions = {

  querySysApp({ commit }, { appId } = {}) {
    //commit(types.APP_QUERY_APP_BEGIN);

    return http.get(`sys/app/${appId}`).then(app => {
      //commit(types.APP_QUERY_APP_SUC, {app});
      return app;
    });
  },

  querySysApps ({ commit }) {
    commit(types.APP_QUERY_APPS_BEGIN);

    return http.get('sys/app/apps').then(apps => {
      commit(types.APP_QUERY_APPS_SUC, {apps});
    });
  },

  saveSysApp({ commit }, app) {
    return http.post('sys/app/add', app).then(app => {
      commit(types.APP_ADD_SUC, {app});
    });
  },

  updateSysApp({ commit }, app) {
    return http.post('sys/app/update', app).then(data => {
      commit(types.APP_UPDATE_SUC, {app});
    });
  },

  deleteSysApp({ commit }, { appId } = {}) {
    commit(types.APP_DELETE_BEGIN);

    return http.delete(`sys/app/delete/${appId}`).then(data => {
      commit(types.APP_DELETE_SUC, {appId});
    });
  }
};


export default actions;
