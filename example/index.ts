import { createApp } from 'vue'
import MakeitAnchor from 'makeit-anchor'
import App from './app.vue'
import 'makeit-anchor/style'
import './index.less'

const app = createApp(App)
app.use(MakeitAnchor)
app.mount('#app')