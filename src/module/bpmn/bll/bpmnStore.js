import actions from './bpmnAction';
import mutations from './bpmnMutation';

const state = {
  currentPage: 1,
  currentEditRecord: null,
  totalCount: 0,
  rules: [],

  myApplys: [],
  myApplysCount: 0,
  myTasks: [],
  myTasksCount: 0,
  myTaskHis: [],
  myTaskHisCount: 0,

  // 流程实例总数
  processIntancesCount: 0,
  processIntances: [],

  trans: [],
  comments: [],
  leaveTypes: [
    {value: 0, name: '调休'},
    {value: 1, name: '病假'},
    {value: 2, name: '事假'},
    {value: 3, name: '年假'},
    {value: 4, name: '路途假'},
    {value: 5, name: '婚假'},
    {value: 6, name: '陪产假'},
    {value: 7, name: '产假'},
    {value: 8, name: '丧假'},
    {value: 9, name: '其他'}
  ],
  leave: {}
};

const getters = {};

export default {
  state,
  getters,
  actions,
  mutations
};
