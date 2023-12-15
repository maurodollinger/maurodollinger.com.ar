import Vue from 'vue'
import App from './App.vue'

import VueMobileDetection from "vue-mobile-detection";
import Router from "vue-router";
import VueMeta from 'vue-meta'


import Landing from "./components/Landing";
import Front from './components/Front';
import Genart from './components/Genart';
import GenartProject from './components/GenartProject';
import GenartToken from './components/GenartToken';

Vue.use(VueMobileDetection);
Vue.use(Router);
Vue.use(VueMeta);

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Landing },
  { path: '/genart', component: Genart },
  { path: '/frontend', component: Front },
  { path: '/genart/:projectid', component: GenartProject},
  { path: '/genart/:projectid/:tokenid', component: GenartToken}
]

const router = new Router({
  routes,
  linkActiveClass: "active",
  mode: "history"
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
