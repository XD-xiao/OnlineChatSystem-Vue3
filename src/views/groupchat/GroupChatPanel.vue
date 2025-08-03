<script setup>

import { ref, computed, watch } from "vue";
import ChatHistoryPanel from "@/components/ChatHistoryPanel.vue";
import InputPanel from "@/components/InputPanel.vue";

import {
  getChatHistoryService,
  getGroupDataService,
  updateGroupDataService, sendMessageToGroupService,
} from "@/api/GroutChat.js";
import {ElementPlus} from "@element-plus/icons-vue";
import GroupInfoPanel from "@/components/GroupInfoPanel.vue";


//TODO: 不仅要单次获取全部聊天数据，还要定时获取最新未读数据

const props = defineProps({
  currentGroup: {
    type: Number,
    default: 0
  }
})
watch(
    () => props.currentGroup , () => {
      console.log("currentGroup:" + props.currentGroup);
      getGroupData();
      getChatHistory();
    }
)



const currentRemark = ref('');
const canSubmit = computed(() => {
  return currentRemark.value !== groupData.value.remark ;
});
// 修改群聊信息请求
const updateGroupInfo = async () => {
  // 更新 groupData

  console.log("修改群聊信息", groupData.value);
  const res = await updateGroupDataService(groupData.value.groupId,currentRemark.value);
  groupData.value.remark = currentRemark.value;
  console.log("保存成功", groupData.value);
  // if(res.data.code===0){
  //   ElMessage.success("保存成功");
  // }
  // else {
  //   ElMessage.error("保存失败");
  // }

  // console.log("保存成功", groupData.value);
}
// 发送消息
const handleSendMessage = async (message) => {
  console.log("收到消息：", message);

  const res = await sendMessageToGroupService(props.currentGroup, message);

  if(res.data.code!==0){
    ElementPlus.Message.error("发送消息失败");
    return;
  }

  chatHistory.value.push({
    id: chatHistory.value.length + 1,
    logo: groupData.value.logo,
    nature: 1,
    content: message,
    time: new Date().toLocaleString(),
  });
}
const groupData = ref({
  groupId: null,
  groupname: "",
  remark: "",
  synopsis: "",
  logo: "",
  memberlist: [],
});
const getGroupData = async () => {
  if(props.currentGroup===0)
    return;
  const res = await getGroupDataService(props.currentGroup);
  groupData.value = res.data.data;

  currentRemark.value = groupData.value.remark;

}

// 聊天记录
const chatHistory = ref([]);
const getChatHistory = async () => {
  if(props.currentGroup===0)
    return;
  const res = await getChatHistoryService(props.currentGroup);
  chatHistory.value = res.data.data;
}

</script>

<template>

  <header v-if="groupData.groupId !== null">
    <span>{{ groupData.remark }}</span>
  </header>
  <main v-if="groupData.groupId !== null">
    <div class="leftPanel">
      <div class="chatHistoryPanel">
        <ChatHistoryPanel :chatHistory="chatHistory"/>
      </div>
      <div class="inputPanel">
        <InputPanel @send="handleSendMessage" />
      </div>

    </div>
    <div class="rightPanel">
      <GroupInfoPanel :groupData="groupData">
        <template #remark>
          <el-input v-model="currentRemark" placeholder="请输入备注"></el-input>
        </template>
        <template #saveBtn>
          <el-button type="primary" :disabled="!canSubmit" @click="updateGroupInfo">保存</el-button>
        </template>
      </GroupInfoPanel >
    </div>
  </main>

</template>

<style scoped>

header {
  height: 8%;
  width: 100%;
  box-shadow: 0 0 0 2px #c3eef3;
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
