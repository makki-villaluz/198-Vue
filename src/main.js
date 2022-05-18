import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './plugins/bootstrap-vue';
import { BootstrapVue, BIconCircle, BIconCircleFill, BIconPencilSquare, BIconUpload, BIconPlus, BIconCheck2, BIconX} from 'bootstrap-vue'

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
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
Vue.component('BIconCircle', BIconCircle)
Vue.component('BIconCircleFill', BIconCircleFill)
Vue.component('BIconPencilSquare', BIconPencilSquare)
Vue.component('BIconUpload', BIconUpload)
Vue.component('BIconPlus', BIconPlus)
Vue.component('BIconCheck2', BIconCheck2)
Vue.component('BIconX', BIconX)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
