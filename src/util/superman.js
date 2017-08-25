import Vue from 'vue';
import store from '../store';
import * as types from '../store/mutationTypes';

import baseExtend from './extend';

let cache = {};

let superman = {
  'extend': baseExtend,
  /**
   * 动态添加路由(适用于局部页面加载场景，不适用于全局页面加载)
   * @param name
   * @param component
   */
  registerRouter(name, component) {
    if (cache[name]) {
      return;
    }

    cache[name] = true;
    Vue.component(name, component);
    store.commit(types.GLOBAL_ADD_ROUTES, {name, component});
  }
};
window.superman = superman;
