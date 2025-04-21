import debounceDirective from '@/directives/debounce'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

// Components
import App from './App.vue'

// Vuetify
import vuetify from './plugins/vuetify'

// unocss
import 'uno.css'
import 'virtual:uno.css'

import 'virtual:unocss-devtools'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(vuetify)

app.directive('debounce', debounceDirective)
app.mount('#app')
