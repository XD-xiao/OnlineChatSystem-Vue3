<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import ReviewObject from "@/components/ReviewObject.vue";
import { getApplyInfoListService } from "@/api/Review";

const applyInfoList = ref({
  friends: [
    {
      friendId: 1,
      userId: 1,
      userName: "小王",
      email: "46846@qq.com",
      logo: "https://picsum.photos/50/50",
      gender: 1,
      status: 1,
      text: "成为你的好友",
      appTime: "2021-04-01 00:00:00",
    },
  ],
  groups: [
    {
      groupMemberId: 1,
      userId: 1,
      userName: "小84684王",
      email: "46846@qq.com",
      logo: "https://picsum.photos/50/50",
      gender: 1,
      status: 1,
      text: "加入XX群聊",
      appTime: "2021-01-03 00:00:00",
    },
  ],
});
const getApplyInfoList = async ()  => {

  const res = await getApplyInfoListService();

  applyInfoList.value = res.data.data;

};



const TypeSelection = ref("好友");
const options = ["好友", "群聊"];

const selectedIndex = ref(0);



onMounted(() => {
  getApplyInfoList();
})

</script>

<template>
  <div class="container">
    <div class="listPanel">
      <div class="typeSelectionPanel">
        <el-segmented v-model="TypeSelection" :options="options" block style="width: 100%" />
      </div>

      <el-scrollbar>
        <div v-if="TypeSelection === '好友'">
          <ul>
            <li
                v-for="(item, index) in applyInfoList.friends"
                :key="index"
                @click="selectedIndex = index"
            >
              <img :src="item.logo" alt="" />
              <div class="chat-info">
                <div class="chat-info-title-name">{{ item.userName }}</div>
                <div class="chat-info-title-time">{{ item.appTime }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <ul>
            <li
                v-for="(item, index) in applyInfoList.groups"
                :key="index"
                @click="selectedIndex = index"
            >
              <img :src="item.logo" alt="" />
              <div class="chat-info">
                <div class="chat-info-title-name">{{ item.userName }}</div>
                <div class="chat-info-title-time">{{ item.appTime }}</div>
              </div>
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </div>

    <div class="showPanel">
      <div class="hide-scrollbar" ref="containerRef" style="height: 100%; overflow-y: auto">
        <ReviewObject  v-if="TypeSelection === '好友'" :item="applyInfoList.friends[selectedIndex]" />
        <ReviewObject v-else :item="applyInfoList.groups[selectedIndex]" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.typeSelectionPanel {
  width: 80%;
  margin: 10px auto;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.typeSelectionPanel .el-segmented {
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: var(--mainButton);
  --el-border-radius-base: 8px;
  background-color: var(--showBackground);
}

.container {
  display: flex;
  height: 100%;
}

.listPanel {
  width: 20%;
  background-color: var(--listBackground);

  .el-scrollbar{
    height: 620px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;

    li {
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 10px;
      }

      .chat-info {
        display: block;

        .chat-info-title-name {
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
        }

        .chat-info-title-time {
          width: 200px;
          overflow: hidden;
          font-size: 12px;
          white-space: nowrap;
        }
      }
    }

    li:hover,
    li.active {
      background-color: var(--mainButtonHover);
    }
  }
}

.showPanel {
  width: 80%;
  display: block;
  background-color: var(--showBackground);

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
</style>
