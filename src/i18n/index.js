/**
 * Created by shi.pengyan on 2017-04-22.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const i18n = {
  'zh': require('./zh.json'),
  'en': require('./en.json')
};

// set lang
Vue.config.lang = 'zh';
Vue.config.fallbackLang = 'zh';

// set locales
Object.keys(i18n).forEach(function (lang) {
  Vue.locale(lang, i18n[lang])
})

if (module.hot) {
  module.hot.accept(['./zh.json', './en.json'], () => {
    Vue.locale('zh', require('./zh.json'));
    Vue.locale('en', require('./en.json'));

    console.log('hot reload i18n', this, arguments)
  })
}

export default i18n
