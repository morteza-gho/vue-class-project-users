<template>

   <loading v-if="isLoading"></loading>
   <div v-else>
      <div class="d-flex justify-content-between align-items-center border-bottom mb-4">
         <h1 class="h1"><i class="bi bi-person me-2"></i>{{user ? user.name : 'Not Found'}}</h1>
         <router-link to="/users" class="btn btn-secondary">Back</router-link>
      </div>

      <div v-if="user"></div>
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