import { logout } from '@/api/login'
const user = {
  state: {
    userinfo: JSON.parse(sessionStorage.getItem('user')) || null
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userinfo = userInfo
      sessionStorage.setItem('user', JSON.stringify(userInfo))
    }
  },
  actions: {
    async LoginOutAsync({ commit }) {
      return logout().then(_ => {
        sessionStorage.removeItem('user')
      })
    }
  }
}
export default user
