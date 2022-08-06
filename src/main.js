import Vue from 'vue'
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';
import router from './router';
import Componets from './components/FormatIntroduce';
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/style/index.css'

Vue.use(VueAxios, axios);
Vue.prototype.$message = Message;

Componets.forEach(function(item) {
	Vue.use(item)
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
