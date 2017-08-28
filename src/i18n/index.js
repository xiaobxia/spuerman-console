import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import zh from './zh';
console.log('3')
Vue.use(VueI18n);

const messages = {
  zh: {
    ...zh,
    ...zhLocale
  }
};

const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages // set locale messages
});

export default i18n;
