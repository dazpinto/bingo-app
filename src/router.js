import Vue from 'vue'
import VueRouter from 'vue-router'
import Cards from './views/Cards.vue'
import Caller from './views/Caller.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Cards',
      component: Cards
    },
    {
      path: '/caller',
      name: 'Caller',
      component: Caller
    }
  ],
});

