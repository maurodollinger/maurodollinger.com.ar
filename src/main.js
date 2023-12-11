import Vue from 'vue'
import App from './App.vue'

import VueMobileDetection from "vue-mobile-detection";
import Router from "vue-router";
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueMeta from 'vue-meta'


import Audio from "./components/Audio";
import Landing from "./components/Landing";
import Visual from "./components/Visual";
//import Code from "./components/Code";
import Objects from "./components/Objects";
import Espacio from "./components/Espacio";
//import Texto from "./components/Texto";
import Front from './components/Front';

Vue.use(VueMobileDetection);
Vue.use(Router);
Vue.use(VueYouTubeEmbed);
Vue.use(VueMeta);

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Landing },
  { path: '/audio', component: Audio },
  { path: '/gradientes', component: Visual },
  //{ path: '/visualcode', component: Code },
  { path: '/objetos', component: Objects },
  { path: '/espacio', component: Espacio },
  { path: '/frontend', component: Front}
  //{ path: '/txt', component: Texto }
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
