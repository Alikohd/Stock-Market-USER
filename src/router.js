import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/components/login.vue";
import Home from "@/components/home.vue";
import Edit from "@/components/edit.vue";
import Trades from "@/components/trades.vue";
const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/home', name: 'Home', component: Home },
    { path: '/edit', name: 'Edit', component: Edit },
    { path: '/trades', name: 'Trades', component: Trades},
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router