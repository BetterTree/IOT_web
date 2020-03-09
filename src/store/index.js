import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
const path = require('path')


const files = require.context('./module', false, /\.js$/)
let modules = {}
files.keys().forEach(key => {
    let name = path.basename(key, '.js')
    modules[name] = files(key).default || files(key)
})


Vue.use(Vuex)
const store = new Vuex.Store({
    modules,
    getters,
    strict: process.env.NODE_ENV !== 'production' // 生成环境中使用严格模式会损坏性能
})

export default store