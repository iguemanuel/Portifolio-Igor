import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Importação do ícone necessário
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Adicionar ícones à biblioteca
library.add(faInstagram, faLinkedin, faGithub)

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Registrar o componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
