import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components'
import '@/icons'
import '@/plugins/elementUI'
import '@/plugins/slideCheck'
import '@/plugins/swiper'
import '@/filters'
import '@/permission'
import 'animate.css'
import "./styles/autosize.css"

import clipboard from '@/directive/clipboard/index.js'
import api from '@/api'
Vue.use(api)
Vue.use(clipboard)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')