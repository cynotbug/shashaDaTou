<template>
  <div class="merchant-product">
    <div class="merchant-product-general">
      <div class="merchant-type-list">
        <TypeList :detail="merchantDetail"></TypeList>
      </div>

      <MerchantDetail :detail="merchantDetail"></MerchantDetail>
    </div>

    <div class="merchant-product-list">
      <CustomProduct
        :count="4"
        ref="productRef"
        :searchValue="searchValue"
        :enterpriseId="merchantDetail.id"
        :scopeType="2"
      ></CustomProduct>
    </div>
  </div>
</template>

<script setup>
import CustomProduct from "@/components/product/index.vue";
import MerchantDetail from "./merchantDetail.vue";
import TypeList from "./typeList.vue";
import { ref, nextTick, inject } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

let text = route.query.searchValue || "";
let searchValue = ref(decodeURIComponent(text));

const productRef = ref(null);

const forceSearch = async (value) => {
  searchValue.value = value;
  await nextTick();
  productRef.value && productRef.value.resetAndGetData();
};

const merchantDetail = inject("detail", {});

console.log(merchantDetail);
defineExpose({
  forceSearch
});
</script>

<style lang="scss" scoped>
.merchant-product {
  display: flex;
  width: 100%;

  &-general {
    flex-shrink: 0;
    width: 228px;
    margin-right: 14px;
  }

  &-list {
    flex: 1;
  }
}

.merchant-type-list {
  margin-bottom: 12px;
}
</style>
