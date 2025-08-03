<script setup>


import {ref} from "vue";

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

const friendApplicationList = ref([
    {
      userId: 1,
      userName: '张三111111111111111111111111111111111',
      logo: 'https://picsum.photos/50/50',
      appTime: '2022-01-01 12:00:00'
    },
    {
      userId: 2,
      userName: '李四',
      logo: 'https://picsum.photos/50/50',
      appTime: '2022-01-01 12:00:00'
    },

])

const gourpApplicationList = ref([
    // {
    //   groupId: 1,
    //   groupName: '群聊1',
    //   logo: 'https://picsum.photos/50/50',
    //   appTime: '2022-01-01 12:00:00'
    // },
    // {
    //   groupId: 2,
    //   groupName: '群聊2',
    //   logo: 'https://picsum.photos/50/50',
    //   appTime: '2022-01-01 12:00:00'
    // }
])



const TypeSelection = ref('好友')
const options = ['好友','群聊']

</script>

<template>
  <div class="typeSelectionPanel">
    <el-segmented v-model="TypeSelection" :options="options" block style="width: 100%" />
  </div>

  <div class="friendList" v-if="TypeSelection === '好友'">
    <el-scrollbar>
      <ul>
        <li v-for="friendApplication in friendApplicationList" :key="friendApplication.userId" @click="updateCurrentObject(friendApplication)">
          <img :src="friendApplication.logo"  alt=""/>
          <div class="info">
            <div class="name">{{friendApplication.userName}}</div>
            <div class="time">{{friendApplication.appTime}}</div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
  <div class="groupList" v-else>
    <el-scrollbar>
      <ul>
<!--        <li v-for="group in groupList" :key="group.groudId" @click="updateCurrentObject(group)">-->
<!--          <img :src="group.logo"  alt=""/>-->
<!--          <div class="name">{{group.groupName}}</div>-->
<!--        </li>-->
      </ul>
    </el-scrollbar>
  </div>


</template>

<style scoped>

ul {
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: var(--listBackground);

  li {
    display: flex;
    margin: 0;
    padding: 5px;
    cursor: pointer;

    img {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .name {
      margin-left: 10px;
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      margin-left: 10px;
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }

  }
  li:hover{
    background-color: var(--mainButtonHover);
  }
}

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




</style>
