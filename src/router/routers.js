const lazyLoading = (path, index = false) => () => System.import(`module/${path}${index ? '/index' : ''}.vue`)

// 路由定义
// 从服务器加载菜单选项

export default [
  {
    name: 'Dashboard',
    path: '/dashboard',
    meta: {icon: 'fa-tachometer'},
    component: lazyLoading('common/dashboard')
  },
  {
    name: 'User',
    path: '/user/index',
    component: lazyLoading('user/user')
  },
  {
    name: 'User Add',
    path: '/user/add',
    component: lazyLoading('user/userAdd')
  },
  {
    name: 'Role',
    path: '/role/index',
    component: lazyLoading('role/role')
  }, {
    name: 'Role Add',
    path: '/role/add',
    component: lazyLoading('role/roleAdd')
  },
  {
    name: 'Priv',
    path: '/priv/index',
    component: lazyLoading('privilege/priv')
  },
  {
    name: 'Priv Add',
    path: '/priv/add',
    component: lazyLoading('privilege/privAdd')
  },
  {
    name: 'Parameter',
    path: '/param/index',
    component: lazyLoading('param/param')
  },
  {
    name: 'Cache',
    path: '/cache/index',
    component: lazyLoading('cache/cache')
  },
  {
    name: 'JobService',
    path: '/jobservice/index',
    component: lazyLoading('jobservice/jobservice')
  },
  {
    name: 'AppMgr',
    path: '/appversion/app',
    component: lazyLoading('appversion/app')
  },
  {
    name: 'App Version',
    path: '/appversion/index',
    component: lazyLoading('appversion/appVersion')
  },
  {
    name: 'Log Audit',
    path: '/logAudit/index',
    component: lazyLoading('logAudit/index')
  },
  {
    name: 'File Upload',
    path: '/fileUpload/index',
    component: lazyLoading('fileUpload/index')
  },
  {
    name: 'Banner',
    path: '/banner/index',
    component: lazyLoading('banner/banner')
  },

  //TODO 项目化时请删除此模块
  {
    name: 'Bulletin',
    path: '/bulletin/index',
    component: lazyLoading('bulletin/bulletin')
  },
  {
    name: 'BulletinForm',
    path: '/bulletin/add',
    component: lazyLoading('bulletin/bulletinForm')
  },
  {
    name: 'Group',
    path: '/group/index',
    component: lazyLoading('group/group')
  },
  {
    name: 'Test',
    path: '/test/index',
    component: lazyLoading('test/index')
  },
  {
    name: 'Test2',
    path: '/test/index2',
    component: lazyLoading('test/index2')
  },
  {
    name: 'Picture',
    path: '/pictureUpload/index',
    component: lazyLoading('pictureUpload/index')
  },
  {
    name: 'BpmnRule',
    path: '/bpmn/rule',
    component: lazyLoading('bpmn/rule')
  },
  {
    name: 'BpmnInstance',
    path: '/bpmn/instance',
    component: lazyLoading('bpmn/instance')
  },
  {
    name: 'BpmnMyTask',
    path: '/bpmn/myTask',
    component: lazyLoading('bpmn/myTask')
  },
  {
    name: 'BpmnMyTaskHis',
    path: '/bpmn/myTaskHis',
    component: lazyLoading('bpmn/myTaskHis')
  },
  {
    name: 'BpmnApply',
    path: '/bpmn/apply',
    component: lazyLoading('bpmn/apply')
  },
  {
    name: 'BpmnWorkflowLeave',
    path: '/bpmn/workflow/leave',
    component: lazyLoading('bpmn/workflow/leave')
  },
  {
    name: 'BpmnWorkFlowLeaveDetail',
    path: '/bpmn/workflow/leaveDetail',
    component: lazyLoading('bpmn/workflow/leaveDetail')
  },
  {
    name: 'BpmnWorkFlowLeaveDetailForDepartmentLeader',
    path: '/bpmn/workflow/leaveDetailForDepartmentLeader',
    component: lazyLoading('bpmn/workflow/leaveDetailForDepartmentLeader')
  },
  {
    name: 'BpmnWorkFlowLeaveDetailForHR',
    path: '/bpmn/workflow/leaveDetailForHR',
    component: lazyLoading('bpmn/workflow/leaveDetailForHR')
  }
];
