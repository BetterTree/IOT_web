import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use(
    config => {
        config.headers = {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('Token'))
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log(error.response)
        return Promise.reject(error.response)
    }
)

export default async(url = '', data = {}, type = 'GET', queryData = {}, showError = true) => {
    type = type.trim().toUpperCase()
    if (type == 'GET') {
        queryData = data
    }
    try {
        const response = await axios({
            method: type,
            url: url,
            params: queryData,
            data: data
        })
        return response.data
    } catch (error) {
        if (error) {
            if (showError) {
                if (error.status == 401) {
                    Vue.prototype.$message.error('账户未登录或会话已过期')
                    router.push('/login')
                } else
                    Vue.prototype.$message.error(error.message || '')
            }
        } else {
            if (showError) {
                console.log('未知网络错误')
                    //Vue.prototype.$message.error('未知网络错误') 
            }
        }
    }
}