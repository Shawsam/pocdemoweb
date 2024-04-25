import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/style/main.css'
import 'element-plus/dist/index.css'
import { lazyPlugin, numChange } from './directive'
const app = createApp(App)

app.config.globalProperties.$router = router
app.use(createPinia())
app.use(lazyPlugin)
app.use(numChange)
app.use(router)
app.mount('#app')
