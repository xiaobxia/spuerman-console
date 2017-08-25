/**
 * Created by shi.pengyan on 2017-01-05.
 */
import actions from './fileUploadAction';
import mutations from './fileUploadMutation';

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
