const betterui = {
  state: {
    projects: []
  },
  mutations: {
    SET_PROJECTS (state, item) {
      let { id, code, name, remark } = item
      let project = state.projects.find(_ => _.id === id)
      if (project === undefined) {
        state.projects.push({
          id,
          code,
          name,
          remark
        })
      } else {
        project.code = item.code
        project.name = item.name
        project.remark = item.remark
      }
    },
    REMOVE_PROJECT (state, { id }) {
      let index = state.projects.findIndex(_ => _.id === id)
      if (index > -1) {
        state.projects.splice(index, 1)
      }
    },
    RUN_PROJECT (state, { id, isRunning }) {
      let project = state.projects.find(_ => _.id === id)
      project.isRunning = isRunning
    },
    CLOSE_PROJECT (state) {
      state.projects = []
    }
  },
  actions: {}
}

export default betterui
