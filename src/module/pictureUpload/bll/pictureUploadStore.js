
import actions from './pictureUploadAction';
import mutations from './pictureUploadMutation';

const state = {
  currentPage: 1,
  currentEditRecord: null,
  totalCount: 0,
  files: [],
  buckets: []
};

const getters = {
  //getSysCacheValue: state => state.value
};

export default {
  state,
  getters,
  actions,
  mutations
};
