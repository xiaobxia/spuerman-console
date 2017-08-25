/**
 * Created by 周翔 on 2017/4/11.
 */
import * as types from './bulletinMutationTypes';

const mutations = {
  [types.BULLETIN_QUERY_BULLETINS_BEGIN](state) {
    state.bulletins = [];
  },
  [types.BULLETIN_QUERY_BULLETINS_SUC](state, {bulletins}) {
    state.bulletins = bulletins;
  },
  [types.GROUP_QUERY_GROUPS_BEGIN](state) {
    state.groups = [];
  },
  [types.GROUP_QUERY_GROUPS_SUC](state, {groups}) {
    state.groups = groups;
    //groups.unshift({groupName: '全部内容', groupId: 0})
  },
  [types.BULLETIN_ADD_SUC] (state, {bulletin}) {
    let bulletins = state.bulletins || [];
    bulletins.push(bulletin);
    state.bulletins = bulletins;
  },
  [types.BULLETINS_QUERY_COUNT_BEGIN](state) {

  },
  [types.BULLETINS_QUERY_COUNT_SUC](state, {totalCount}) {
    state.totalCount = totalCount
  },

  [types.BULLETIN_UPDATE_SUC](state, {bulletin}) {
    for (let i = 0; i < state.bulletins.length; i++) {
      let item = state.bulletins[i];
      if (item.id === bulletin.id) {
        item.title = bulletin.title;
        item.intro = bulletin.intro;
        item.homeImgUrl = bulletin.homeImgUrl;
        item.content = bulletin.content;
        item.groupId = bulletin.groupId;
        item.type = bulletin.type;
        item.state = bulletin.state;
        item.description = bulletin.description;
        break;
      }
    }

  },

  [types.BULLETIN_DELETE_BEGIN](state) {
  },

  [types.BULLETIN_DELETE_SUC](state, {id}) {
    //从列表中移除userId
    for (let i = 0; i < state.bulletins.length; i++) {
      let item = state.bulletins[i];

      if (item.id === id) {
        console.log(`remove param[${id}] in state.bulletins`);
        state.bulletins.splice(i, 1);
        break;
      }
    }
  },

  [types.BULLETIN_REVIEW_BEGIN](state, {bulletin}) {
    if (bulletin.state === 2) {
      bulletin.state = 1;
    } else {
      bulletin.state = 2;
    }

  },
  [types.BULLETIN_REVIEW_SUC](state, {bulletin}) {
    for (let i = 0; i < state.bulletins.length; i++) {
      let item = state.bulletins[i];
      if (item.id === bulletin.id) {
        item.state = bulletin.state;
        break;
      }
    }
  }
}

export default mutations;
