import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout/default'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
      import ('@/views/Login')
},
{
  path: '/',
  component: Layout,
  children: [{
    path: '/',
    name: 'home',
    component: () =>
            import ('@/views/index')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () =>
            import ('@/views/Profile')
  }
  ]
},
{
  path: '/account',
  component: Layout,
  children: [{
    path: '/account/forgetPwd',
    name: 'forgetPwd',
    component: () =>
        import ('@/views/Account/forgetPwd')
  },
  {
    path: '/account/regeister',
    name: 'regeister',
    component: () =>
        import ('@/views/Account/regeister')
  }
  ]
},
{
  path: '*',
  component: () =>
      import ('@/views/NotFound')
}

]

const router = new VueRouter({
routes,
mode: 'history'
})

export default router
