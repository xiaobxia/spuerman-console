import actions from './cacheAction';
import mutations from './cacheMutation';

const state = {
  value: null
};

const getters = {
  getSysCacheValue: state => state.value
};

export default {
  state,
  getters,
  actions,
  mutations
};
