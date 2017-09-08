const state = {
  todoCount: 0,
  warningCount: 0,
  emailUnReadCount: 0,
  unSignCount: 0,
  todayOrderCount: 0,
  yesterdayOrderCount: 0,
  refuseOrderCount: 0,
  yesterdayTradeCount: 0
};

const getters = {
  getSysDashboardTodoCount: state => state.todoCount,
  getSysDashboardWarningCount: state => state.warningCount,
  getSysDashboardEmailUnReadCount: state => state.emailUnReadCount,
  getSysDashboardUnSignCount: state => state.unSignCount,
  getSysDashboardTodayOrderCount: state => state.todayOrderCount,
  getSysDashboardYesterdayOrderCount: state => state.yesterdayOrderCount,
  getSysDashboardRefuseOrderCount: state => state.refuseOrderCount,
  getSysDashboardYesterdayTradeCount: state => state.yesterdayTradeCount
};

export default {
  state,
  getters
};
