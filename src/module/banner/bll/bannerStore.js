/**
 * Created by 周翔 on 2017/3/30.
 */
import actions from './bannerAction';
import mutations from './bannerMutation';

const state = {
  banners: []
};

const getters = {
  getSysBanners: state => state.banners
};

export default {
  state,
  getters,
  actions,
  mutations
};
