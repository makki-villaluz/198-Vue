import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Trajectories from '../views/Trajectories.vue'
import Route from '../views/Route.vue'
import Analyzed from '../views/Analyzed.vue'
import Stop from '../views/Stop.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/trajectories',
    name: 'Trajectories',
    component: Trajectories,
  },
  {
    path: '/route',
    name: 'Route',
    component: Route,
  },
  {
    path: '/stop',
    name: 'Stop',
    component: Stop,
  },
  {
    path: '/trajectory/analyzed/:id',
    name: 'Analyzed',
    component: Analyzed,
    props: true,
  }
]

const router = new VueRouter({
  routes
})

export default router
