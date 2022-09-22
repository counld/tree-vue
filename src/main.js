import Vue from 'vue'
import App from './App.vue';
import { Message, MessageBox } from 'element-ui';
import router from './router';
import Componets from './components/FormatIntroduce';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { scrollTop } from './utils/scrollTop.js';
import './assets/style/index.css';
import * as echarts from "echarts";

Vue.prototype.$echarts = echarts;
Vue.prototype.$scrollTop = scrollTop;

Vue.use(VueAxios, axios);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;

Componets.forEach(function(item) {
	Vue.use(item)
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
