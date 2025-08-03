<script setup>

</script>

<template>

  <div>
    <router-view></router-view>
  </div>

</template>

<style>

/* 默认蓝色主题 */
:root {
  --mainBackground: #30e3ca;
  --mainButton: #8be8ef;
  --mainButtonHover: #a6e3e9;
  --mainText: #ffffff;
  --mainTextHover: #fce38a;
  --showBackground: #def3f3;
  --listBackground: #cbf1f5;
  --listChatRemarkText: #000000;
  --listChatTimeColor: #787878;
  --separateBox: #c3eef3;
}

/* 黄色主题 */
.yellow-theme {
  --mainBackground: #ffc107;
  --mainButton: #ffe082;
  --mainButtonHover: #ffecb3;
  --mainText: #212121;
  --mainTextHover: #ff5722;
  --showBackground: #fff8e1;
  --listBackground: #fff3cd;
  --listChatRemarkText: #000000;
  --listChatTimeColor: #757575;
  --separateBox: #ffeeba;
}

/* 深色主题 */
.dark-theme {
  --mainBackground: #121212;
  --mainButton: #1f1f1f;
  --mainButtonHover: #2c2c2c;
  --mainText: #ffffff;
  --mainTextHover: #90caf9;
  --showBackground: #1e1e1e;
  --listBackground: #2e2e2e;
  --listChatRemarkText: #e0e0e0;
  --listChatTimeColor: #9e9e9e;
  --separateBox: #3c3c3c;
}




</style>
