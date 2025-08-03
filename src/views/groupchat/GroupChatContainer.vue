<script setup>

import GroupChatList from "@/views/groupchat/GroupChatList.vue";
import GroupChatPanel from "@/views/groupchat/GroupChatPanel.vue";
import {ref} from "vue";
const currentGroup = ref(null);
</script>

<template>
  <div class="container">
    <div class="listPanel">
      <GroupChatList v-model="currentGroup" />
    </div>
    <div class="showPanel">
      <GroupChatPanel :currentGroup="currentGroup" />
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
