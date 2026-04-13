import { createApp } from 'vue'
import App from './App.vue'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
	duration: 700,
	easing: 'ease-out-cubic',
	once: true,
	offset: 70
})

createApp(App).mount('#app')
