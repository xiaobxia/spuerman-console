/**
 * Created by 周翔 on 2017/3/30.
 */
import * as types from './bannerMutationTypes';

const mutations = {
  [types.BANNER_QUERY_BANNERS_BEGIN](state) {
    state.banners = [];
  },
  [types.BANNER_QUERY_BANNERS_SUC](state, {banners}) {
    state.banners = banners;
  },
  [types.BANNER_ADD_SUC] (state, {banner}) {
    let banners = state.banners || [];
    banners.push(banner);
    for (let i = state.banners.length - 2; i >= 0; i--) {
      let item = state.banners[i];
      if (item.bannerOrder > banner.bannerOrder) {
        state.banners[i] = banner;
        state.banners[i + 1] = item;
      }
    }
    state.banners = banners;
  },

  [types.BANNER_UPDATE_SUC](state, {banner}) {
    for (let i = 0; i < state.banners.length; i++) {
      let item = state.banners[i];
      if (item.id === banner.id) {
        item.name = banner.name;
        item.imgUrl = banner.imgUrl;
        item.bannerOrder = banner.bannerOrder;
        item.url = banner.url;
        item.description = banner.description;
        break;
      }
    }

  },

  [types.BANNER_DELETE_BEGIN](state) {
  },

  [types.BANNER_DELETE_SUC](state, {id}) {
    //从列表中移除userId
    for (let i = 0; i < state.banners.length; i++) {
      let item = state.banners[i];

      if (item.id === id) {
        console.log(`remove param[${id}] in state.banners`);
        state.banners.splice(i, 1);
        break;
      }
    }
  },
  [types.BANNER_ONLINE_BEGIN](state, {banner}) {
    if (banner.state === 'B') {
      banner.state = 'A';
    } else {
      banner.state = 'B';
    }

  },
  [types.BANNER_ONLINE_SUC](state, {banner}) {
    for (let i = 0; i < state.banners.length; i++) {
      let item = state.banners[i];
      if (item.id === banner.id) {
        item.state = banner.state;
        break;
      }
    }
  }
}

export default mutations;
