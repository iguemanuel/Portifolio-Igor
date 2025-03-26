import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/index.css'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Importação do ícone necessário
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBoxOpen, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { faEarthAmerica } from '@fortawesome/free-solid-svg-icons/faEarthAmerica'

// Adicionar ícones à biblioteca
library.add(faInstagram, faLinkedin, faGithub, faBoxOpen, faEnvelope, faPhone, faEarthAmerica)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)

// Registrar o componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
