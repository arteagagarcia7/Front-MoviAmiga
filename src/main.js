import './assets/main.css'
//import './assets/base.css' // se puede documentar si no se usa

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import instance from './plugins/axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.$axios = instance

app.mount('#app')
