import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: '首页'
      },
      name: 'Index',
      component: Login
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist,
      meta: {
        title: '注册页面'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: '关于密码管理器'
      }
    }
  ]
})
