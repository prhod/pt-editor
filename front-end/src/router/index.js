import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DefaultView from '../views/DefaultView.vue'

/* eslint-disable no-unused-vars */
var _ = require("lodash");
/* eslint-enable no-unused-vars */


Vue.use(VueRouter)

const routes = [
  {
    path: "/data-sources/:data_source_id",
    component: DefaultView,
    children: [
      {
        path: "networks",
        name: "networks",
        component: () =>
          import(
            /* webpackChunkName: "data_source" */ "@/components/Networks.vue"
          )
      },
      {
        path: "",
        name: "data_source",
        component: () =>
          import(
            /* webpackChunkName: "data_source" */ "@/components/DataSource.vue"
          )
      },
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
