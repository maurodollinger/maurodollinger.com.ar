import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import Front from '../components/Front.vue'
import Genart from '../components/Genart.vue'
import GenartProject from '../components/GenartProject.vue'
import GenartToken from '../components/GenartToken.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/genart', component: Genart },
  { path: '/frontend', component: Front },
  { path: '/genart/:projectid', component: GenartProject },
  { path: '/genart/:projectid/:tokenid', component: GenartToken }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
