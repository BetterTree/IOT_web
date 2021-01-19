import Vue from 'vue'

export function formatDate (date, fmt) {
  if (date === undefined || date === '') { return '' }
  date = date.toString().replace(/-+/g, '/')
  let newDate = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

function formatNumber (data) {
  if (data == null || data === undefined) {
    return ''
  }
  var parts = data.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

let filters = {
  formatDate,
  formatNumber
}
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export default filters
