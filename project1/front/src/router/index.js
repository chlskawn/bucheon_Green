import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes= [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "DashboardView" */ '../views/DashboardView.vue')
  },

  {
    path: '/Schedule',
    name: 'Schedule',
    component: () => import(/* webpackChunkName: "Schedule" */ '../views/ScheduleView.vue')
  },
  {
    path: '/Post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "Post" */ '../views/board/PostListView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
