import 'animate.css';
import 'element-ui/lib/theme-default/index.css';
import './scss/index.scss';

import Vue from 'vue';
import NProgress from 'vue-nprogress';
import {sync} from 'vuex-router-sync';
import {ElementUI, MessageBox} from 'element-ui';

import * as filters from './filters';

import ElementLocale from 'element-ui/lib/locale';
import i18n from './i18n';

import App from './App.vue';
import router from './router';
import store from './store';
import * as types from './store/mutationTypes';
import http from './util/httpUtil';

Vue.use(NProgress);
Vue.use(ElementUI);
sync(store, router);

ElementLocale.i18n((key, value) => i18n.t(key, value));

// 进入路由前的钩子
router.beforeEach((to, from, next) => {
  // document.body.scrollTop = 0;

  // store.commit(types.GLOBAL_LOADING, {loading: true})
  switch (to.path) {
    case '/':
    case '/dashboard':
      next();
      break;
    default:
      // 不校验菜单权限
      if (to.path.indexOf('/add') !== -1 || (to.params && to.params._uncheck) || (to.query && to.query._uncheck)) {
        next();
        return;
      }

      // 菜单权限校验
      http.post('sys/user/checkUserMenuPriv', {path: to.path}).then(hasPriv => {
        if (hasPriv) {
          next()
        } else {
          next(false);// 中断当前的导航
          // closeGlobalLoading();
          MessageBox.alert('没有菜单权限，请联系您的管理员！', 'Error', {type: 'error'});
        }
      }, () => {
        // closeGlobalLoading();
      });
      break;
  }
});
// 进入路由的钩子
router.afterEach(route => {
});

// customer vue filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// Global Http Handler Begin-------
Vue.http.interceptors.push((request, next) => {
  // you can modify request in here!

  // continue to next interceptor
  next((response) => {
    var data = response.body;

    if (response.status === 0) { //ignore
      console.warn('[HTTP status=0]');
      return response;
    }
    //check resp status
    if (response.status !== 200) {

      console.info('[HTTP ERROR]', response);

      if (request.headers.has('ignoreGlobalDialog')) {
        return response;
      }

      const {errorCode, errorMessage} = response.body || {};
      let errorMsg = 'Server Internal Error. Please contact Administrator!';
      if (errorMessage) {
        errorMsg = `${errorMessage}`;
      }
      console.log(errorCode, errorMsg);
      const msg = `${response.status} ${response.statusText}; \r\n${errorMsg}`;
      MessageBox.alert(msg, 'Error', {type: 'error'});
    } else { //200
      if (data.success === false) {
        console.info('[HTTP ERROR]', response);
        switch (data.errorCode) {
          case 'USER_NEED_LOGIN':
          case 'USER_SESSION_TIMEOUT':
            //MessageBox.alert('you need login.');
            if (!store.state.globalLoginDialog) {
              store.commit(types.GLOBAL_LOGIN_DIALOG_OPEN);
            }
            break;
          default:
            if (!request.headers.has('ignoreGlobalDialog')) {
              //const msg = `[${data.errorCode}]${data.errorMessage}`;
              const msg = `${data.errorMessage}`;
              MessageBox.alert(msg, 'Error', {type: 'error'});
            }
            break;
        }
        response.ok = false;
        next(request.respondWith(data));
        //throw data; // end http request, hack it
      }

      return response;
    }
    return response;
  });
});

const nprogress = new NProgress({parent: '.nprogress-container'})

const app = new Vue({
  router,
  store,
  //i18n,
  nprogress,
  ...App
});

export {app, router, store}
