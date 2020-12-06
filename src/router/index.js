import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import DefaultLayout from '../layouts/DefaultLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'login',
    component: Login,
  },
  {
    path: '',
    component: DefaultLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      },
      {
        path: '/countries',
        name: 'Countries',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "countries" */ '../views/Countries.vue'),
      },
      {
        path: '/cities',
        name: 'Cities',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "cities" */ '../views/Cities.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
