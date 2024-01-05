import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import EntryPoint from './EntryPoint.vue'
import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import the CSS

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const pinia = createPinia()

const app = createApp(EntryPoint)

const toastOptions: PluginOptions = {
    // You can set your default options here
};

app.component("v-select", vSelect)

app.use(Toast, toastOptions);
app.use(router)
app.use(pinia)

app.mount('#app')