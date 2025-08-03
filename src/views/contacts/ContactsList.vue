<script setup>
import { ref, onMounted } from 'vue'
import {getFriendListService, getGroupListService} from "@/api/Contacts.js";



const props = defineProps(['modelValue']) // 接收 v-model 的值
const emit = defineEmits(['update:modelValue'])

const updateCurrentObject = (item) => {
  if( TypeSelection.value === '好友')
    // emit('update:modelValue', "U" + item.userId);
    emit('update:modelValue', {type:"U" , value: item.userId});
  if (TypeSelection.value === '群聊')
    // emit('update:modelValue', "G" + item.groupId);
    emit('update:modelValue', {type:"G" , value: item.groupId});
}



const TypeSelection = ref('好友')
const options = ['好友','群聊']

const activeNames = ref(['1'])
function handleChange(val) {
  console.log(val);
}


const friendList = ref(null);
const getFriendList = async ()  => {
  const res = await getFriendListService();
  friendList.value = res.data.data;
  // console.log(friendList.value);
}

const groupList = ref(null);
const getGroupList = async ()  => {
  const res = await getGroupListService();
  groupList.value = res.data.data;
  // console.log(groupList.value);
}



onMounted(() => {
  getFriendList();
  getGroupList();
})




</script>

<template>
  <div class="typeSelectionPanel">
    <el-segmented v-model="TypeSelection" :options="options" block style="width: 100%" />
  </div>

  <div class="friendList" v-if="TypeSelection === '好友'">
    <el-scrollbar>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="group in friendList" :key="group.groupId"  :title="group.groupName" :name="group.groupName">
          <ul>
            <li v-for="friend in group.friends" :key="friend.userId" @click="updateCurrentObject(friend)">
              <img :src="friend.logo"  alt=""/>
              <div class="remark">{{friend.remark}}</div>
              <div class="status" v-if="friend.status === 1" style="background-color: green;border-radius: 50%;width: 15px;height: 15px" ></div>
              <div class="status" v-else style="background-color: gray;border-radius: 50%;width: 15px;height: 15px"></div>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
  <div class="groupList" v-else>
    <el-scrollbar>
      <ul>
        <li v-for="group in groupList" :key="group.groudId" @click="updateCurrentObject(group)">
          <img :src="group.logo"  alt=""/>
          <div class="name">{{group.groupName}}</div>
        </li>
      </ul>
    </el-scrollbar>
  </div>

</template>

<style>
.typeSelectionPanel {
  width: 80%;
  margin: 10px auto;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.typeSelectionPanel .el-segmented{
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: var(--mainButton);
  --el-border-radius-base: 8px;
  background-color: var(--showBackground);
}
.friendList{
  width: 100%;
  margin: 0;
  padding: 0;

  .el-scrollbar{
    height: 620px;
    width: 100%;
    .el-collapse{
      width: 90%;
      margin: 5px auto;
      --el-collapse-border-color:0;
      background-color: var(--listBackground);
      .el-collapse-item{


        .el-collapse-item__header{
          font-size: 15px;

          background-color: var(--listBackground);
          border-bottom: 0;
        }
        .el-collapse-item__content{
          padding: 0;

          ul{
            height: 100%;
            list-style: none;
            margin: 0;
            padding: 0;
            background-color: var(--listBackground);

            li{
              display: flex;
              margin: 0;
              padding: 5px;
              cursor: pointer;

              img{
                border-radius: 50%;
                width: 40px;
              }
              .remark{
                margin: auto auto auto 10px;
                font-size: 12px;
                justify-content: center;
                align-items: center;
                width: 150px;
                overflow: hidden; /* 隐藏溢出内容 */
                text-overflow: ellipsis; /* 添加省略号 */
                white-space: nowrap;
              }
              .status{
                margin: auto 0;
                font-size: 12px;
                justify-content: center;
                align-items: center;
                position: relative;
                right: 10px;
              }
            }
            li:hover{
              background-color: var(--mainButtonHover);
            }

          }
        }
      }

    }
  }
}
.groupList{

  .el-scrollbar{
    height: 620px;
    width: 100%;

    ul{
      list-style: none;
      margin: 0;
      padding: 0;

      li{
        display: flex;
        margin: 0;
        padding: 5px;
        cursor: pointer;

        img{
          border-radius: 50%;
          width: 40px;
          margin-left: 10px;
        }
        .name{
          margin: auto auto auto 20px;
          font-size: 14px;
          justify-content: center;
          align-items: center;
          width: 150px;
          overflow: hidden; /* 隐藏溢出内容 */
          text-overflow: ellipsis; /* 添加省略号 */
          white-space: nowrap;
        }
      }
      li:hover{
        background-color: var(--mainButtonHover);
      }
    }

  }


}


</style>
