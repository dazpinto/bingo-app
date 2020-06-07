import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import VueClipboard from 'vue-clipboard2'

import App from './App.vue';
import router from './router.js';
import store from './store.js';

Vue.use(VueClipboard);

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
