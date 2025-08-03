<script setup>
const props = defineProps({
  messageNum: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="user-container">
    <div class="user-logo">
      <slot name="logo"></slot>
    </div>
    <div class="user-info">
      <div class="user-remark">
        <slot name="remark"></slot>
      </div>
      <div class="user-time">
        <slot name="time"></slot>
      </div>
    </div>
    <div class="user-msgNum">
      <el-badge
          :value="messageNum"
          :max="99"
          class="item"
          :offset="[20, 25]"
          :hidden="messageNum === 0"
      >
      </el-badge>
    </div>
  </div>
</template>



<style scoped>
.user-container {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 10px;
  position: relative;
}

.user-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  left:10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.user-info {
  margin-left: -10px;
  position: relative;
  left:40px;
  width: 120px;
  .user-remark {
    color: var(--listChatRemarkText);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-time {
    font-size: 11px;
    color: var(--listChatTimeColor);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.user-msgNum {
  position: absolute;
  top:10px;
  right:40px;
}
</style>
