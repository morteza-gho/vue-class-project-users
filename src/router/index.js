import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/Home/Home.vue";
import NotFound from "../components/Global/NotFound.vue";
import UsersList from "../components/Users/UsersList.vue";
import Users from "../components/Users/Users.vue";
import NewUser from "../components/Users/NewUser.vue";
import ShowUser from "../components/Users/ShowUser.vue";

const routes = [
   {path: "/", name: 'home', component: Home},
   {
      path: '/users', name: 'users', component: Users, children: [
         {path: '', name: 'usersList', component: UsersList},
         {path: 'new', name: 'newUser', component: NewUser},
         {path: ':id/show', name: 'showUser', component: ShowUser},
      ]
   },
   {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
];

const router = createRouter({
   history: createWebHistory(),
   routes,
   linkActiveClass: 'active',
   linkExactActiveClass: 'active'
})

export default router;