import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../views/Home')
    },
    {
      path: '/login',
      component: () => import('../views/Login')
    },
    {
      path: '/register',
      component: () => import('../views/Register')
    },
    {
      path: '/todo',
      component: () => import('../views/TodoApp')
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') != null) {
    // Si el usuario esta logeado e intenta ingresar al login o register, lo redireccionamos hacia la ruta /todo
    if (to.path === '/login' || to.path === '/register') {
      next({ path: '/todo' })
    } else next()
  } else {
    // Si el usuario no esta logeado e intenta ingresar a una ruta que no sea home, login o register, lo redireccionamos hacia home
    if (to.path === '/' || to.path === '/login' || to.path === '/register') next()
    else next({ path: '/' })
  }
})

export default router