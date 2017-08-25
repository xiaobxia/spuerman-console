/**
 * Created by 周翔 on 2017/4/17.
 */
import http from '../../../util/httpUtil';
import * as types from './groupMutationTypes';


const actions = {
  querySysGroups ({ commit }, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.GROUP_QUERY_GROUPS_BEGIN);
    return http.get(`sys/group/groupAdmin?pageIndex=${pageIndex}&pageSize=${pageSize}`).then(groups => {
      console.log(groups)
      commit(types.GROUP_QUERY_GROUPS_SUC, {groups});
    })
  },

  querySysGroupsCount ({ commit }) {
    commit(types.GROUPS_QUERY_COUNT_BEGIN);

    return http.get(`sys/group/count`)
      .then(totalCount => {
        commit(types.GROUPS_QUERY_COUNT_SUC, {totalCount});
      })
  },

  saveSysGroup({ commit }, group) {
    return http.post('sys/group/add', group).then(group => {
      commit(types.GROUP_ADD_SUC, {group})
    });
  },

  updateSysGroup({ commit }, group) {
    return http.post('sys/group/update', group).then(data => {
      commit(types.GROUP_UPDATE_SUC, {group})
    });
  },

  deleteSysGroup({ commit }, { groupId } = {}) {
    commit(types.GROUP_DELETE_BEGIN);

    return http.get(`sys/group/delete?id=${groupId}`).then(data => {
      commit(types.GROUP_DELETE_SUC, {groupId});
    });
  }

}


export default actions;
