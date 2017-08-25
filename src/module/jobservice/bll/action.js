/**
 * Created by shi.pengyan on 2017-01-12.
 */
import http from '../../../util/httpUtil';
import * as types from './mutationTypes';

const actions = {

  querySysJob({ commit }, { jobId } = {}) {
    //commit(types.JOB_QUERY_JOB_BEGIN);

    return http.get(`sys/job/${jobId}`).then(job => {
      //commit(types.JOB_QUERY_JOB_SUC, {job});
      return job;
    })
  },

  querySysJobs ({ commit }, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.JOB_QUERY_JOBS_BEGIN);

    return http.get(`sys/job/jobs?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then(jobs => {
        commit(types.JOB_QUERY_JOBS_SUC, {jobs});
      })
  },

  querySysJobsCount ({ commit }) {
    return http.get(`sys/job/jobsCount`)
      .then(totalCount => {
        commit(types.JOB_QUERY_JOBS_COUNT_SUC, {totalCount});
      })
  },

  saveSysJob({ commit }, job) {
    return http.post('sys/job/add', job).then(job => {
      commit(types.JOB_ADD_SUC, {job})
    });
  },

  updateSysJob({ commit }, job) {
    return http.post('sys/job/update', job).then(() => {
      commit(types.JOB_UPDATE_SUC, {job})
    });
  },

  deleteSysJob({ commit }, { jobId } = {}) {
    commit(types.JOB_DELETE_BEGIN);

    return http.delete(`sys/job/delete/${jobId}`).then(() => {
      commit(types.JOB_DELETE_SUC, {jobId});
    });
  }
};


export default actions;
