<template>
   <div class="col-md-6 col-12">
      <form novalidate @submit.prevent="submitForm">

         <div class="row">
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label for="username" class="form-label">username</label>
                  <input type="text" class="form-control" id="username" v-model="formData.username"
                         placeholder="Enter Username">
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label for="email" class="form-label">email</label>
                  <input type="text" class="form-control" id="email" v-model="formData.email"
                         placeholder="Enter email">
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label for="name" class="form-label">name</label>
                  <input type="text" class="form-control" id="name" v-model="formData.name"
                         placeholder="Enter name">
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label for="family" class="form-label">family</label>
                  <input type="text" class="form-control" id="family" v-model="formData.family"
                         placeholder="Enter family">
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label for="phone" class="form-label">phone</label>
                  <input type="text" class="form-control" id="phone" v-model="formData.phone"
                         placeholder="Enter phone">
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label for="website" class="form-label">website</label>
                  <input type="text" class="form-control" id="website" v-model="formData.website"
                         placeholder="Enter website">
               </div>
            </div>
            <div class="col-12">
               <div class="mb-3">
                  <label for="address" class="form-label">address</label>
                  <textarea rows="4" class="form-control" id="address" v-model="formData.address"
                            placeholder="Enter address"></textarea>
               </div>
            </div>
         </div>

         <button type="submit" class="btn btn-success">
            <i class="bi bi-check2"></i>
            Submit
         </button>

      </form>
   </div>
</template>

<script>
   import axios from "axios";
   import {BASE_URL} from "../../Constants";

   export default {
      name: "EditUser",
      data() {
         return {
            isLoading: false,
            formData: {}
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
               this.formData = res.data;
            }, (err) => {
               this.isLoading = false;
               this.$toast.error(err.message);
            })
         },

         submitForm() {
            this.isLoading = true;
            axios.put(BASE_URL + `/users/${this.formData.id}`, this.formData).then(res => {
               this.isLoading = false;
               this.$toast.success('User was updated successfully')
               this.$router.push('/users'); // redirect to users list
            }, (err) => {
               this.isLoading = false;
               this.$toast.error(err.message);
            })

         }
      }
   }
</script>

<style scoped>

</style>