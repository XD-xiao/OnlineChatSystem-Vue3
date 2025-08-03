<script setup>

const props = defineProps({
  chatHistory: {
    type: Array,
    default: () => []
  }

})



</script>

<template>
  <el-scrollbar >
    <ul>
      <li v-for="item in chatHistory">
        <div class="left-chat-item" v-if="item.nature !== 1">
          <img :src="item.logo" alt="" />
          <div class="chat-info">
            <div class="title">
              <div class="name">{{ item.name }}</div>
              <div class="time">{{ item.time }}</div>
            </div>
            <div class="content">{{ item.content }}</div>
          </div>
        </div>
        <div class="right-chat-item" v-else>
          <div class="chat-info">
            <div class="time">{{ item.time }}</div>
            <div class="content">{{ item.content }}</div>
          </div>
          <img :src="item.logo" alt="" />
        </div>
      </li>
    </ul>
  </el-scrollbar>

</template>

<style scoped>

ul{
  list-style: none;
  padding: 10px;
  margin: 0;
  display: block;

  li{
    width: 100%;
    min-height: 60px;

    .left-chat-item , .right-chat-item{
      display: flex;

      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;

      }
      .chat-info{
        display: block;

        .title{
          display: flex;

          .name {
            margin-right: 10px;
          }
        }

        .name{
          font-size: 12px;
        }

        .time{
          font-size: 12px;
          color: var(--listChatTimeColor);
        }
        .content{
          font-size: 16px;
          width: 500px;             /* 设置一个固定宽度或最大宽度 */
          max-width: 100%;          /* 可选：根据容器调整 */
          word-wrap: break-word;    /* 允许长单词或URL断行 */
          white-space: pre-wrap;    /* 保留空白符和换行符，内容过长时换行 */
          /* 或者使用下面这一行代替 pre-wrap，不保留空白符 */
          /* white-space: normal; */
        }
      }
    }
    .left-chat-item{
      .chat-info{
        margin-left: 10px;
      }
    }
    .right-chat-item{
      justify-content: flex-end;
      .chat-info{
        margin-right: 20px;
        text-align: right;
      }
    }
  }

}
</style>
