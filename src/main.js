import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import VueMobileDetection from 'vue-mobile-detection'

const app = createApp(App)


// Mobile detection plugin: try to use existing plugin if compatible
app.use(VueMobileDetection)

app.use(router)

app.mount('#app')
