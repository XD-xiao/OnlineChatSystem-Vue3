<script setup>
import {ref, reactive} from 'vue'
import {updateUserInfoService} from "@/api/Contacts.js";

const props = defineProps({
  userInfo: {
    type: Object,
  }
})

const updateUserInfo = async () => {
  // 获取用户信息
  const res =  await updateUserInfoService()

}

// 性别和状态的显示文本
const genderText = {
  1: '男',
  2: '女',
  0: 'other'
}

const statusText = {
  1: '在线',
  0: '离线'
}

// 编辑状态和编辑表单
const isEditing = ref(false)
const editForm = reactive({
  username: '',
  gender: '',
  signature: ''
})

// 开始编辑
const startEdit = () => {
  editForm.username = props.userInfo.username
  editForm.gender = props.userInfo.gender
  editForm.signature = props.userInfo.signature
  isEditing.value = true
}

// 保存编辑
const saveEdit = () => {
  props.userInfo.username = editForm.username
  props.userInfo.gender = editForm.gender
  props.userInfo.signature = editForm.signature
  isEditing.value = false
}

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false
}
</script>

<template>
  <div class="user-popup">
    <div class="user-header">
      <img :src="props.userInfo.logo" :alt="props.userInfo.username" class="user-avatar">
      <div class="user-basic">
        <h3 class="username">{{ props.userInfo.username }}</h3>
        <p class="status" :class="`status-${props.userInfo.status}`">
          {{ statusText[props.userInfo.status] }}
        </p>
      </div>
      <!-- 编辑/保存按钮 -->
      <div class="action-buttons">
        <button
            v-if="!isEditing"
            class="btn-edit"
            @click="startEdit"
        >
          编辑资料
        </button>
        <template v-else>
          <button class="btn-save" @click="saveEdit">
            保存
          </button>
          <button class="btn-cancel" @click="cancelEdit">
            取消
          </button>
        </template>
      </div>
    </div>

    <div class="user-details">
      <p class="detail-item">
        <span class="label">邮箱:</span>
        <span class="value">{{ props.userInfo.email }}</span>
      </p>
      <p class="detail-item">
        <span class="label">用户ID:</span>
        <span class="value">{{ props.userInfo.userId }}</span>
      </p>

      <!-- 可编辑的用户名 -->
      <p class="detail-item">
        <span class="label">用户名:</span>
        <template v-if="isEditing">
          <input
              v-model="editForm.username"
              class="edit-input"
              placeholder="请输入用户名"
          />
        </template>
        <span v-else class="value">{{ props.userInfo.username }}</span>
      </p>

      <!-- 可编辑的性别 -->
      <p class="detail-item">
        <span class="label">性别:</span>
        <template v-if="isEditing">
          <select v-model="editForm.gender" class="edit-select">
            <option v-for="(text, key) in genderText" :key="key" :value="Number(key)">
              {{ text }}
            </option>
          </select>
        </template>
        <span v-else class="value">{{ genderText[props.userInfo.gender] }}</span>
      </p>

      <!-- 可编辑的签名 -->
      <p class="detail-item signature">
        <span class="label">个性签名:</span>
        <template v-if="isEditing">
          <textarea
              v-model="editForm.signature"
              class="edit-textarea"
              placeholder="请输入个性签名"
          />
        </template>
        <span v-else class="value">{{ props.userInfo.signature }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.user-popup {
  width: 400px; /* 增加宽度 */
  min-height: 400px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.user-header {
  display: flex;
  align-items: center;
  padding: 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 16px;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-basic {
  flex: 1;
}

.username {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.status {
  margin: 4px 0 0;
  font-size: 13px;
  font-weight: 500;
}

.status-1 {
  color: #4caf50;
}

.status-0 {
  color: #999;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-edit, .btn-save, .btn-cancel {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-edit {
  background: #409eff;
  color: white;
}

.btn-edit:hover {
  background: #337ecc;
}

.btn-save {
  background: #4caf50;
  color: white;
}

.btn-save:hover {
  background: #3d9042;
}

.btn-cancel {
  background: #f56c6c;
  color: white;
}

.btn-cancel:hover {
  background: #d15a5a;
}

.user-details {
  padding: 24px;
}

.detail-item {
  display: flex;
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #495057;
  align-items: flex-start;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 600;
  color: #2c3e50;
  min-width: 70px;
  margin-right: 12px;
  padding-top: 6px;
}

.value {
  flex: 1;
  word-break: break-all;
  padding-top: 6px;
}

.signature .value {
  font-style: italic;
  color: #6c757d;
}

/* 编辑状态下的输入框样式 */
.edit-input, .edit-select {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
}

.edit-input:focus, .edit-select:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.edit-select {
  cursor: pointer;
}

.edit-textarea {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 60px;
  outline: none;
  transition: border-color 0.2s ease;
}

.edit-textarea:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* 在小屏幕上调整 */
@media (max-width: 480px) {
  .user-popup {
    width: calc(100vw - 32px);
  }

  .user-header, .user-details {
    padding: 16px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn-edit, .btn-save, .btn-cancel {
    padding: 8px;
    font-size: 14px;
  }
}
</style>
