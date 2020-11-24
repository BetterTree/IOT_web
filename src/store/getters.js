const getters = {
  user: state => state.user.userinfo,
  sidebar: state => state.app.sidebar,
  menus: state => state.permission.menus,
  buttons: state => state.permission.buttons,
  count: state => state.message.count,
  listeners: state => state.mqttMessage.listeners,
  projects: state => state.betterui.projects
}
export default getters
