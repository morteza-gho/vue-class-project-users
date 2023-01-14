import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/Home/Home.vue";
import NotFound from "../components/Global/NotFound.vue";
import UsersList from "../components/Users/UsersList.vue";

const routes = [
   {path: "/", name: 'home', component: Home},
   {path: '/users', name: 'users', component: UsersList},
   {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
];

const router = createRouter({
   history: createWebHistory(),
   routes,
   linkActiveClass: 'active',
   linkExactActiveClass: 'active'
})

export default router;