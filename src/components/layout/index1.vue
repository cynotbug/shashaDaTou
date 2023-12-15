<template>
  <noticle />
  <div class="main" id="main">
    <div class="content">
      <div class="main-content" ref="mainRef">
        <router-view></router-view>
      </div>

      <div class="footer">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>
<script setup>
import noticle from "./noticle.vue";
import Footer from "./footer.vue";
</script>
<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
</style>
