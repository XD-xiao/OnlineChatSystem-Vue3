import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index.js'
// main.ts 或 main.js 中
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
