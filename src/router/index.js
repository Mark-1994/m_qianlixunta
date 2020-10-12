import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
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
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/other_user/:id',
    name: 'OtherUser',
    component: () => import('../views/OtherUser.vue')
  },
  {
    path: '/member',
    name: 'Member',
    component: () => import('../views/Member.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/Pay.vue')
  },
  {
    path: '/message_lists',
    name: 'MessageLists',
    component: () => import('../views/MessageLists.vue')
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('../views/Me.vue')
  },
  {
    path: '/meet',
    name: 'Meet',
    component: () => import('../views/Meet.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path === '/login') return next()
  else if (to.path === '/index') return next()
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
