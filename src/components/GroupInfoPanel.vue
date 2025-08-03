<script setup>



import {ref} from "vue";

const props = defineProps({
  groupData: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

const currentRemark = ref(props.groupData.remark);




</script>

<template>

  <ul class="infoList">
    <li>
      <img :src="groupData.logo" alt="头像" style="border-radius: 50%"/>
    </li>
    <li>
      <label>群号:</label>
      <span>{{groupData.groupId}}</span>
    </li>
    <li  style="display: block;">
      <label>简介:</label>
      <el-scrollbar height="80px">
        <span class="syn-span">{{groupData.synopsis}}</span>
      </el-scrollbar>
    </li>
    <li >
      <label>称号:</label>
<!--      <el-input v-model="currentRemark" placeholder="请输入备注"></el-input>-->
      <slot name="remark"></slot>
    </li>
    <li>
<!--      <el-button type="primary" @click="saveChanges">保存</el-button>-->
      <slot name="saveBtn"></slot>
    </li>
    <li  style="display: block;">
      <label>群聊成员:</label>
      <el-scrollbar height="200px">
        <ul class="memberList">
          <li v-for="item in groupData.memberlist">
            <img :src="item.logo" alt="" style="border-radius: 50%">
            <span>{{item.remark}}</span>
            <span class="status-span" v-if="item.status === 1" style="background-color: green"></span>
            <span class="status-span" v-else  style="background-color: gray"></span>
          </li>
        </ul>
      </el-scrollbar>
    </li>

  </ul>

</template>

<style>
.infoList {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 10px;
    display: flex;

    img {
      width: 60px;
      height: 60px;
      margin: auto;
    }

    .el-input {
      width: 120px;
      margin-left: 20px;
    }

    .el-select {
      width: 120px;
      margin-left: 20px;
    }

    .el-switch {
      margin-left: 20px;
    }

    .el-button {
      margin: auto;
    }
    .syn-span{
      white-space: pre-wrap;
      display: inline-block;
      font-size: 12px;
    }

    label {
      white-space: nowrap;
    }

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .memberList{
      list-style: none;
      padding: 0;
      margin: 0;
      li{
        display: flex;
        padding: 0;
        margin: 5px;
        position: relative;
        align-items: center;
        cursor: pointer;

        img{
          width: 20px;
          height: 20px;
          padding: 0;
          margin: 0;
          position: relative;
          left: 5px;
        }
        span{
          position: relative;
          left: 10px;
          width: 100px;
        }
        .status-span{
          width: 10px;
          height: 10px;
          margin: 0;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
