import { useUserStore } from '@/stores'
import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'

const baseURL = 'http://127.0.0.1:4523/m1/6450503-6149202-default'

const instance = axios.create({
    baseURL,
    timeout: 100000
})

instance.interceptors.request.use(
    (config) => {
        const userStore = useUserStore()
        if (userStore.token) {
            config.headers.Authorization = userStore.token
        }
        return config
    },
    (err) => Promise.reject(err)
)

instance.interceptors.response.use(
    (res) => {
        if (res.data.code === 0) {
            console.log(res.data)
            ElMessage.success(res.data.message)
            return res
        }
        ElMessage({ message: res.data.message || '服务异常', type: 'error' })
        return Promise.reject(res.data)
    },
    (err) => {
        ElMessage({ message: err.response.data.message || '服务异常', type: 'error' })
        console.log(err)
        if (err.response?.status === 401) {
            router.push('/login')
        }
        return Promise.reject(err)
    }
)

export default instance
export { baseURL }
