<template>
   <div class="btn-group btn-group-sm">
      <button type="button" class="btn btn-outline-secondary" title="show" @click="onButtonClick('show')">
         <i class="bi bi-eye"></i>
      </button>
      <button class="btn btn-outline-primary" title="edit" @click="onButtonClick('edit')">
         <i class="bi bi-pencil"></i>
      </button>
      <button type="button" class="btn btn-outline-danger" title="delete" @click="onButtonClick('delete')">
         <i class="bi bi-trash"></i>
      </button>
   </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

/* export default {
   name: "TableActions",
   props: {
      data: Object
   },
   emits: ['table-action-callback'],
   setup(props, {emit}) {

      const onButtonClick = (type) => {
         emit('table-action-callback', {data: props.data, type})
      }

      return {onButtonClick}
   },
} */

const props = defineProps({
   data: Object
});

const emits = defineEmits(['table-action-callback']);

const onButtonClick = (type) => {
   emits('table-action-callback', { data: props.data, type })
}

</script>

<style scoped>

</style>