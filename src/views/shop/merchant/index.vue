<template>
  <div class="merchant">
    <MerchantSearch @search="handleSearch">
      <div class="merchant-search" v-if="merchantDetail">
        <div class="merchant-search-top">
          <div class="merchant-search-name">{{ merchantDetail.name }}</div>
          <div class="merchant-search-score">{{ merchantDetail.score }}</div>
        </div>

        <div class="merchant-search-duration">
          <span>入驻时长：</span>
          <span>{{ merchantDetail.createDate }}</span>
        </div>
      </div>
    </MerchantSearch>
    <div class="merchant-head">
      <div class="merchant-head-inner" v-if="merchantDetail">
        <div class="merchant-code">
          <div class="merchant-code-img">
            <img
              :src="merchantDetail.qrCodeUrl"
              alt=""
              style="width: 100%; height: 100%"
            />
          </div>

          <div class="merchant-code-text">扫码查看小程序店铺</div>
        </div>

        <div class="merchant-introduce">
          <div class="merchant-introduce-logo">
            <img
              :src="getMerchantImageUrl()"
              alt=""
              style="width: 100%; height: 100%"
            />
          </div>
          <div class="merchant-introduce-desc">
            <div class="merchant-introduce-desc-top">
              <div class="merchant-introduce-desc-top-name">
                {{ merchantDetail.name }}
              </div>
              <div class="merchant-introduce-desc-top-collect">
                <MerchantCollect size="small" v-if="isLogin"></MerchantCollect>
              </div>
            </div>
            <div class="merchant-introduce-desc-item">
              <span>所在地区：</span>
              <span>
                {{ merchantDetail.province }} {{ merchantDetail.city }}
                {{ merchantDetail.area }}</span
              >
            </div>
            <div class="merchant-introduce-desc-item">
              <span>主营产品：</span>
              <span>{{ merchantDetail.mainProduce || "--" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="merchant-tab">
      <div class="merchant-tab-inner">
        <div class="tab-list">
          <router-link
            :to="{ name: 'enterpriseArchives' }"
            v-slot="{ isActive, navigate }"
            custom
          >
            <div
              class="tab-item"
              :class="{ active: isActive }"
              @click="navigate"
            >
              企业档案
            </div>
          </router-link>

          <router-link
            :to="{ name: 'product' }"
            v-slot="{ isActive, navigate }"
            custom
          >
            <div class="tab-item product" :class="{ active: isActive }">
              <span style="margin-right: 6px" @click="navigate">产品列表</span>
              <el-icon :size="12" @click.stop="changeTypeMenuShow"
                ><ArrowDown
              /></el-icon>

              <div class="product-type" v-if="isTypeMenuShow">
                <div
                  class="product-type-item"
                  v-for="(typeItem, typeIdx) in typeStatisticList"
                  :key="typeIdx"
                >
                  <span>{{ typeItem.name }}</span>
                  <span>(</span>
                  <span class="product-type-item-count">{{
                    typeItem.count || 0
                  }}</span>
                  <span>)</span>
                </div>
              </div>
            </div>
          </router-link>

          <router-link
            :to="{ name: 'contactUs' }"
            v-slot="{ isActive, navigate }"
            custom
          >
            <div
              class="tab-item"
              :class="{ active: isActive }"
              @click="navigate"
            >
              联系我们
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="merchant-container">
      <RouterView v-slot="{ Component }">
        <component :is="Component" ref="componentRef" />
      </RouterView>
      <!-- <ProductList></ProductList> -->
      <!-- <ProductDetail></ProductDetail> -->
    </div>
  </div>
</template>

<script setup>
import MerchantSearch from "@/components/layout/merchantSearch.vue";
// import ProductList from "./productList.vue";
import MerchantCollect from "./merchantCollect.vue";
// import ProductDetail from "./productDetail.vue";
import { useRoute, useRouter } from "vue-router";
import { getProductCategory } from "@/api/merchant.js";
import { getProductTypeStatistic } from "@/api/product";
import { onMounted, ref, provide, watch, onUnmounted } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { userInfo, isLogin } = storeToRefs(userStore);

const isTypeMenuShow = ref(false);

const route = useRoute();

const merchantId = ref(route.params.id);

const getMerchantImageUrl = () => {
  return new URL(`@/assets/img/merchant_default.png`, import.meta.url).href;
};

const hideTypeMenu = () => {
  isTypeMenuShow.value = false;
};

watch(
  () => isTypeMenuShow.value,
  () => {
    if (isTypeMenuShow.value) {
      window.addEventListener("click", hideTypeMenu);
    } else {
      window.removeEventListener("click", hideTypeMenu);
    }
  }
);

const changeTypeMenuShow = () => {
  isTypeMenuShow.value = !isTypeMenuShow.value;
};
// 大类统计数组
const typeStatisticList = ref([]);
const getStatistic = () => {
  getProductTypeStatistic({
    enterpriseId: merchantDetail.value.id
  }).then((data) => {
    typeStatisticList.value = data;
  });
};

onMounted(async () => {
  await getMerchantDetail();
  getStatistic();
});

onUnmounted(() => {
  window.removeEventListener("click", hideTypeMenu);
});

const router = useRouter();
const merchantDetail = ref({});

// 获取供应商详情
const getMerchantDetail = () => {
  let userId = userInfo.value ? userInfo.value.userId : "";
  return getProductCategory({
    enterpriseId: merchantId.value,
    userId
  }).then((data) => {
    merchantDetail.value = data;
  });
};

const componentRef = ref(null);

const handleSearch = (data) => {
  const { value } = data;
  // 判断当前路由是不是就是商户-商品列表

  if (route.name == "merchantProductList") {
    // 强制更新列表的请求

    componentRef.value && componentRef.value.forceSearch(value);
  } else {
    if (value.length == 0) {
      return;
    }
    router.push({
      name: "merchantProductList",
      query: {
        searchValue: encodeURIComponent(value)
      }
    });
  }
};

provide("detail", merchantDetail);
provide("updateFn", getMerchantDetail);
</script>

<style lang="scss" scoped>
@import "../../../assets/css/variable.scss";

.merchant-head {
  width: 100%;
  height: 130px;
  background-image: url("../../../assets/img/merchant_bg.png");
  background-size: 100% 100%;

  &-inner {
    position: relative;
    width: $min-width;
    margin: 0 auto;
    height: 100%;
  }
}
.merchant-code {
  position: absolute;
  right: 0;
  top: -6px;
  // width: 112px;

  box-sizing: border-box;
  &-img {
    position: relative;
    width: 112px;
    padding: 0 6px;
    height: 100px;
    box-sizing: border-box;

    &::before {
      content: " ";
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-right: 6px solid #cccccc;
    }

    &::after {
      content: " ";
      display: inline-block;
      position: absolute;
      right: 0;
      top: 0;
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-left: 6px solid #cccccc;
    }
  }

  &-text {
    line-height: 18px;
    font-size: 12px;
    color: #666666;
  }
}

.merchant-tab {
  width: 100%;
  height: 40px;
  background-color: #316eff;

  &-inner {
    width: $min-width;
    margin: 0 auto;
    height: 100%;
  }
}

.tab-list {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.tab-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 120px;
  color: #ffffff;
  font-size: 16px;
  background-color: #316eff;
  cursor: pointer;
  margin-right: 12px;
  &:hover,
  &.active {
    background-color: #1f5ef0;
  }
}

.merchant-container {
  width: $min-width;
  margin: 0 auto;
  margin-top: 24px;
}

.merchant-introduce {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;

  &-logo {
    width: 88px;
    height: 88px;
    margin-right: 16px;
  }

  &-desc {
    flex: 1;
    height: 100%;
    overflow: hidden;

    &-top {
      display: flex;
      align-items: flex-start;
      overflow: hidden;
      margin-bottom: 6px;

      &-name {
        flex-shrink: 1;
        flex-grow: 0;
        color: #1a1a1a;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        margin-right: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &-collect {
        flex-shrink: 0;
      }
    }

    &-item {
      width: 100%;
      font-size: 12px;
      line-height: 18px;
      margin-bottom: 4px;
      color: #666666;
    }
  }
}

.tab-item.product {
  position: relative;

  .product-type {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    transform: translateY(100%);
    z-index: 10;
    box-shadow: 0 0 2px 2px rgba(232, 232, 232, 0.8);

    &-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 40px;
      padding: 0 14px;
      box-sizing: border-box;
      cursor: pointer;
      font-size: 14px;
      color: #1a1a1a;
      background-color: #ffffff;
      &.active,
      &:hover {
        background: linear-gradient(90deg, #f5faff 0%, #e8f3ff 100%);
      }

      &-count {
        color: #666666;
      }
    }
  }
}

.merchant-search {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;

  &-top {
    display: inline-flex;
    align-items: center;
    margin-bottom: 2px;
  }

  &-name {
    font-size: 16px;
    line-height: 24px;
    color: #1a1a1a;
    font-weight: 700;
    margin-right: 6px;
  }

  &-score {
    display: flex;
    align-items: center;
    height: 22px;
    font-size: 14px;
    color: #00baad;
    font-weight: 700;
    padding: 0 6px;
    box-sizing: border-box;
    border-radius: 2px;
    background-color: #ebfffe;
  }

  &-duration {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    padding: 0 5px;
    box-sizing: border-box;
    font-size: 14px;
    color: #316eff;
    border-radius: 2px;
    background-color: #e8f3ff;
  }
}
</style>
