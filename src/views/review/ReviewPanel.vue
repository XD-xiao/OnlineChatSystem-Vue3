<script setup>

import {watch} from "vue";

const props = defineProps({
  currentObject: {
    type: Number,
    default: 0
  }
})
watch(
    () => props.currentObject , () => {
      console.log("currentGroup:" + props.currentObject);
      // getGroupData();
      // getChatHistory();
    }
)

</script>

<template>
  审核面板{{props.currentObject}}
</template>

<style scoped>

</style>
