import * as types from './fileUploadMutationTypes';
import arrayUtil from 'util/arrayUtil';
import assignDeep from 'assign-deep';

/**
 * mutations
 * @type {{}}
 */
const mutations = {

  [types.SYS_FILE_UPLOAD_QUERY_TOKEN](state) {
  },
  [types.SYS_FILE_UPLOAD_SAVE_FILE_BEGIN](state) {
  },
  [types.SYS_FILE_UPLOAD_SAVE_FILE_SUC](state, {file}) {

    state.files.unshift(file);
    state.totalCount++;

  },
  [types.SYS_FILE_UPLOAD_UPDATE_SUC](state, {fileInfo}) {

    let file = state.files.find((item) => {
      return item.id === fileInfo.id;
    });

    file.description = fileInfo.description;
  },

  [types.SYS_FILE_UPLOAD_DELETE_SUC](state, {id}) {
    arrayUtil.removeObjectItem(state.files, 'id', id);
  },

  [types.SYS_FILE_UPLOAD_QUERY_FILES_BEGIN](state) {
    state.files = [];
  },

  [types.SYS_FILE_UPLOAD_QUERY_FILES_SUC](state, {files}) {
    state.files = files;
  },

  [types.SYS_FILE_UPLOAD_QUERY_FILES_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },

  [types.SYS_FILE_UPLOAD_QUERY_FILES_COUNT_SUC](state, {totalCount}) {
    state.totalCount = totalCount;
  },

  //file bucket
  [types.SYS_FILE_BUCKET_ADD_SUC](state, {bucket}) {
    state.buckets.unshift(bucket);
  },

  [types.SYS_FILE_BUCKET_UPDATE_SUC](state, {fileBucket}) {

    let bucketInfo = state.buckets.find((item) => {
      return item.bucketId === fileBucket.bucketId;
    });

    assignDeep(bucketInfo, fileBucket);
  },

  [types.SYS_FILE_BUCKET_DEL_SUC](state, {bucketId}) {
    arrayUtil.removeObjectItem(state.buckets, 'bucketId', bucketId);
  },

  [types.SYS_FILE_BUCKET_QUERY_LIST_BEGIN](state) {
    state.buckets = [];
  },

  [types.SYS_FILE_BUCKET_QUERY_LIST_SUC](state, {buckets}) {
    state.buckets = buckets;
  }

};

export default mutations;
