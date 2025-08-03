<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import {useUserStore} from "@/stores/index.js";
import StyleIcon from "@/components/StyleIcon.vue";
import {
  getFriendDataListService,
  updateFriendInfoService
} from "@/api/AloneChat.js";
import {
  getMyUserInfoService,
  updateMyUserInfoService,
  getLoginRecordService,
} from "@/api/Setting.js";


const containerRef = ref<HTMLElement | null>(null)
const scrollbar = ref<any>(null)

onMounted(() => {

  // 1. 读取并应用持久化的主题
  const storedTheme = userStore.getMyTheme(); // 注意是字符串
  changeTheme(storedTheme);  // 恢复上次的主题样式

  getfriendSetupList();
  getMyUserInfo();
  getLoginRecord();
  nextTick(() => {
    const wrap = scrollbar.value?.$el?.querySelector('.el-scrollbar__wrap') as HTMLElement
    if (wrap) {
      containerRef.value = wrap
    }
  })
})

const handleClick = (e: MouseEvent) => {
  e.preventDefault()
}

const userStore = useUserStore();


// 当前选择的主题名
// 获取当前主题
let selectedTheme = userStore.getMyTheme();  // 注意这里加 ()


function changeTheme(themeName: string) {
  selectedTheme = themeName;

  document.body.className = ''; // 清除旧的主题类
  if (selectedTheme !== 'default') {
    document.body.classList.add(`${selectedTheme}-theme`);
  }
  userStore.setMyTheme(selectedTheme); // 存储主题设置
}






const groupList = userStore.groupList;


const friendSetupList = ref([
  {
    friendId: null,
    userId: null,
    userName: '',
    groupId: null,
    remark: '',
    isEmailNotify: false,
  }
]);
const getfriendSetupList = async () => {

  const res = await getFriendDataListService();
  friendSetupList.value = res.data.data;



};

const updateFriendInfo = async (item) => {

  const res = await updateFriendInfoService(item.userId, item.remark, item.groupId, item.isEmailNotify);

}
// const emailNotificationDelayValue = ref('1')

const myUserInfo =  ref({
  emailNotificationDelayValue: 1,
  isReviewFriendApp: false,
  isReviewGroupApp: false,
});
const getMyUserInfo = async () => {
  const res = await getMyUserInfoService();
  myUserInfo.value = res.data.data;
}
const updateMyUserInfo = async () => {
  const res = await updateMyUserInfoService(myUserInfo.value);
}

const loginRecord = ref([
  {
    LRId: 1,
    IP: '',
    system: '',
    loginTime: '',
    logoutTime: '',
  }
]);
const getLoginRecord = async () => {

  const res = await getLoginRecordService();
  loginRecord.value = res.data.data;

}



</script>

<template>
  <div class="container">
    <div class="listPanel">
      <el-anchor
          :container="containerRef"
          direction="vertical"
          type="default"
          :offset="30"
          @click="handleClick"
      >
        <el-anchor-link href="#part1" title="外观设置" />
        <el-anchor-link href="#part2" title="通知设置" />
        <el-anchor-link href="#part3" title="权限设置" />
        <el-anchor-link href="#part4" title="登录记录" />
      </el-anchor>
    </div>

    <div class="showPanel">
      <el-scrollbar height="100%" ref="scrollbar">
        <div class="part" id="part1">
          <h3>外观设置</h3>
          <div style="display: flex">
            <ul class="styleList">
              <li class="styleItem" @click="changeTheme('default')">
                <StyleIcon class="styleIcon" color="#30e3ca" width="50px" height="50px" />
                <div>默认</div>
              </li>
              <li class="styleItem" @click="changeTheme('yellow')">
                <StyleIcon class="styleIcon" color="#ffc107" width="50px" height="50px" />
                <div>黄色</div>
              </li>
              <li class="styleItem" @click="changeTheme('dark')">
                <StyleIcon class="styleIcon" color="#2c3e50" width="50px" height="50px" />
                <div>深色</div>
              </li>
            </ul>

          </div>


        </div>
        <hr>
        <div class="part" id="part2" >
          <h3>通知设置</h3>
          <div class="emailNotificationDelaySetup" style="margin: 10px auto;display: flex;">
            <div>邮箱通知延时:</div>
            <el-select v-model="myUserInfo.emailNotificationDelayValue" placeholder="请选择" style="width: 150px; margin-left: 20px;">
              <el-option label="1分钟" value='1'></el-option>
              <el-option label="5分钟" value='5'></el-option>
              <el-option label="10分钟" value='10'></el-option>
            </el-select>
            <el-button type="primary" @click="updateMyUserInfo" style="margin-left: 20px">保存</el-button>
          </div>
          <div class="friendSetup" style="margin: 10px auto;display: block;">
            <div>好友列表:</div>
            <ul>
              <li v-for="item in friendSetupList" :key="item.friendId">
                <div style="margin-left: 30px;width: 100px">{{ item.userName }}</div>
                <el-input v-model="item.remark" placeholder="请输入备注" style="width: 100px; margin-left: 20px;" />
                <el-select v-model="item.groupId" placeholder="请选择分组" style="width: 120px; margin-left: 20px;">
                  <el-option v-for="itemG in groupList" :key="itemG.groupId" :label="itemG.groupName" :value="itemG.groupId" />
                </el-select>
                <el-switch v-model="item.isEmailNotify" style="margin-left: 20px"></el-switch>
                <el-button type="primary" style="margin-left: 20px" @click="updateFriendInfo(item)">保存</el-button>
              </li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="part" id="part3" >
          <h3>权限设置</h3>
          <div class="permissionSetup">
            <div style="display: flex">
              <div>被加好友权限:</div>
              <el-switch v-model="myUserInfo.isReviewFriendApp"
                         inline-prompt
                         style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949; margin-left: 20px"
                         active-text="审核"
                         inactive-text="不审核"
              />
            </div>
            <div style="display: flex">
              <div>被加群权限:</div>
              <el-switch v-model="myUserInfo.isReviewGroupApp"
                         inline-prompt
                         style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949; margin-left: 20px"
                         active-text="审核"
                         inactive-text="不审核"
              />
            </div>
            <el-button type="primary" @click="updateMyUserInfo">保存</el-button>
          </div>
        </div>
        <hr>
        <div class="part" id="part4" >
          <h3>登录记录</h3>
          <el-table :data="loginRecord" style="width: 80%; margin: auto;">
            <el-table-column prop="LRId" label="编号" width="180" />
            <el-table-column prop="IP" label="IP地址" width="180" />
            <el-table-column prop="system" label="系统" width="100" />
            <el-table-column prop="loginTime" label="上线时间" width="180" />
            <el-table-column prop="logoutTime" label="下线时间" width="180" />
          </el-table>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100%;
}
.listPanel {
  width: 10%;
  background-color: var(--listBackground);
}
.listPanel .el-anchor {
  background-color: var(--listBackground);
  margin-left: 10px;
  --el-anchor-font-size: 18px;
}
.listPanel .el-anchor__item {
  margin-top: 20px;
}
.showPanel {
  width: 90%;
  display: block;
  background-color: var(--showBackground);
  padding: 20px 100px;

  .part{
    margin-top: 10px;
    margin-bottom: 10px;

    .styleList{
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
    }

    .styleItem{
      width: 85px;
      height: 85px;
      display: block;
      text-align: center;
      margin-left: 20px;
      cursor: pointer;
      border-radius: 10px;

      div{
        text-align: center;
        font-size: 12px;
      }

    }
    .styleItem:hover{
      background-color: var(--mainButtonHover);
    }
    .styleItem.active{
      background-color: var(--mainButton);
    }

    .el-table{

      --el-table-header-bg-color: var(--showBackground);
      --el-table-tr-bg-color: var(--showBackground);
      --el-table-bg-color: var(--showBackground);

    }
  }

  .friendSetup{
    ul{
      list-style: none;
      padding: 0;
      margin: 0;

      li{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        margin-top: 10px;
      }
    }
  }
}
</style>
