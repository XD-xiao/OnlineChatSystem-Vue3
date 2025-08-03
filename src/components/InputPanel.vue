<script setup>
import { ref } from "vue";
import { CirclePlusFilled, Promotion } from "@element-plus/icons-vue";

const inputText = ref("");

// 定义 emit
const emit = defineEmits(['send']);

// 发送消息的方法
function sendText() {
  if (inputText.value.trim()) {
    emit("send", inputText.value); // 触发事件并传值
    inputText.value = ""; // 清空输入框
  }
}
</script>

<template>
  <div class="inputPanelContainer">
    <el-icon><CirclePlusFilled /></el-icon>
      <el-input
          v-model="inputText"
          clearable
      />
    <el-icon @click="sendText()"><Promotion /></el-icon>
  </div>
</template>

<style scoped>

.inputPanelContainer {
  display: flex;
  margin: auto;
  width: 80%;
  height: 40px;
  background-color: var(--mainButtonHover);
  border-radius: 5px;
  justify-content: space-between;
  padding: 3px 10px;

  .el-icon{
    margin: 8px;
    color: var(--mainText);
    font-size: 25px;
  }
  .el-icon:hover{
    cursor: pointer;
    color: var(--mainTextHover);
  }
  .el-input{
    padding-top: 3px;
    width: 600px;

    --el-border-color: none;
    margin: auto;
    --el-input-bg-color: var(--listBackground);
    --el-input-hover-border-color:none;


  }

}

</style>

