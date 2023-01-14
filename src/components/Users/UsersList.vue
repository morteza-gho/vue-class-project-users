<template>
   <loading v-if="isLoading"></loading>
   <div v-else>
      <h1 class="h1"><i class="bi bi-person me-2"></i>{{pageTitle}}</h1>
      <table class="table table-bordered table-hover table-striped" v-if="users.length">
         <thead>
         <tr>
            <th class="text-center">Row</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Company</th>
            <th>Action</th>
         </tr>
         </thead>
         <tbody>
         <tr v-for="(user, index) in users" :key="user.id">
            <td class="text-center">{{index + 1}}</td>
            <td>{{user.name}}</td>
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
            <td>{{user.company.name}}</td>
            <td class="text-center">
               <div class="btn-group btn-group-sm">
                  <button type="button" class="btn btn-outline-primary" title="edit">
                     <i class="bi bi-pencil"></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger" title="delete">
                     <i class="bi bi-trash"></i>
                  </button>
               </div>
            </td>
         </tr>
         </tbody>
      </table>
      <items-not-found v-else></items-not-found>
   </div>
</template>

<script>
   import axios from 'axios';
   import {BASE_URL} from "../../Constants";
   import Loading from "../Global/Loading.vue";
   import ItemsNotFound from "../Global/ItemsNotFound.vue";

   export default {
      name: "UsersList",
      components: {ItemsNotFound, Loading},
      data() {
         return {
            pageTitle: 'Users List',
            users: [],
            isLoading: false
         }
      },
      created() {
         this.getUsers();
      },
      methods: {
         getUsers() {
            this.isLoading = true;
            axios.get(BASE_URL + '/users').then(res => {
               this.isLoading = false;
               this.users = res.data;
            }, (err) => {
               this.isLoading = false;
               alert(err.message)
            })
         }
      }
   }
</script>

<style scoped>

</style>