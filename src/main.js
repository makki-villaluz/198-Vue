import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './plugins/bootstrap-vue';
import { BootstrapVue, BIconCircle, BIconCircleFill, BIconTrash, BIconPencilSquare, BIconInfoSquare} from 'bootstrap-vue'

import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.component('BIconCircle', BIconCircle)
Vue.component('BIconCircleFill', BIconCircleFill)
Vue.component('BIconTrash', BIconTrash)
Vue.component('BIconPencilSquare', BIconPencilSquare)
Vue.component('BIconInfoSquare', BIconInfoSquare)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
