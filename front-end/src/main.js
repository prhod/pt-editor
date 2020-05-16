import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.config.productionTip = false;

if (window.Cypress) {
  // only available during E2E tests
  window.__store__ = store;
}
