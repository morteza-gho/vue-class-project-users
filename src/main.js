import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index';

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap 5.2
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App);

app.use(router);
app.mount('#app');
