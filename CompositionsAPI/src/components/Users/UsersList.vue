<template>
   <loading v-if="isLoading"></loading>
   <div v-else>
      <div class="d-flex justify-content-between align-items-center border-bottom mb-4">
         <h1 class="h1"><i class="bi bi-people me-2"></i>{{ pageTitle }}</h1>
         <router-link :to="{ name: 'newUser' }" class="btn btn-primary">
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
               <td class="text-center">{{ index + 1}}</td>
               <td>
                  <router-link :to="{ name: 'showUser', params: { id: user.id } }">{{ user.name + ' ' + user.family }}
                  </router-link>
               </td>
               <td>{{ user.username }}</td>
               <td>{{ user.email }}</td>
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

<script setup>
import axios from 'axios';
import { BASE_URL } from "../../Constants";
import Loading from "../Global/Loading.vue";
import ItemsNotFound from "../Global/ItemsNotFound.vue";
import TableActions from "../Global/TableActions.vue";
import { ref, onMounted } from 'vue'
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

const pageTitle = ref('Users List');
const isLoading = ref(false);
const users = ref([]);

const router = useRouter()
const $toast = useToast();

onMounted(() => {
   getUsers();
});

/* const getUsers = () => {
   isLoading.value = true;
   axios.get(BASE_URL + '/users').then(res => {
      isLoading.value = false;
      users.value = res.data;
   }, (err) => {
      isLoading.value = false;
      alert(err.message)
   })
}; */

const getUsers = async () => {
   isLoading.value = true;
   try {
      const { status, data } = await axios.get(BASE_URL + '/users');
      if (status == 200) {
         isLoading.value = false;
         users.value = data;
      }
   } catch (err) {
      $toast.error(err.message)
      isLoading.value = false;
   }
};

const deleteUser = (id) => {
   if (window.confirm('Are you sure to delete this User?')) {
      axios.delete(BASE_URL + `/users/${id}`).then(res => {
         const userIndex = users.value.findIndex(x => x.id === id);
         users.value.splice(userIndex, 1);
         $toast.success('User was deleted successfully')
      }, (err) => {
         $toast.error(err.message);
      })
   }
};

const onTableActionCallback = (res) => {
   switch (res.type) {
      case 'delete': {
         deleteUser(res.data.id);
      }
         break;
      case 'show': {
         router.push({ name: 'showUser', params: { id: res.data.id } })
      }
         break;
      case 'edit': {
         router.push({ name: 'editUser', params: { id: res.data.id } })
      }
         break;
   }
}

/* export default {
   name: "UsersList",
   components: {TableActions, ItemsNotFound, Loading},
   setup() {

      const pageTitle = ref('Users List');
      const isLoading = ref(false);
      const users = ref([]);

      const router = useRouter()
      const $toast = useToast();

      onMounted(() => {
         getUsers();
      });

      const getUsers = () => {
         isLoading.value = true;
         axios.get(BASE_URL + '/users').then(res => {
            isLoading.value = false;
            users.value = res.data;
         }, (err) => {
            isLoading.value = false;
            alert(err.message)
         })
      };

      const deleteUser = (id) => {
         if (window.confirm('Are you sure to delete this User?')) {
            axios.delete(BASE_URL + `/users/${id}`).then(res => {
               const userIndex = users.value.findIndex(x => x.id === id);
               users.value.splice(userIndex, 1);
               $toast.success('User was deleted successfully')
            }, (err) => {
               $toast.error(err.message);
            })
         }
      };

      const onTableActionCallback = (res) => {
         switch (res.type) {
            case 'delete': {
               deleteUser(res.data.id);
            }
               break;
            case 'show': {
               router.push({name: 'showUser', params: {id: res.data.id}})
            }
               break;
            case 'edit': {
               router.push({name: 'editUser', params: {id: res.data.id}})
            }
               break;
         }
      }

      return {pageTitle, isLoading, users, getUsers, deleteUser, onTableActionCallback}
   }

} */
</script>

<style scoped>

</style>