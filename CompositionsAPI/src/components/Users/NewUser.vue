<template>
   <div class="col-md-6 col-12">
      <Form novalidate @submit="submitForm" :validation-schema="userSchema">

         <div class="row">
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label class="form-label">username</label>
                  <Field type="text" class="form-control" name="username"
                         placeholder="Enter Username"/>
                  <ErrorMessage name="username" class="text-danger"/>
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label class="form-label">email</label>
                  <Field type="text" class="form-control" name="email"
                         placeholder="Enter email"/>
                  <ErrorMessage name="email" class="text-danger"/>
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label class="form-label">name</label>
                  <Field type="text" class="form-control" name="name"
                         placeholder="Enter name"/>
                  <ErrorMessage name="name" class="text-danger"/>
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label class="form-label">family</label>
                  <Field type="text" class="form-control" name="family"
                         placeholder="Enter family"/>
                  <ErrorMessage name="family" class="text-danger"/>
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label class="form-label">phone</label>
                  <Field type="text" class="form-control" name="phone"
                         placeholder="Enter phone"/>
                  <ErrorMessage name="phone" class="text-danger"/>
               </div>
            </div>
            <div class="col-md-6 col-12">
               <div class="mb-3">
                  <label class="form-label">website</label>
                  <Field type="text" class="form-control" name="website"
                         placeholder="Enter website"/>
                  <ErrorMessage name="website" class="text-danger"/>
               </div>
            </div>
            <div class="col-12">
               <div class="mb-3">
                  <label class="form-label">address</label>
                  <Field rows="4" class="form-control" name="address"
                         placeholder="Enter address"/>
                  <ErrorMessage name="address" class="text-danger"/>
               </div>
            </div>
         </div>

         <button type="submit" class="btn btn-success">
            <i class="bi bi-check2"></i>
            Submit
         </button>

      </Form>
   </div>
</template>

<script>
   import axios from "axios";
   import {BASE_URL} from "../../Constants";
   import {uuid} from "../../functions";
   import {Form, Field, ErrorMessage} from 'vee-validate';
   import {userSchema} from "./schemaValidations/userSchema";

   export default {
      name: "NewUser",
      components: {Form, Field, ErrorMessage},
      data() {
         return {
            isLoading: false,
            formData: {},
            userSchema
         }
      },

      methods: {

         submitForm(values) {
            const data = Object.assign(values, {id: uuid()})
            // console.log(values);
            this.isLoading = true;
            axios.post(BASE_URL + '/users', data).then(res => {
               this.isLoading = false;
               this.$toast.success('User was added successfully')
               this.$router.push('/users'); // redirect to users list
            }, (err) => {
               this.isLoading = false;
               // this.$toast.error('An error accord on Add User');
               this.$toast.error(err.message);
            });
         }
      }
   }
</script>

<style scoped>

</style>