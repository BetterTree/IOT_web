import * as login from './login'
import * as user from './user'
import * as project from './project'
import * as widget from './widget'
import * as device from './device'
import Vue from 'vue'

const api = {
  ...login,
  ...user,
  ...project,
  ...widget,
  ...device
}

api.install = () => {
  Vue.prototype.$api = api
}

export default api
