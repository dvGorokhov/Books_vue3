import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)
app.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  app.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}
app.use(router)
app.use(VueAxios, axios)
app.use(store)

app.mount('#app')
