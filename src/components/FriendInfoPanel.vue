<script setup>

</script>

<template>
  <ul class="user-info-list">
    <li>
<!--      <img :src="userData.logo" alt="头像" style="border-radius: 50%"/>-->
      <slot name="logo"></slot>
    </li>
    <li>
      <label>昵称:</label>
<!--      <span style="margin-left: 20px">{{ userData.username }}</span>-->
      <slot name="username"></slot>
    </li>
    <li>
      <label>邮箱:</label>
<!--      <span style="margin-left: 20px">{{ userData.email }}</span>-->
      <slot name="email"></slot>
    </li>
    <li>
      <label>备注:</label>
<!--      <el-input v-model="userData.remark" placeholder="请输入备注"></el-input>-->
      <slot name="remark"></slot>
    </li>
    <li>
      <label>分组:</label>
<!--      <el-select v-model="userData.groupName" placeholder="请选择分组">-->
<!--        <el-option v-for="item in groupList" :key="item.groupId" :value="item.groupName">-->
<!--          {{ item.groupName }}-->
<!--        </el-option>-->
<!--      </el-select>-->
      <slot name="group"></slot>
    </li>
    <li>
      <label>邮箱通知:</label>
<!--      <el-switch v-model="userData.isEmailNotify"></el-switch>-->
      <slot name="isEmailNotify"></slot>
    </li>
    <li>
<!--      <el-button type="primary" @click="save">保存</el-button>-->
      <slot name="save"></slot>
    </li>
  </ul>
</template>

<style>
.user-info-list{
  list-style: none;
  padding: 0;
  margin: 0;

  li{
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 10px;
    display: flex;

    img{
      width: 80px;
      height: 80px;
      margin: auto;
    }
    .el-input{
      width: 120px;
      margin-left: 20px;
    }
    .el-select{
      width: 120px;
      margin-left: 20px;
    }
    .el-switch{
      margin-left: 20px;
    }
    .el-button{
      margin: auto;
    }
    label{
      white-space: nowrap;
    }
    span{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
