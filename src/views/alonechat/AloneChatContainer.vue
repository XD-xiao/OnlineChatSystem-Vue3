<script setup>

import { ref } from "vue";

import AloneChatList from "@/views/alonechat/AloneChatList.vue";
import AloneChatPanel from "@/views/alonechat/AloneChatPanel.vue";

const currentUser = ref(null);

</script>

<template>
<!--  <div>-->
<!--    单聊功能-->
<!--  </div>-->
  <div class="container">
    <div class="listPanel">
      <AloneChatList v-model="currentUser" />
    </div>
    <div class="showPanel">
      <AloneChatPanel :currentUser="currentUser" />
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
}
.showPanel{
  width: 80%;
  display: block;
  background-color: var(--showBackground);
}

</style>
