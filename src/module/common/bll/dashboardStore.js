

const noticeList = [{
  title: '站点正式上线',
  href: 'https://www.cd121.com/',
  createDate: '2016-12-12'
}];
const kbList = [{
  title: '弹性工作制正式发布',
  href: 'https://www.cd121.com/',
  createDate: '2016-12-12'
}];
const newSignList = [{
  title: '【置顶】签约100W,首单开门红！',
  href: 'https://www.cd121.com/',
  createDate: '2016-12-12'
}];


const state = {
  todoCount: 0,
  warningCount: 0,
  emailUnReadCount: 0,
  unSignCount: 0,
  todayOrderCount: 0,
  yesterdayOrderCount: 0,
  refuseOrderCount: 0,
  yesterdayTradeCount: 0,
  noticeList,
  kbList,
  newSignList
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
