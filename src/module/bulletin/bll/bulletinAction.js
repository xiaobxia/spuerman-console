/**
 * Created by 周翔 on 2017/4/11.
 */
import http from '../../../util/httpUtil';
import * as types from './bulletinMutationTypes';


const actions = {
  queryBulletin({ commit }, { id } = {}) {
    //commit(types.USER_QUERY_USER_BEGIN);

    return http.get(`sys/bulletin/query?id=${id}`).then(bulletin => {
      //commit(types.USER_QUERY_USER_SUC, {user});
      return bulletin;
    })
  },
  queryGroup({ commit }, { biz } = {}) {
    commit(types.GROUP_QUERY_GROUPS_BEGIN);
    return http.get(`sys/group/byBiz?biz=${biz}`).then(groups => {
      commit(types.GROUP_QUERY_GROUPS_SUC, {groups});
    })
  },


  querySysBulletinsCount ({ commit }, { groupId = 0 } = {}) {
    commit(types.BULLETINS_QUERY_COUNT_BEGIN);

    return http.get(`sys/bulletin/count?groupId=${groupId}`)
      .then(totalCount => {
        commit(types.BULLETINS_QUERY_COUNT_SUC, {totalCount});
      })
  },
  querySysBulletins ({ commit }, {groupId = 0, pageIndex = 1, pageSize = 10} = {}) {
    commit(types.BULLETIN_QUERY_BULLETINS_BEGIN);
    return http.get(`sys/bulletin/bulletinAdmin?groupId=${groupId}&pageIndex=${pageIndex}&pageSize=${pageSize}`).then(bulletins => {
      console.log(bulletins)
      commit(types.BULLETIN_QUERY_BULLETINS_SUC, {bulletins});
    })
  },
  //querySysBulletinsByGroupId ({ commit }, {groupId, pageIndex = 1, pageSize = 10} = {}) {
  //  commit(types.BULLETIN_QUERY_BULLETINS_BEGIN);
  //  return http.get(`sys/bulletin/bulletinByGroupId?groupId=${groupId}&pageIndex=${pageIndex}&pageSize=${pageSize}`).then(bulletins => {
  //    console.log(bulletins)
  //    commit(types.BULLETIN_QUERY_BULLETINS_SUC, {bulletins});
  //  })
  //},
  saveSysBulletin({ commit }, bulletin) {
    return http.post('sys/bulletin/add', bulletin).then(bulletin => {
      commit(types.BULLETIN_ADD_SUC, {bulletin})
    });
  },

  updateSysBulletin({ commit }, bulletin) {
    return http.post('sys/bulletin/update', bulletin).then(data => {
      commit(types.BULLETIN_UPDATE_SUC, {bulletin})
    });
  },

  deleteSysBulletin({ commit }, { id } = {}) {
    commit(types.BULLETIN_DELETE_BEGIN);

    return http.get(`sys/bulletin/delete?id=${id}`).then(data => {
      commit(types.BULLETIN_DELETE_SUC, {id});
    });
  },

  reviewSysBulletin({ commit }, bulletin) {
    commit(types.BULLETIN_REVIEW_BEGIN, {bulletin});
    return http.post('sys/bulletin/review', bulletin).then(data => {
      commit(types.BULLETIN_REVIEW_SUC, {bulletin});
    });
  }
}


export default actions;
