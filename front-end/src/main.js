import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

Vue.config.productionTip = false
/* eslint-disable no-unused-vars */
var _ = require("lodash");
/* eslint-enable no-unused-vars */

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (window.Cypress) {
  // only available during E2E tests
  window.__store__ = store;
}
