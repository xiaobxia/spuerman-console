
import http from '../../../util/httpUtil';
import * as types from './pictureUploadMutationTypes';

const actions = {

  queryUploadToken({ commit }, {suffix, bucketId}) {
    return http.get(`sys/upload/token?suffix=${suffix}&bucketId=${bucketId}`);
  },

  saveUploadFile({ commit }, fileInfo) {
    return http.post('sys/upload/save', fileInfo).then(file => {
      file.bucket = fileInfo.bucketName;
      file.isPublic = fileInfo.isPublic;
      commit(types.SYS_FILE_UPLOAD_SAVE_FILE_SUC, {file});
    });
  },

  updateFile({ commit }, fileInfo) {
    return http.post('sys/upload/update', fileInfo).then(() => {
      commit(types.SYS_FILE_UPLOAD_UPDATE_SUC, {fileInfo});
    });
  },

  deleteFile({ commit }, {id}) {
    return http.delete(`sys/upload/${id}`).then(() => {
      commit(types.SYS_FILE_UPLOAD_DELETE_SUC, {id});
    });
  },

  queryFile({ commit }, {fileId}) {
    return http.get(`sys/upload/file?fileId=${fileId}`);
  },

  queryPrivFileUrl({ commit }, {fileId}) {
    return http.get(`sys/upload/priv/${fileId}`);
  },

  queryFiles ({ commit }, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.SYS_FILE_UPLOAD_QUERY_FILES_BEGIN);

    return http.get(`sys/upload/files?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(files => {
        commit(types.SYS_FILE_UPLOAD_QUERY_FILES_SUC, {files});
      });
  },

  queryPictures ({ commit }, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.SYS_FILE_UPLOAD_QUERY_FILES_BEGIN);

    return http.get(`sys/upload/pictures?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(files => {
        commit(types.SYS_FILE_UPLOAD_QUERY_FILES_SUC, {files});
      });
  },

  searchFiles({ commit }, {fileName, pageIndex = 1, pageSize = 10} = {}) {
    commit(types.SYS_FILE_UPLOAD_QUERY_FILES_BEGIN);
    return http.get(`sys/upload/searchFile?fileName=${fileName}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(files => {
        commit(types.SYS_FILE_UPLOAD_QUERY_FILES_SUC, {files});
      });
  },

  queryFilesCount ({ commit }) {
    commit(types.SYS_FILE_UPLOAD_QUERY_FILES_COUNT_BEGIN);

    return http.get('sys/upload/filesCount').then(totalCount => {
      commit(types.SYS_FILE_UPLOAD_QUERY_FILES_COUNT_SUC, {totalCount})
    });
  },

  queryPicturesCount ({ commit }) {
    commit(types.SYS_FILE_UPLOAD_QUERY_FILES_COUNT_BEGIN);

    return http.get('sys/upload/picturesCount').then(totalCount => {
      commit(types.SYS_FILE_UPLOAD_QUERY_FILES_COUNT_SUC, {totalCount})
    });
  },

  searchFilesCount ({ commit }, {fileName} = {}) {
    commit(types.SYS_FILE_UPLOAD_QUERY_FILES_COUNT_BEGIN);

    return http.get(`sys/upload/searchFileCount?fileName=${fileName}`).then(totalCount => {
      commit(types.SYS_FILE_UPLOAD_QUERY_FILES_COUNT_SUC, {totalCount})
    });
  },

  queryBuckets({ commit }) {
    commit(types.SYS_FILE_BUCKET_QUERY_LIST_BEGIN);
    return http.get('sys/fileBucket/list').then(buckets => {
      commit(types.SYS_FILE_BUCKET_QUERY_LIST_SUC, {buckets});
    })
  },

  saveBucket({ commit }, fileBucket) {
    return http.post('sys/fileBucket/add', fileBucket).then(bucket => {
      commit(types.SYS_FILE_BUCKET_ADD_SUC, {bucket});
    });
  },

  updateBucket({ commit }, fileBucket) {
    return http.post('sys/fileBucket/update', fileBucket).then(() => {
      commit(types.SYS_FILE_BUCKET_UPDATE_SUC, {fileBucket});
    });
  },

  deleteBucket({ commit }, {bucketId}) {
    return http.delete(`sys/fileBucket/${bucketId}`).then(() => {
      commit(types.SYS_FILE_BUCKET_DEL_SUC, {bucketId});
    });
  }

};


export default actions;
