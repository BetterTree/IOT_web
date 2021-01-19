import { getMessageCount } from '@/api/message'

const message = {
  state: {
    count: JSON.parse(sessionStorage.getItem('count')) || {
      activityNum: 0,
      subjectNum: 0
    }
  },
  mutations: {
    SET_COUNT: (state, count) => {
      state.count = count
      sessionStorage.setItem('count', JSON.stringify(count))
    }
  },
  actions: {
    async getMessageCountAsync ({ commit }) {
      let { data } = await getMessageCount()
      commit('SET_COUNT', data)
    }
  }
}

export default message
