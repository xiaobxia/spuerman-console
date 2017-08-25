/**
 * Created by 周翔 on 2017/4/17.
 */
import * as types from './groupMutationTypes';

const mutations = {
  [types.GROUP_QUERY_GROUPS_BEGIN](state) {
    state.groups = [];
  },

  [types.GROUP_QUERY_GROUPS_SUC](state, {groups}) {
    state.groups = groups;
  },

  [types.GROUPS_QUERY_COUNT_BEGIN](state) {

  },
  [types.GROUPS_QUERY_COUNT_SUC](state, {totalCount}) {
    state.totalCount = totalCount
  },

  [types.GROUP_ADD_SUC] (state, {group}) {
    let groups = state.groups || [];
    groups.push(group);
    state.groups = groups;
  },

  [types.GROUP_UPDATE_SUC](state, {group}) {
    for (let i = 0; i < state.groups.length; i++) {
      let item = state.groups[i];
      if (item.groupId === group.groupId) {
        item.groupName = group.groupName;
        item.bizGroupCode = group.bizGroupCode;
        item.bizCode = group.bizCode;
        item.updateDate = group.updateDate;
        item.description = group.description;
        break;
      }
    }

  },

  [types.GROUP_DELETE_BEGIN](state) {
  },

  [types.GROUP_DELETE_SUC](state, {groupId}) {
    //从列表中移除userId
    for (let i = 0; i < state.groups.length; i++) {
      let item = state.groups[i];

      if (item.groupId === groupId) {
        console.log(`remove param[${groupId}] in state.groups`);
        state.groups.splice(i, 1);
        break;
      }
    }
  }
}

export default mutations;
