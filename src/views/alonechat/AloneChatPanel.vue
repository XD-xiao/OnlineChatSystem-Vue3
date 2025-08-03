<script setup>

import { ref, computed, watch } from "vue";
import {useUserStore} from "@/stores/index.js";
import ChatHistoryPanel from "@/components/ChatHistoryPanel.vue";
import InputPanel from "@/components/InputPanel.vue";
import FriendInfoPanel from "@/components/FriendInfoPanel.vue";
import {
  getChatHistoryService,
  getFriendDataService,
  sendMessageToFriendService,
  updateFriendInfoService
} from "@/api/AloneChat.js";
import {ElementPlus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";


//TODO: 不仅要单次获取全部聊天数据，还要定时获取最新未读数据

const props = defineProps({
  currentUser: {
    type: Number,
    default: 0
  }
})
watch(
    () => props.currentUser , () => {
      console.log("currentUser:" + props.currentUser);
      getFriendData();
      getChatHistory();
    }
)

function getBadgeColor(status) {
  return status === 1 ? 'green' : 'grey';
}

const userStore = useUserStore();
const groupList = userStore.groupList;

const currentRemark = ref('');
const currentGroupId = ref('');
const currentIsEmailNotify = ref('');

const canSubmit = computed(() => {
  return currentRemark.value !== friendData.value.remark ||
      currentGroupId.value !== friendData.value.groupId ||
      currentIsEmailNotify.value !== friendData.value.isEmailNotify;
});
// 修改好友信息请求
const updateFriendInfo = async () => {
  // 更新 friendData

  const res = await updateFriendInfoService(friendData.value.userId,currentRemark.value,currentGroupId.value,currentIsEmailNotify.value);

  friendData.value.remark = currentRemark.value;
  friendData.value.groupId = currentGroupId.value;
  friendData.value.isEmailNotify = currentIsEmailNotify.value;
  // if(res.data.code===0){
  //   ElMessage.success("保存成功");
  // }
  // else {
  //   ElMessage.error("保存失败");
  // }

  // console.log("保存成功", friendData.value);
}
// 发送消息
const handleSendMessage = async (message) => {
  console.log("收到消息：", message);

  const res = await sendMessageToFriendService(props.currentUser, message);

  if(res.data.code!==0){
    ElementPlus.Message.error("发送消息失败");
    return;
  }

  chatHistory.value.push({
    id: chatHistory.value.length + 1,
    logo: friendData.value.logo,
    nature: 1,
    content: message,
    time: new Date().toLocaleString(),
  });
}
const friendData = ref({
  userId: null,
  email: "",
  username: "",
  remark: "",
  status: "",
  logo: "",
  groupId: null,
  isEmailNotify: false,
});
const getFriendData = async () => {
  if(props.currentUser===0)
    return;
  // console.log("开始获取好友信息");
  const res = await getFriendDataService(props.currentUser);
  friendData.value = res.data.data;

  currentRemark.value = friendData.value.remark;
  currentGroupId.value = friendData.value.groupId;
  currentIsEmailNotify.value = friendData.value.isEmailNotify;

}

// 聊天记录
const chatHistory = ref([]);
const getChatHistory = async () => {
  if(props.currentUser===0)
    return;
  const res = await getChatHistoryService(props.currentUser);
  chatHistory.value = res.data.data;
}


</script>

<template>
  <header v-if="friendData.userId">
    <el-badge is-dot :color="getBadgeColor(friendData.status)">
      <span>{{ friendData.remark }}</span>
    </el-badge>
  </header>
  <main v-if="friendData.userId">
    <div class="leftPanel">
      <div class="chatHistoryPanel">
        <ChatHistoryPanel :chatHistory="chatHistory"/>
      </div>
      <div class="inputPanel">
        <InputPanel @send="handleSendMessage" />
      </div>

    </div>
    <div class="rightPanel">
      <FriendInfoPanel>
        <template #logo>
          <img :src="friendData.logo" alt="头像" style="border-radius: 50%"/>
        </template>
        <template #username >
          <span style="margin-left: 20px">{{ friendData.username }}</span>
        </template>
        <template #email>
          <span style="margin-left: 20px">{{ friendData.email }}</span>
        </template>
        <template #remark>
          <el-input v-model="currentRemark" placeholder="请输入备注"></el-input>
        </template>
        <template #group>
          <el-select v-model="currentGroupId" placeholder="请选择分组">
            <el-option v-for="item in groupList" :key="item.groupId" :label="item.groupName" :value="item.groupId" />
          </el-select>
        </template>
        <template #isEmailNotify>
          <el-switch v-model="currentIsEmailNotify"></el-switch>
        </template>
        <template #save>
          <el-button type="primary" :disabled="!canSubmit" @click="updateFriendInfo">保存</el-button>
        </template>

      </FriendInfoPanel>
    </div>
  </main>
</template>

<style scoped>

header {
  height: 8%;
  width: 100%;
  box-shadow: 0 0 0 2px var(--separateBox);
  display: flex;         /* 启用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center;   /* 垂直居中 */

}
main {
  display: flex;
  flex-direction: row;
  height: 92%;


  .leftPanel {
    width: 80%;
    height: 100%;
    display: block;
    box-shadow: 2px 0 0 0 #c3eef3;
    .chatHistoryPanel{
      height: 90%;
    }
    .inputPanel{
      margin-top: 5px;
    }
  }
  .rightPanel {
    width: 20%;
    display: block;


  }
}

</style>
