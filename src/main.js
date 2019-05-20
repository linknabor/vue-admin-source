// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import axios from 'axios'
Vue.prototype.$axios = axios
// import '@/mock'
// 实际打包时应该不引入mock
import env from '../config/env'
/* eslint-disable */
// env === 'development' ? require('@/mock') : ''
env === 'development' ? 'http://test.e-shequ.com/msa/sso/' : ''

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(ElementUI);
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
