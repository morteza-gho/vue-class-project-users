<template>
   <loading v-if="isLoading"></loading>
   <div v-else>
      <div class="d-flex justify-content-between align-items-center border-bottom mb-4">
         <h1 class="h1"><i class="bi bi-people me-2"></i>{{pageTitle}}</h1>
         <router-link :to="{name: 'newUser'}" class="btn btn-primary">
            <i class="bi bi-plus-lg"></i>
            New user
         </router-link>
      </div>
      <table class="table table-bordered table-hover table-striped" v-if="users.length">
         <thead>
         <tr>
            <th class="text-center">Row</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
         </tr>
         </thead>
         <tbody>
         <tr v-for="(user, index) in users" :key="user.id">
            <td class="text-center">{{index + 1}}</td>
            <td>
               <router-link :to="{name: 'showUser', params: {id: user.id}}">{{user.name + ' ' + user.family}}
               </router-link>
            </td>
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
            <td class="text-center">
               <!--<div class="btn-group btn-group-sm">
                  <router-link :to="{name: 'showUser', params: {id: user.id}}" class="btn btn-outline-secondary"
                               title="show">
                     <i class="bi bi-eye"></i>
                  </router-link>
                  <router-link :to="{name: 'editUser', params: {id: user.id}}" class="btn btn-outline-primary"
                               title="edit">
                     <i class="bi bi-pencil"></i>
                  </router-link>
                  <button type="button" class="btn btn-outline-danger" title="delete" @click="deleteUser(user.id)">
                     <i class="bi bi-trash"></i>
                  </button>
               </div>-->
               <table-actions :data="user" @table-action-callback="onTableActionCallback"></table-actions>
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
   import TableActions from "../Global/TableActions.vue";

   export default {
      name: "UsersList",
      components: {TableActions, ItemsNotFound, Loading},
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
         },
         deleteUser(id) {
            if (window.confirm('Are you sure to delete this User?')) {
               axios.delete(BASE_URL + `/users/${id}`).then(res => {
                  const userIndex = this.users.findIndex(x => x.id === id);
                  this.users.splice(userIndex, 1);
                  this.$toast.success('User was deleted successfully')
               }, (err) => {
                  // this.$toast.error('An error accord on Delete User');
                  this.$toast.error(err.message);
               })
            }
         }, // deleteUser
         onTableActionCallback(res) {
            console.log(res);
            switch (res.type) {
               case 'delete': {
                  this.deleteUser(res.data.id);
               }
                  break;
               case 'show': {
                  this.$router.push({name: 'showUser', params: {id: res.data.id}})
               }
                  break;
               case 'edit': {
                  this.$router.push({name: 'editUser', params: {id: res.data.id}})
               }
                  break;
            }
         } // onTableActionCallback
      }
   }
</script>

<style scoped>

</style>