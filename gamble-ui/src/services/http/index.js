import auth from '@services/auth'
import toast from '@services/toast'
import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
})

http.interceptors.request.use(function (config) {
  // Do something before request is sent

  if (auth.isLoggined())
    config.headers.Authorization = `Bearer ${auth.getAccessToken()}`

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  if (error?.response?.status === 401) {
    toast.confirm({
      title: 'Phiên đã hết hạn',
      text: 'Vui lòng đăng nhập lại để tiếp tục',
      icon: 'info',
      showDenyButton: false,
      onConfirmed: () => {
        auth.clearToken()
        setTimeout(() => window.location.reload(), 400)
      }
    })
  }

  if (error?.response?.data?.error) {
    return Promise.reject(error.response.data.error)
  }

  return Promise.reject(error)
})

export default http