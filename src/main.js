//https://webdevblog.ru/autentifikacii-v-vue-s-ispolzovaniem-vuex/
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
//import { create } from 'core-js/core/object'

const app = createApp(App)
    .use(store)
    .use(router)

app.config.globalProperties.$http = axios;
//const token = localStorage.getItem('token')
//if (token) {
    //app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
    //app.config.globalProperties.$http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
//}

app.mount('#app')
