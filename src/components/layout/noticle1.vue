<template>
  <div class="notice-card-wrapper">
    <div class="header">
      <div class="title">
        <!-- 系统公告 -->
        <div class="message">
          <div class="inner-container">
            <span v-html="notice"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const notice = ref(
  "我是广播文字内容，哈哈哈哈，你习惯不行啊，我页不知道啊啊啊啊啊"
);
</script>

<style lang="scss" scoped>
.notice-card-wrapper {
  .inner-container {
    // margin-left: 100%; // 把文字弄出可见区域
    width: 100%;
    animation: myMove 30s linear infinite; // 重点，定义动画
    animation-fill-mode: forwards;
  }
  /*文字无缝滚动*/
  @keyframes myMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-2500px);
    }
  }
}
</style>
