import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/main.scss'
import 'amfe-flexible'
// @ts-ignore
import 'virtual:svg-icons-register'
// @ts-ignore
import SvgIcon from './components/SvgIcon/index.vue'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(createPinia())
app.use(router)
app.use(Vant)
app.mount('#app')
