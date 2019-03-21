import Vue from 'vue'
import VueResource from 'vue-resource'
import appEntry from './main'
import common from 'commonFunc'
import router from './routes';
import $ from 'jquery'

router.beforeEach(function(to, from, next) {
    const toPath = to.path
    const fromPath = from.path
    console.log('to: ' + toPath + ' from: ' + fromPath)
    console.log('to: ' + toPath.replace('.html', ''))
    // var token = common.getStoreData('token')
    // if (typeof (token) !== 'string') {
    //   if (toPath !== '/login') {
    //     next('/login')
    //   }
    // }
    next()
})

router.afterEach(route => {
    console.log(`成功浏览到: ${route.path}`)
})

// Resource
Vue.use(VueResource)

Vue.http.options.root = '/root'
Vue.http.headers.common['Content-Type'] = 'application/json'

Vue.http.interceptors.push((request, next) => {
    $('.btn').addClass('disabled')
    var load = new Loading();
    load.init();
    load.start();
    var token = common.getStoreData('token')
    if (typeof(token) === 'string') {
        Vue.http.headers.common['authorization'] = token
    }

    // continue to next interceptor
    next((response) => {
        $('.btn').removeClass('disabled')
        load.stop();
    })
})

var eventHub = new Vue()
window.eventHub = eventHub

const app = new Vue({
    router,
    render: h => h(appEntry)
}).$mount('#app')
