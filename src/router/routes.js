import Home from "../components/Home/Home.vue";
import NotFound from "../components/Global/NotFound.vue";
import UsersList from "../components/Users/UsersList.vue";
import Users from "../components/Users/Users.vue";
import NewUser from "../components/Users/NewUser.vue";
import ShowUser from "../components/Users/ShowUser.vue";
import EditUser from "../components/Users/EditUser.vue";

const routes = [
   {path: "/", name: 'home', component: Home},
   {
      path: '/users', name: 'users', component: Users, children: [
         {path: '', name: 'usersList', component: UsersList},
         {path: ':id/show', name: 'showUser', component: ShowUser},
         {path: ':id/edit', name: 'editUser', component: EditUser},
      ]
   },
   {path: '/newUser', name: 'newUser', component: NewUser},
   {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
];

export  default  routes;