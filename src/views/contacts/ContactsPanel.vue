<script setup>
import {computed, ref, watch} from "vue";
import {Delete, EditPen, ElementPlus, Female, InfoFilled, Male, Trophy} from "@element-plus/icons-vue";
import {useUserStore} from "@/stores/index.js";
import {
  deleteFriendService, deleteGroupMemberService, deleteGroupService,
  getFriendInfoService,
  getGroupInfoService,
  updateGroupInfoService
} from "@/api/Contacts.js";
import {sendMessageToFriendService, updateFriendInfoService} from "@/api/AloneChat.js";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router/index.js";
import {sendMessageToGroupService} from "@/api/GroutChat.js";

const props = defineProps({
  currentObject: {
    type: Number,
    default: 0
  }
})

watch(
    () => props.currentObject , () => {
      console.log(props.currentObject);
      if(props.currentObject.type === "U")
        getFriendInfo();
      else
        getGroupInfo();
    }
)

const currentUserRemark = ref('');
const currentGroupId = ref('');
const currentIsEmailNotify = ref('');

const canFriendSubmit = computed(() => {
  return currentUserRemark.value !== friendInfo.value.remark ||
      currentGroupId.value !== friendInfo.value.groupId ||
      currentIsEmailNotify.value !== friendInfo.value.isEmailNotify;
});
const canGroupSubmit = computed(() => {
  return currentGroupRemark.value !== groupInfo.value.remark ||
      currentSynopsis.value !== groupInfo.value.synopsis;
});

// 发送消息
const handleSendMessage = async (type) => {
  // console.log("收到消息：", message);
  if(type === "F"){
    const res = await sendMessageToFriendService(friendInfo.value.userId, "Hello world");
  }
  else{
    const res = await sendMessageToGroupService(groupInfo.value.groupId, "Hello world");
  }


  if(res.data.code!==0){
    ElementPlus.Message.error("发送消息失败");
    return;
  }
  // 跳转页面
  await router.push({
    path: '/main/alonechat',
  })
}

const friendInfo = ref({
  userId: 0,
  logo: "",
  userName: "",
  status: 1,
  gender: 1,
  age: "",
  signature: "",
  badgeList: [],
  remark: "",
  groupId: 1,
  isEmailNotify: false,
});
const getFriendInfo = async () => {
  // console.log(props.currentObject);

  const res = await getFriendInfoService(props.currentObject.userId);
  friendInfo.value = res.data.data;

  currentUserRemark.value = friendInfo.value.remark;
  currentGroupId.value = friendInfo.value.groupId;
  currentIsEmailNotify.value = friendInfo.value.isEmailNotify;

};
// 修改好友信息请求
const updateFriendInfo = async () => {
  // 更新 friendData

  const res = await updateFriendInfoService(friendInfo.value.userId,currentUserRemark.value,currentGroupId.value,currentIsEmailNotify.value);

  friendInfo.value.remark = currentUserRemark.value;
  friendInfo.value.groupId = currentGroupId.value;
  friendInfo.value.isEmailNotify = currentIsEmailNotify.value;
  // if(res.data.code===0){
  //   ElMessage.success("保存成功");
  // }
  // else {
  //   ElMessage.error("保存失败");
  // }

  // console.log("保存成功", friendData.value);
}
const deleteFriend = () => {
  // 删除好友请求

  ElMessageBox.confirm(
      '你确认删除好友?',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then( async () => {
        const res = await deleteFriendService(friendInfo.value.userId);
        ElMessage({
          type: 'success',
          message: res.data.message,
        });
        // 刷新页面
        router.go(0); // 等同于 reload

      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
}

const currentSynopsis = ref('');
const currentGroupRemark = ref('');

const groupInfo = ref({
  groupId: null,
  logo: "",
  groupName: "",
  synopsis: "",
  createDate: "",
  memberCount: null,
  groupOwnerEmail: "",
  isMyGrouwp: null,
  memberList: [],
  remark: "",
});

const getGroupInfo = async () => {
  // console.log(props.currentObject);
  const res = await getGroupInfoService(props.currentObject.groupId);
  groupInfo.value = res.data.data;

  currentGroupRemark.value = groupInfo.value.remark;
  currentSynopsis.value = groupInfo.value.synopsis;
};
const updateGroupInfo = async () => {
  const res = await updateGroupInfoService(props.currentObject.groupId,currentGroupRemark.value,currentSynopsis.value);
  groupInfo.value.remark = currentGroupRemark.value;
  groupInfo.value.synopsis = currentSynopsis.value;
}
const deleteGroup = () => {
  ElMessageBox.confirm(
      '你确认删除群组?',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then( async () => {
        const res = await deleteGroupService(groupInfo.value.groupId);
        ElMessage({
          type: 'success',
          message: res.data.message,
        });
        // 刷新页面
        router.go(0); // 等同于 reload
      })
}
const deleteGroupMember = ( userId) => {
  ElMessageBox.confirm(
      '你确认删除群组成员?',
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then( async () => {
        const res = await deleteGroupMemberService(userId);
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
        // 刷新页面
        router.go(0); // 等同于 reload
      })
}



const userStore = useUserStore();
const groupList = userStore.getGroupList();




</script>

<template>
  <div class="userPanel" v-if="currentObject && currentObject.type === 'U' ">
    <ul>
      <li class="li-first">
        <img :src="friendInfo.logo" alt="" />
        <div class="userInfo">
          <div class="userName">{{friendInfo.userName}}</div>
          <div class="userStatus" v-if="friendInfo.status === 1">
            <div class="statusIco" style="background-color: green;border-radius: 50%;"></div>
            <div class="statusText">在线</div>
          </div>
          <div class="userStatus" v-else>
            <div class="statusIco" style="background-color: gray;border-radius: 50%;"></div>
            <div class="statusText">离线</div>
          </div>
        </div>
      </li>
      <li class="li-body">
        <label style="margin-left: 35px"> <el-icon><Trophy /></el-icon>:</label>
        <div class="badge">
          <img v-for="item in friendInfo.badgeList" :src="item.logo" :alt="item.badgeName"  />
        </div>
      </li>
      <li class="li-body">
        <label>邮箱:</label>
        <div>{{friendInfo.email}}</div>
      </li>
      <li class="li-body">
        <label>性别:</label>
        <div v-if="friendInfo.gender === 1">男<el-icon><Male /></el-icon></div>
        <div v-else-if="friendInfo.gender === 2">女<el-icon><Female /></el-icon></div>
        <div v-else>other</div>
      </li>
      <li class="li-body">
        <label>年龄:</label>
        <div>{{friendInfo.age}}</div>
      </li>
      <li class="li-body">
        <label>签名:</label>
        <div>{{friendInfo.signature}}</div>
      </li>
      <li class="li-body">
        <label>备注:</label>
        <el-input v-model="currentUserRemark" placeholder="请输入备注"></el-input>
      </li>
      <li class="li-body">
        <label>分组:</label>
        <el-select v-model="currentGroupId" placeholder="请选择分组">
          <el-option v-for="item in groupList" :key="item.groupId" :label="item.groupName" :value="item.groupId" />
        </el-select>
      </li>
      <li class="li-body">
        <label>邮箱通知:</label>
        <el-switch v-model="currentIsEmailNotify" active-text="开启" inactive-text="关闭"></el-switch>
      </li>
      <li class="li-bottom">
        <div>
          <el-button type="success" :disabled="!canFriendSubmit" @click="updateFriendInfo">保存资料</el-button>
          <el-button type="danger" @click="deleteFriend">删除好友</el-button>
          <el-button type="primary" @click="handleSendMessage('F')">发送消息</el-button>
        </div>
      </li>
    </ul>
  </div>

  <div class="groupPanel" v-else-if="currentObject && currentObject.type === 'G' ">
    <div class="groupInfo">
      <ul>
        <li class="li-first">
          <img :src="groupInfo.logo" alt="" />
          <div class="groupInfo">
            <div class="groupName">{{groupInfo.groupName}}</div>
            <div class="groupMemberCount">{{groupInfo.memberCount}}人</div>
          </div>
        </li>
        <li class="li-body">
          <label>群号:</label>
          <div>{{groupInfo.groupId}}</div>
        </li>
        <li class="li-body">
          <label>创建时间:</label>
          <div>{{groupInfo.createDate}}</div>
        </li>
        <li class="li-body">
          <label>群主:</label>
          <div>{{groupInfo.groupOwnerEmail}}</div>
        </li>
        <li class="li-body">
          <label>群简介:</label>
          <el-input v-if="groupInfo.isMyGrouwp === true" v-model="currentSynopsis" placeholder="请输入简介" :rows="2" type="textarea"  style="width: 200px" />
          <div v-else>{{groupInfo.synopsis}}</div>
        </li>
        <li class="li-body">
          <label>群备注:</label>
          <el-input v-model="currentGroupRemark" placeholder="请输入备注" style="width: 100px"></el-input>
        </li>
        <li class="li-bottom">
          <div>
            <el-button type="success" :disabled="!canGroupSubmit" @click="updateGroupInfo">保存信息</el-button>
            <el-button type="danger" @click="deleteGroup">删除群</el-button>
            <el-button type="primary" @click="handleSendMessage">发送消息</el-button>
          </div>
        </li>
      </ul>
    </div>
    <div class="groupMemberList">
      <el-table :data="groupInfo.memberList" style="width: 100%;" height="100%">
        <el-table-column prop="" label="头像" width="60" >
          <template #default="scope">
            <img :src="scope.row.logo" alt="" style="border-radius: 50%;width: 30px;height: 30px" />
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="昵称" width="120" />
        <el-table-column prop="remark" label="备注" width="120" />
        <el-table-column prop="addDate" label="加入时间" width="120" />
        <el-table-column prop="status" label="状态" width="70" />
        <el-table-column fixed="right"  label="操作" >
          <template #default="scope">
            <el-icon v-if="groupInfo.isMyGrouwp === true" class="icon"  @click="deleteGroupMember( scope.row.userId)"><Delete /></el-icon>
            <el-icon class="icon"><InfoFilled /></el-icon>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
  <div class="groupPanel" v-else>
    null
  </div>
</template>

<style scoped>

ul{
  list-style: none;
  padding: 0;
  margin: auto;
  display: block;
  width: 400px;

  li{
    display: flex;
    margin: 20px auto;
    padding-bottom: 8px;
    align-items: center;

  }

}

.userPanel{
  width: 100%;
  margin: auto;
  display: block;

  .li-first{
    display: flex;
    justify-content: center;

    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .userInfo{
      display: block;
      margin-left: 30px;

      .userName{
        font-size: 20px;
        font-weight: bold;
      }
      .userStatus{
        display: flex;
        align-items: center;
        margin-top: 10px;

        .statusIco{
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
  }
  .li-body{
    border-bottom: 2px solid var(--separateBox);
    display: flex;
    justify-content: space-between; /* 两端对齐 */
    align-items: center; /* 垂直居中对齐，可选 */

    label{
      width: 80px;
      margin-left: 20px;
    }
    .el-input{
      width: 100px;
    }
    .el-select{
      width: 100px;
    }
  }
  .li-bottom{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .badge{
    display: flex;
    justify-content: center;
    align-items: center;

    img{
      width: 20px;
      height: 20px;
      margin: 0 5px;
    }
  }
}

.groupPanel{
  height: 100%;
  margin: 0;
  display: flex;

  .groupInfo{
    width: 60%;

    .li-first{
      display: flex;
      justify-content: center;

      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .groupInfo{
        display: block;
        margin-left: 30px;

        .groupName{
          font-size: 20px;
          font-weight: bold;
        }
        .groupMemberCount{
          display: flex;
          align-items: center;
          margin-top: 10px;

        }
      }
    }

    .li-body{
      border-bottom: 2px solid var(--separateBox);
      display: flex;
      justify-content: space-between; /* 两端对齐 */
      align-items: center; /* 垂直居中对齐，可选 */
    }
    .li-bottom{
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }

  .groupMemberList{
    width: 40%;
    height: 100%;

    .el-table ::v-deep(.el-table__cell) {
      background-color: var(--showBackground);

      .icon{
        width: 20px;
        margin-left: 5px;
        cursor: pointer;
      }
      .icon:hover{
        color: var(--mainButtonHover);
      }
    }
    .el-table ::v-deep(.el-scrollbar__wrap) {
      background-color: var(--showBackground);
    }

  }
}

</style>
