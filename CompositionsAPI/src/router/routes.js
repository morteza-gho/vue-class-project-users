import Home from "../components/Home/Home.vue";

const routes = [
   {path: "/", name: 'home', component: Home},
   {
      path: '/users', name: 'users', component: () => import('../components/Users/Users.vue'),
      children: [
         {path: '', name: 'usersList', component: () => import('../components/Users/UsersList.vue')},
         {path: ':id/show', name: 'showUser', component: () => import('../components/Users/ShowUser.vue')},
         {path: ':id/edit', name: 'editUser', component: () => import('../components/Users/EditUser.vue')},
      ]
   },
   {path: '/newUser', name: 'newUser', component: () => import('../components/Users/NewUser.vue')},
   {path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../components/Global/NotFound.vue')},
];

export default routes;