import * as types from './bpmnMutationTypes';
import arrayUtil from '../../../util/arrayUtil';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.BPMN_RULE_QUERY_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },
  [types.BPMN_RULE_QUERY_COUNT_SUC](state, {totalCount}) {
    state.totalCount = totalCount;
  },

  [types.BPMN_RULE_QUERY_BEGIN](state) {
    state.rules = [];
  },
  [types.BPMN_RULE_QUERY_SUC](state, {rules}) {
    state.rules = rules;
  },

  [types.BPMN_RULE_DEL_BEGIN](state) {

  },

  [types.BPMN_RULE_DEL_SUC](state, {deploymentId}) {
    arrayUtil.removeItem(state.rules, 'deploymentId', deploymentId);
  },

  [types.BPMN_TASK_QUERY_MY_TASKS_COUNT_BEGIN](state) {
    state.myTasksCount = 0;
  },
  [types.BPMN_TASK_QUERY_MY_TASKS_COUNT_SUC](state, {totalCount}) {
    state.myTasksCount = totalCount;
  },

  [types.BPMN_TASK_QUERY_MY_TASKS_BEGIN](state) {
    state.myTasks = [];
  },
  [types.BPMN_TASK_QUERY_MY_TASKS_SUC](state, {myTasks}) {
    state.myTasks = myTasks;
  },
  [types.BPMN_TASK_QUERY_TRANS_BEGIN](state) {
    state.trans = [];
  },
  [types.BPMN_TASK_QUERY_TRANS_SUC](state, {trans}) {
    state.trans = trans;
  },
  [types.BPMN_TASK_TRANSFER_USER_BEGIN](state) {

  },
  [types.BPMN_TASK_TRANSFER_USER_SUC](state, {taskId}) {
    arrayUtil.removeItem(state.myTasks, 'id', taskId);
  },

  // process Intance
  [types.BPMN_PROCESS_INSTANCE_QUERY_COMMENTS_BEGIN](state) {
    state.comments = [];
  },
  [types.BPMN_PROCESS_INSTANCE_QUERY_COMMENTS_SUC](state, {comments}) {
    state.comments = comments;
  },

  [types.BPMN_PROCESS_INSTANCE_QUERY_COUNT_BEGIN](state) {
    state.processIntancesCount = 0;
  },
  [types.BPMN_PROCESS_INSTANCE_QUERY_COUNT_SUC](state, {totalCount}) {
    state.processIntancesCount = totalCount;
  },
  [types.BPMN_PROCESS_INSTANCE_QUERY_BEGIN](state) {
    state.processIntances = [];
  },
  [types.BPMN_PROCESS_INSTANCE_QUERY_SUC](state, {processIntances}) {
    state.processIntances = processIntances;
  },

  // all workflow

  [types.BPMN_WF_APPLY_QUERY_COUNT_BEGIN](state) {
    state.myApplysCount = 0;
  },
  [types.BPMN_WF_APPLY_QUERY_COUNT_SUC](state, {totalCount}) {
    state.myApplysCount = totalCount;
  },
  [types.BPMN_WF_APPLY_QUERY_BEGIN](state) {
    state.myApplys = [];
  },
  [types.BPMN_WF_APPLY_QUERY_SUC](state, {applys}) {
    state.myApplys = applys;
  },

  //leave
  [types.BPMN_LEAVE_APPLY_BEGIN](state) {
  },
  [types.BPMN_LEAVE_APPLY_SUC](state) {
  },

  [types.BPMN_LEAVE_QUERY_BEGIN](state) {
    state.leave = {};
  },
  [types.BPMN_LEAVE_QUERY_SUC](state, {leave}) {
    state.leave = superman.extend({}, leave);
  },
  [types.BPMN_LEAVE_OUTGOING_BEGIN](state) {
  },
  [types.BPMN_LEAVE_OUTGOING_SUC](state) {
  }


};

export default mutations;
