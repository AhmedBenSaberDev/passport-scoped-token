import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './axios';
import store from './store'
import spinner from './components/loading/Spinner.vue';



const app = createApp(App);

app.component('spinner',spinner);
app.use(store).use(router).mount('#app');
