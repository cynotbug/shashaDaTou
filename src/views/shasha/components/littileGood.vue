<template>
  <div class="littileGood">
    <div><img :src="getshashaImg()" class="shasha" /></div>
    <div class="heart">
      <Heart />
    </div>

    <div><img :src="getdatouImg()" class="datou" /></div>
  </div>
</template>

<script setup>
import Heart from "./heart.vue";
const getshashaImg = () => {
  return new URL(`@/assets/img/shasha.jpg`, import.meta.url).href;
};
const getdatouImg = () => {
  return new URL(`@/assets/img/datou.jpg`, import.meta.url).href;
};
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
