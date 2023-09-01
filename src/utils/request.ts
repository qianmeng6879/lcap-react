import axios from 'axios'
import { message } from 'antd'
import { Method, AxiosRequestConfig } from 'axios'

// export const remoteUrl = 'http://mxzero.top'
export const remoteUrl = 'http://localhost:8080'
// export const remoteUrl = 'http://192.168.1.4:8080'

import { router } from '@/App'
const service = axios.create({
    baseURL: remoteUrl
})

service.interceptors.request.use(config => {
    const token = localStorage.getItem("access_toten") || sessionStorage.getItem("access_token")
    if (token) {
        config.headers.Authorization = "Bearer " + token
    }
    return config
})

service.interceptors.response.use(
    success => success.data,
    error => {
        if (!error.response) {
            message.error("网络错误")
        }

        switch (error.response.status) {
            case 400:
                message.error(error.response.data.message)
                break
            case 401:
                message.error("请先登录")
                router("/login?next=" + location.pathname)
                break
            case 403:
                message.error("无访问权限")
                break
            case 500:
                message.error("服务器错误")
        }

        return Promise.reject(error.response)
    }
)



const request = <T>(url: string, method: Method, submitData: object = {}, config: AxiosRequestConfig = {}) => {
    return service.request<T, T>({
        url,
        method,
        [method.toLocaleLowerCase() === 'get' ? "params" : "data"]: submitData,
        ...config
    })
}

export default request