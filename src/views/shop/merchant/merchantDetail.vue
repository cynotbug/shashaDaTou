<template>
  <div class="merchant-detail">
    <div class="merchant-detail-name">
      {{ merchantDetail.name }}
    </div>

    <div class="merchant-detail-content">
      <div class="merchant-detail-content-item">
        <span class="merchant-detail-content-item-key">所在地区：</span>
        <span class="merchant-detail-content-item-value">
          {{ merchantDetail.province }} {{ merchantDetail.city }}
          {{ merchantDetail.area }}
        </span>
      </div>
      <div class="merchant-detail-content-item" v-if="isPhoneShow">
        <span class="merchant-detail-content-item-key">负责人：</span>
        <span class="merchant-detail-content-item-value">{{
          merchantDetail.principal
        }}</span>
      </div>
      <div class="merchant-detail-content-item" v-if="isPhoneShow">
        <span class="merchant-detail-content-item-key">联系方式：</span>
        <span class="merchant-detail-content-item-value">{{
          merchantDetail.principalPhone
        }}</span>
      </div>

      <div class="merchant-detail-content-item">
        <span class="merchant-detail-content-item-key">主营产品：</span>
        <span class="merchant-detail-content-item-value">
          {{ merchantDetail.mainProduce }}
        </span>
      </div>

      <MerchantCollect v-if="isLogin"></MerchantCollect>
    </div>

    <div class="merchant-detail-contact">
      <span class="merchant-detail-contact-key">客服电话：</span>
      <span class="merchant-detail-contact-value">{{
        merchantDetail.legalPhone
      }}</span>
    </div>
  </div>
</template>

<script setup>
import MerchantCollect from "./merchantCollect.vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);

import { watch, ref } from "vue";

const props = defineProps({
  detail: {
    // type: Object,
    required: true
  },
  isPhoneShow: {
    type: Boolean,
    default: false
  }
});

const merchantDetail = ref({});

watch(
  () => props.detail,
  () => {
    merchantDetail.value = props.detail;
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
.merchant-detail {
  width: 100%;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  background-color: #fff;

  &-name {
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    padding: 0 16px;
    box-sizing: border-box;
    word-break: break-all;
    background-image: url("../../../assets/img/merchant_detail_bg.png");
    background-size: 100% 100%;
    text-align: center;
  }

  &-content {
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;

    &-item {
      width: 100%;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      &-key {
        color: #666666;
      }

      &-value {
        color: #1a1a1a;
      }
    }
  }

  &-contact {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 52px;
    border-top: 1px solid #e8e8e8;
    box-sizing: border-box;
    padding: 0px 16px;

    &-key {
      color: #666666;
      font-size: 14px;
    }

    &-value {
      color: #316eff;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
