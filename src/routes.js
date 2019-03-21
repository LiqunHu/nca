var Vue = require('vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    { path: '*', component: resolve => require(['./components/err404'], resolve) },
    { path: '/',                redirect: '/login' },
    { path: '/error404',        component: resolve => require(['./components/err404'], resolve) },
    { path: '/error401',        component: resolve => require(['./components/err401'], resolve) },
    { path: '/error',           component: resolve => require(['./components/errpage'], resolve) },
    { path: '/login',           component: resolve => require(['./views/login'], resolve) }
  ]
})
