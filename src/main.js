import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from '@/router'
import store from '@/store'
import axios from 'axios'

// Components
import './components'

// Definimos la ruta de nuestra API
axios.defaults.baseURL = 'https://nodejs-todo.vercel.app/api';
//axios.defaults.baseURL = 'http://localhost:3000/api'; // URI LOCAL

// Agregamos en nuestro header el token, para poder ingresar a las rutas que requieren estar logeado
axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')