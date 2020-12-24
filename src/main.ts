import { createApp } from 'vue'
import App from './App'
import Store from './store'
import Router from './router'
import './index.less'

const app = createApp(App)
app.use(Store)
app.use(Router)
app.mount('#app')
