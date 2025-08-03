<script setup>

import { ref } from "vue";
import ContactsList from "@/views/contacts/ContactsList.vue";
import ContactsPanel from "@/views/contacts/ContactsPanel.vue";


const currentObject = ref(null);

</script>

<template>
  <!--  <div>-->
  <!--    单聊功能-->
  <!--  </div>-->
  <div class="container">
    <div class="listPanel">
      <ContactsList v-model="currentObject" />
    </div>
    <div class="showPanel">
      <ContactsPanel :currentObject="currentObject" />
    </div>

  </div>

</template>

<style scoped>

.container{
  display: flex;
  height: 100%;
}
.listPanel{
  width: 20%;
  background-color: var(--listBackground);
  display: block;
}
.showPanel{
  width: 80%;
  display: block;
  background-color: var(--showBackground);
}

</style>
