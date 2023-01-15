<template>

   <loading v-if="isLoading"></loading>
   <div v-else>
      <div class="d-flex justify-content-between align-items-center border-bottom mb-4">
         <h1 class="h1"><i class="bi bi-person me-2"></i>{{user ? user.name : 'Not Found'}}</h1>
         <div>
            <router-link :to="{name: 'editUser', params: {id: user.id}}" class="btn btn-primary me-2">
               <i class="bi bi-pencil"></i>
               Edit
            </router-link>
            <router-link to="/users" class="btn btn-secondary">
               <i class="bi bi-arrow-left"></i>
               Back
            </router-link>
         </div>
      </div>

      <div v-if="user">
         <div class="fs-5">
            <p><span>Name:</span> <b class="text-muted">{{user.name}}</b></p>
            <p><span>Username:</span> <b class="text-muted">{{user.username}}</b></p>
            <p><span>Email:</span> <b class="text-muted">{{user.email}}</b></p>
            <p><span>Phone:</span> <b class="text-muted">{{user.phone}}</b></p>
            <p><span>Website:</span> <b class="text-muted">{{user.website}}</b></p>
            <p><span>Address:</span> <b class="text-muted">{{user.address.city}} - {{user.address.street}} -
               {{user.address.suite}}</b></p>
            <p><span>Company:</span> <b class="text-muted">{{user.company.name}}</b></p>
         </div>
      </div>
      <items-not-found v-else></items-not-found>
   </div>
</template>

<script>
   import ItemsNotFound from "../Global/ItemsNotFound.vue";
   import Loading from "../Global/Loading.vue";
   import axios from "axios";
   import {BASE_URL} from "../../Constants";

   export default {
      name: "ShowUser",
      components: {ItemsNotFound, Loading},
      data() {
         return {
            user: null,
            isLoading: false
         }
      },
      created() {
         this.getUserData();
      },
      methods: {
         getUserData() {
            this.isLoading = true;
            axios.get(BASE_URL + `/users/${this.$route.params.id}`).then(res => {
               this.isLoading = false;
               this.user = res.data;
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