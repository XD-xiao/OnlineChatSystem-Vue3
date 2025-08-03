<script setup>
import { ref,onMounted } from 'vue'
import {Plus, Search} from "@element-plus/icons-vue";
import ChatObject from "@/components/ChatObject.vue";
import {getAloneChatListService} from "@/api/AloneChat";


const searchText = ref('');

const currentUser = ref(null)
const props = defineProps(['modelValue']) // 接收 v-model 的值
const emit = defineEmits(['update:modelValue'])

const updateCurrentUser = (item) => {
  if (currentUser.value === item.userId) return
  currentUser.value = item.userId
  emit('update:modelValue', item.userId)
  // chatListUserData.messageNum设置为0
  item.messageNum = 0;
}

const chatListUserData = ref([])
const getAloneChatList = async () => {
  const res = await getAloneChatListService()
  chatListUserData.value = res.data.data
}

onMounted(() => {
  getAloneChatList();
})


</script>

<template>
  <div class="chat-list-header">
    <el-input
        v-model="searchText"
        style="width: 200px;"
        placeholder="搜索"
        :prefix-icon="Search"
        clearable
    />
    <el-button type="info" :icon="Plus" />
  </div>
  <el-scrollbar>
    <ul>
      <li v-for="item in chatListUserData"
          :key="item.userId"
          :class="{ active: currentUser === item.userId }"
          @click="updateCurrentUser(item)"
      >
        <ChatObject :messageNum="item.messageNum">
          <template #logo>
            <img :src="item.logo" alt="头像" style="border-radius: 50%" />
          </template>
          <template #remark>{{item.remark}}</template>
          <template #time>{{item.time}}</template>
        </ChatObject>
      </li>
    </ul>
  </el-scrollbar>


</template>

<style scoped>

.chat-list-header{
  display: flex;
  padding: 10px 8px;
  height: 32px;
  .el-input {
    --el-border-color: none;
    margin: auto;
    --el-input-bg-color: var(--mainButton);
    --el-input-hover-border-color:none;
  }
  .el-button {
    width: 30px;
    height: 30px;
    margin: auto;
    background-color: var(--mainButton);
    border: var(--mainButton) 0  solid;
  }
  .el-button:hover{
    background-color: var(--mainButtonHover);
  }
}
.el-scrollbar {
  height: calc(100% - 52px);
  overflow: hidden;
}

.el-scrollbar__view {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    height: 100%;
  }

  li {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  li:hover,
  li.active {
    background-color: var(--mainButtonHover);
  }
}

</style>
