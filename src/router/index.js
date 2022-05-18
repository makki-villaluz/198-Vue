import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue' 
import Home from '../views/Home.vue'
import Vehicles from '../views/Vehicles.vue'
import Routes from '../views/Routes.vue'
import Parameters from '../views/Parameters.vue'
import Admin from '../views/Admin.vue'
import About from '../views/About.vue'
import Analyzed from '../views/Analyzed.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: Vehicles,
  },
  {
    path: '/routes',
    name: 'Routes',
    component: Routes,
  },
  {
    path: '/parameters',
    name: 'Parameters',
    component: Parameters,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/vehicles/analyzed/:id',
    name: 'Analyzed',
    component: Analyzed,
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
