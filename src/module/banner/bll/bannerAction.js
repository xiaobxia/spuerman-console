/**
 * Created by 周翔 on 2017/3/30.
 */
import http from '../../../util/httpUtil';
import * as types from './bannerMutationTypes';


const actions = {
  querySysBanners ({ commit }) {
    commit(types.BANNER_QUERY_BANNERS_BEGIN);
    return http.get('sys/banner/bannersAdmin').then(banners => {
      console.log(banners)
      commit(types.BANNER_QUERY_BANNERS_SUC, {banners});
    })
  },
  saveSysBanner({ commit }, banner) {
    return http.post('sys/banner/add', banner).then(banner => {
      commit(types.BANNER_ADD_SUC, {banner})
    });
  },

  updateSysBanner({ commit }, banner) {
    return http.post('sys/banner/update', banner).then(data => {
      commit(types.BANNER_UPDATE_SUC, {banner})
    });
  },

  deleteSysBanner({ commit }, { id } = {}) {
    commit(types.BANNER_DELETE_BEGIN);

    return http.get(`sys/banner/delete?id=${id}`).then(data => {
      commit(types.BANNER_DELETE_SUC, {id});
    });
  },
  onlineSysBanner({ commit }, banner) {
    commit(types.BANNER_ONLINE_BEGIN, {banner});
    return http.post('sys/banner/online', banner).then(data => {
      commit(types.BANNER_ONLINE_SUC, {banner});
    });
  }
}


export default actions;
