<template>
  <div class="littileGood">
    <div><img src="../../../assets/img/shasha.jpg" class="shasha" /></div>
    <div class="heart">
      <Heart />
    </div>

    <div><img src="../../../assets/img/datou.jpg" class="datou" /></div>
  </div>
</template>

<script setup>
import Heart from "./heart.vue";
</script>

<style lang="scss" scoped>
.littileGood {
  width: 100%;
  height: 500px;
  display: flex;
  //   align-items: center;
  .heart {
    // width: px;
    flex: 1;
  }
  .shasha {
    width: 300px;
    // width: calc((100% - 678px) / 2);
    height: 500px;
    border-radius: 8px;
  }
  .datou {
    width: 300px;
    height: 500px;
    border-radius: 8px;
  }
}
</style>
