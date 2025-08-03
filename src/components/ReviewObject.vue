<script setup lang="ts">
import { defineProps } from "vue";
import { updateAcceptFriendService, updateAcceptGroupService } from "@/api/Review";


const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const handleAccept = async() => {

  if( props.item.friendId ){
    const res = await updateAcceptFriendService(props.item.friendId , 2);
  }
  else{
    const res = await updateAcceptGroupService(props.item.groupId , 2);
  }
};

const handleIgnore = async() => {
  if( props.item.friendId ){
    const res = await updateAcceptFriendService(props.item.friendId , 3);
  }
  else{
    const res = await updateAcceptGroupService(props.item.groupId , 3);
  }
};
</script>

<template>
  <div class="review-object">
    <img :src="item.logo" alt="头像" class="avatar" />
    <div class="info">
      <p><strong>用户名：</strong>{{ item.userName }}</p>
      <p><strong>邮箱：</strong>{{ item.email }}</p>
      <p><strong>性别：</strong>{{ item.gender === 1 ? "男" : "女" }}</p>
      <p><strong>申请内容：</strong>{{ item.text }}</p>
      <p><strong>申请时间：</strong>{{ item.appTime }}</p>
    </div>
    <div class="actions">
      <el-button v-if="item.status ===1 " type="success" class="accept" style="margin-left: 12px" @click="handleAccept">接受</el-button>
      <el-button v-if="item.status ===1 " type="info" class="ignore" @click="handleIgnore">忽略</el-button>
      <el-button v-else-if="item.status ===2 " type="success" class="accept" disabled>已接受</el-button>
      <el-button v-else-if="item.status ===3 " type="info" class="ignore" disabled>已忽略</el-button>
    </div>
  </div>
</template>

<style scoped>
.review-object {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  width: 100%;
  margin: 16px auto;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
  flex-shrink: 0;
}

.info {
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.info p {
  margin: 6px 0;
  display: flex;
  align-items: center;
}

.info strong {
  min-width: 70px;
  color: #555;
  font-weight: 600;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: auto;
}

.actions .el-button {
  width: 90px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 针对 Element Plus 按钮的覆盖样式（如果全局未设置） */
.accept {
  background-color: #1aad19;
  border-color: #1aad19;
}

.accept:hover {
  background-color: #189f16;
  border-color: #189f16;
}

.ignore {
  background-color: #999;
  border-color: #999;
}

.ignore:hover {
  background-color: #888;
  border-color: #888;
}

/* 已处理状态按钮样式 */
.el-button[disabled] {
  opacity: 0.7;
  cursor: not-allowed !important;
}

/* 响应式：小屏幕适配 */
@media (max-width: 600px) {
  .review-object {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 100%;
  }

  .actions {
    margin-left: 0;
    margin-top: 16px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .actions .el-button {
    width: 45%;
    max-width: 120px;
  }

  .info strong {
    min-width: 60px;
  }
}
</style>
