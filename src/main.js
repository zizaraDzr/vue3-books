import { createApp } from 'vue'
import App from './App.vue'
import Modals from './components/plugins/modal/index'

const app = createApp(App)
app.use(Modals)
app.mount('#app')