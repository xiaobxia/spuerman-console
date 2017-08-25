import http from '../../../util/httpUtil';
import * as types from './bpmnMutationTypes';

const actions = {
  queryRulesCount({commit}) {
    commit(types.BPMN_RULE_QUERY_COUNT_BEGIN);
    http.get('sys/workflow/qryProcessDefinitionCount').then(totalCount => {
      commit(types.BPMN_RULE_QUERY_COUNT_SUC, {totalCount});
    });
  },

  queryRules({commit}, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.BPMN_RULE_QUERY_BEGIN);

    return http.get(`sys/workflow/qryProcessDefinitions?pageIndex=${pageIndex}&pageSize=${pageSize}`).then(rules => {
      commit(types.BPMN_RULE_QUERY_SUC, {rules});
    })
  },

  delRule({commit}, {deploymentId}) {
    commit(types.BPMN_RULE_DEL_BEGIN);
    return http.delete(`sys/workflow/processDefinition/${deploymentId}`).then(() => {
      commit(types.BPMN_RULE_DEL_SUC, {deploymentId});
    });

  },

  queryDiagramUrl({commit}, {deploymentId, diagramResourceName}) {
    const
      url = http.generateUrl(`sys/workflow/processDefinition/image?deploymentId=${deploymentId}&resourceName=${diagramResourceName}`);
    return Promise.resolve(url);
  },

// task
  queryMyTasksCount({commit}) {
    commit(types.BPMN_TASK_QUERY_MY_TASKS_COUNT_BEGIN);
    return http.get('sys/workflow/task/myTaskCount').then(totalCount => {
      commit(types.BPMN_TASK_QUERY_MY_TASKS_COUNT_SUC, {totalCount});
    });
  },

  queryMyTasks({commit}, {pageIndex = 1, pageSize = 10} = {}) {
    commit(types.BPMN_TASK_QUERY_MY_TASKS_BEGIN);

    return http.get(`sys/workflow/task/myTasks?pageIndex=${pageIndex}&pageSize=${pageSize}`).then(myTasks => {
      commit(types.BPMN_TASK_QUERY_MY_TASKS_SUC, {myTasks});
    })
  },

  queryTaskTrans({commit}, {pid}) {
    commit(types.BPMN_TASK_QUERY_TRANS_BEGIN);

    return http.get(`sys/workflow/task/trans?pid=${pid}`).then(trans => {
      commit(types.BPMN_TASK_QUERY_TRANS_SUC, {trans})
    });
  },

  transferUser({commit}, {taskId, userCode}) {
    commit(types.BPMN_TASK_TRANSFER_USER_BEGIN);
    return http.post('sys/workflow/task/transferUser', {taskId, userCode}).then(() => {
      commit(types.BPMN_TASK_TRANSFER_USER_SUC, {taskId});
    });
  },

  queryMyApplysCount({commit}, {state}) {
    commit(types.BPMN_WF_APPLY_QUERY_COUNT_BEGIN);
    return http.get(`sys/workflow/biz/wf/count?state=${state}`).then(totalCount => {
      commit(types.BPMN_WF_APPLY_QUERY_COUNT_SUC, {totalCount});
    });
  },
  queryMyApplys({commit}, {state, pageIndex, pageSize}) {
    commit(types.BPMN_WF_APPLY_QUERY_BEGIN);

    return http.get(`sys/workflow/biz/wf/list?state=${state}&pageIndex=${pageIndex}&pageSize=${pageSize}`).then(applys => {
      commit(types.BPMN_WF_APPLY_QUERY_SUC, {applys});
    });
  },

  // process instance

  queryProcessInstanceComments({commit}, {pid}) {
    commit(types.BPMN_PROCESS_INSTANCE_QUERY_COMMENTS_BEGIN);
    return http.get(`sys/workflow/processInstance/comments?pid=${pid}`).then(comments => {
      commit(types.BPMN_PROCESS_INSTANCE_QUERY_COMMENTS_SUC, {comments});
    });
  },

  queryProcessInstancesCount({commit}) {
    commit(types.BPMN_PROCESS_INSTANCE_QUERY_COUNT_BEGIN);
    return http.get('sys/workflow/processInstance/count').then(totalCount => {
      commit(types.BPMN_PROCESS_INSTANCE_QUERY_COUNT_SUC, {totalCount});
    });
  },

  queryProcessInstances({commit}, {pageIndex, pageSize}) {
    commit(types.BPMN_PROCESS_INSTANCE_QUERY_BEGIN);
    return http.get(`sys/workflow/processInstance/list?pageIndex=${pageIndex}&pageSize=${pageSize}`).then(processIntances => {
      commit(types.BPMN_PROCESS_INSTANCE_QUERY_SUC, {processIntances});
    });
  },

  // biz process for bpmn

  applyLeave({commit}, {applyInfo}) {
    commit(types.BPMN_LEAVE_APPLY_BEGIN);

    return http.postJSON('sys/workflow/biz/leave/apply', applyInfo).then(() => {
      commit(types.BPMN_LEAVE_APPLY_SUC);
    });
  },

  updateLeave({commit}, {applyInfo}) {
    return http.postJSON('sys/workflow/biz/leave/update', applyInfo);
  },

  queryLeave({commit}, {leaveId}) {
    commit(types.BPMN_LEAVE_QUERY_BEGIN);

    return http.get(`sys/workflow/biz/leave/detail?leaveId=${leaveId}`).then(leave => {
      commit(types.BPMN_LEAVE_QUERY_SUC, {leave});
    });
  },

  queryLeaveByPid({commit}, {pid}) {
    commit(types.BPMN_LEAVE_QUERY_BEGIN);

    return http.get(`sys/workflow/biz/leave/detailByPid?pid=${pid}`).then(leave => {
      commit(types.BPMN_LEAVE_QUERY_SUC, {leave});

      return leave;
    });
  },

  changeOutGoing({commit}, {OutGoing}) {
    commit(types.BPMN_LEAVE_OUTGOING_BEGIN);

    return http.post(`sys/workflow/biz/leave/outGoing`, OutGoing).then(() => {
      commit(types.BPMN_LEAVE_OUTGOING_SUC);
    });
  }

};


export default actions;
