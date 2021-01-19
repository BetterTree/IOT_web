import mqtt from 'mqtt'
import { arrayToString } from '@/utils/uint8ArrayUtil'

const mqttMessage = {
  state: {
    client: null,
    listeners: []
  },
  mutations: {
    MQTT_CONNECT(state, { client, uesrInfo }) {
      state.client = client
    },
    SET_MQTTMESSAGE(state, { projectId, code, value }) {
      let temp = state.listeners.find(_ => _.projectId == projectId)
      if (temp == undefined) {
        state.listeners.push({
          projectId,
          widget: [{
            code,
            value
          }]
        })
      } else {
        let tempWidget = temp.widget.find(_ => _.code === code)
        if (tempWidget === undefined) {
          temp.widget.push({
            code,
            value
          })
        }
        else {
          tempWidget.value = value
        }
      }
    }
  },
  actions: {
    MQTTConnect({ state, commit }, projectId) {
      const client = mqtt.connect(process.env.VUE_APP_MQTT_URL, {
        username: process.env.VUE_APP_MQTT_USERNAME,
        password: process.env.VUE_APP_MQTT_PASSWORD
      })
      client.on('connect', function() {
        client.subscribe(`${projectId}/arduino/#`, {
          qos: 2
        }, function(err) {
          if (err) {
            console.warn('====订阅MQTT消息失败====')
            console.log(err)
          }
        })
      })
    },
    MQTTWidgetConnect({ state, commit }, { projectId, modelId }) {
      const client = mqtt.connect(process.env.VUE_APP_MQTT_URL, {
        username: process.env.VUE_APP_MQTT_USERNAME,
        password: process.env.VUE_APP_MQTT_PASSWORD
      })
      client.on('connect', function() {
        client.subscribe(`${projectId}/arduino/${modelId}`, {
          qos: 2 }, function (err) {
          if (err) {
            console.warn('====订阅MQTT消息失败====')
            console.log(err)
          }
        })
        // commit('MQTT_CONNECT', { client })
      })
      client.on('message', function(topic, message) {
        let [projectId, modelId] = topic.split('/')
        let newMsg = {
          projectId: projectId,
          code: modelId,
          value: arrayToString(message)
        }
        commit('SET_MQTTMESSAGE', newMsg)
      })
    }
  }
}

export default mqttMessage
