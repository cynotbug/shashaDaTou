<template>
  <div class="favorites">
    <Search @search="handleSearch">
      <div class="fontStyle">收藏夹</div>
    </Search>
    <div class="myCollect-tab">
      <div class="myCollect-tab-inner">
        <div
          v-for="(item, index) in tabs"
          :key="index"
          @click="onClickItem(index)"
        >
          <div
            class="myCollect-tab-inner-content"
            :class="index == current ? 'checked' : ''"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="current == 0">
      <GoodsCollect :condition="condition" ref="goodsCollectRef" />
    </div>
    <div v-else>
      <ShopCollect :condition="condition" ref="shopCollectRef" />
    </div>
  </div>
</template>

<script setup>
import Search from "@/components/layout/search.vue";
import GoodsCollect from "./goodsCollect.vue";
import ShopCollect from "./shopCollect.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive } from "vue";
const router = useRouter();
const goodsCollectRef = ref();
const shopCollectRef = ref();
const tabs = ref([
  {
    name: "产品收藏",
    value: 0
  },
  {
    name: "店铺收藏",
    value: 1
  }
]);
const condition = reactive({
  contentType: "",
  content: ""
});
const current = ref(0);

const route = useRoute();
// 根据url展示产品还是店铺
onMounted(() => {
  current.value = route.query.type || 0;
});
const onClickItem = (e) => {
  current.value = e;
};
// 处理搜索
const handleSearch = (data) => {
  const { value, type } = data;
  if (value.length == 0) {
    return;
  }
  // 1供应商2商品
  let path = type == 1 ? `/supplier` : `/shop/productList`;

  router.push({
    path,
    query: {
      searchValue: encodeURIComponent(value)
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
.favorites {
  width: $min-width;
  margin: 0 auto;
  .myCollect-tab {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #316eff;
    margin-bottom: 24px;

    &-inner {
      width: $min-width;
      margin: 0 auto;
      display: flex;

      &-content {
        width: 120px;

        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 40px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        cursor: pointer;
      }
      .checked {
        background: rgba(31, 94, 240, 1);
      }
    }
  }
}
</style>
<style>
.fontStyle {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 28.96px;
  color: rgba(102, 102, 102, 1);
  /* padding-left: 8px; */
  /* vertical-align: 17px; */
  margin-top: 12px;
  /* margin-left: 8px; */
}
</style>
