<template>
  <div class="product-detail">
    <div class="product-crumb">
      <div class="product-crumb-item">
        <span>产品列表</span>
        <span class="iconfont icon-youbian"></span>
      </div>
      <div class="product-crumb-item">
        <span>{{ productDetail.productType }}</span>
        <span class="iconfont icon-youbian"></span>
      </div>
      <div class="product-crumb-item">
        <span>{{ productDetail.productName }}</span>
      </div>
    </div>
    <div class="product-info">
      <div class="product-info-left">
        <div class="product-info-img">
          <div class="product-info-img-tag" v-if="productDetail.starRate">
            {{ getStarName(productDetail.starRate) }}
          </div>
          <img
            v-if="productDetail.image"
            :src="productDetail.image.url"
            alt=""
            style="width: 100%; height: 100%"
          />

          <img
            v-else
            :src="getImageUrl()"
            alt=""
            style="width: 100%; height: 100%"
          />
        </div>
      </div>
      <div class="product-info-right">
        <div class="product-info-name">
          <div class="product-info-name-text">
            {{ productDetail.name || "" }}
          </div>
          <div class="product-info-name-img">
            <img
              v-if="productDetail.starRate == 1"
              :src="getStarImageUrl(1)"
              alt=""
              style="width: 100%; height: 100%"
            />
            <img
              v-if="productDetail.starRate == 2"
              :src="getStarImageUrl(2)"
              alt=""
              style="width: 100%; height: 100%"
            />
            <img
              v-if="productDetail.starRate == 3"
              :src="getStarImageUrl(3)"
              alt=""
              style="width: 100%; height: 100%"
            />
          </div>
        </div>
        <div class="product-info-content">
          <div class="product-info-content-top">
            <div class="product-info-content-item">
              <div class="product-info-content-item-key">依据标准</div>
              <div class="product-info-content-item-value">
                <div v-for="item in productDetail.baseParam" :key="item.code">
                  {{ item.name }}({{ item.code }})
                </div>
              </div>
            </div>

            <!-- <div class="product-info-content-item">
              <div class="product-info-content-item-key">生产厂家</div>
              <div class="product-info-content-item-value">
                <div>新郑市龙湖镇欣荣装饰涂料工厂</div>
              </div>
            </div> -->
          </div>

          <div class="product-info-content-bottom">
            <div class="product-info-content-report">
              <div class="product-info-content-report-key">检测报告</div>
              <div
                class="product-info-content-report-value"
                v-if="!productDetail.detectionUrl"
              >
                <span class="product-info-content-report-value-text"
                  >暂无报告</span
                >
              </div>
              <div
                v-else
                class="product-info-content-report-value"
                @click="downloadFile('detectionUrl')"
              >
                <span class="product-info-content-report-value-text"
                  >查看报告</span
                >
                <!-- <el-icon :size="16"><Download /></el-icon> -->
                <el-icon :size="16" color="#316EFF"><View /></el-icon>
              </div>
            </div>
            <div class="product-info-content-report">
              <div class="product-info-content-report-key">材型报告</div>
              <div
                class="product-info-content-report-value"
                v-if="!productDetail.woodTypeUrl"
              >
                <span class="product-info-content-report-value-text"
                  >暂无报告</span
                >
              </div>
              <div
                v-else
                class="product-info-content-report-value"
                @click="downloadFile('woodTypeUrl')"
              >
                <span class="product-info-content-report-value-text"
                  >查看报告</span
                >
                <el-icon :size="16"><Download /></el-icon>
              </div>
            </div>

            <div class="product-info-content-report">
              <div class="product-info-content-report-key">
                绿色建材评审报告
              </div>

              <div
                class="product-info-content-report-value"
                v-if="!productDetail.evaluateUrl"
              >
                <span class="product-info-content-report-value-text"
                  >暂无报告</span
                >
              </div>
              <div
                v-else
                class="product-info-content-report-value"
                @click="downloadFile('evaluateUrl')"
              >
                <span class="product-info-content-report-value-text"
                  >查看报告</span
                >
                <el-icon :size="16"><Download /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="product-info-collect">
          <ProductCollect
            v-if="isLogin"
            :detail="productDetail"
            @update="updateProductDetail"
          ></ProductCollect>
        </div> -->

        <div class="product-info-operate">
          <ProductCollect
            v-if="isLogin"
            :detail="productDetail"
            @update="updateProductDetail"
          ></ProductCollect>
          <div class="product-info-phone" @click="getPhone">
            <img
              :src="getPhoneImageUrl()"
              alt=""
              style="width: 16px; height: 16px"
            />
            <span>交换联系方式</span>
          </div>
          <div class="product-info-chat">
            <img
              :src="getChatImageUrl()"
              alt=""
              style="width: 16px; height: 16px"
            />
            <span>询价</span>
          </div>
        </div>
      </div>
    </div>

    <div class="other-info">
      <div class="other-info-left">
        <MerchantDetail
          :detail="merchantDetail"
          :isPhoneShow="isPhoneShow"
        ></MerchantDetail>
      </div>
      <div class="other-info-right">
        <div class="detail-container">
          <div class="detail-head">
            <div class="detail-head-active">产品详情</div>
          </div>

          <div class="detail-body">
            {{ productDetail.introduce || "--" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCollect from "./productCollect.vue";
import MerchantDetail from "./merchantDetail.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, inject } from "vue";
import { getProductDetail } from "@/api/product";
import { addCollectOrRecord } from "@/api/collect";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { ElMessageBox } from "element-plus";

const isPhoneShow = ref(false);

const getPhone = () => {
  isPhoneShow.value = true;
  ElMessageBox.alert(`${merchantDetail.value.principalPhone}`, "联系方式", {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: "确认",
    callback: () => {
      // console.log();
    }
  });
};

const userStore = useUserStore();

const { userInfo, isLogin } = storeToRefs(userStore);

const merchantDetail = inject("detail", {});

const getStarImageUrl = (type) => {
  const imgMap = {
    1: new URL("@/assets/img/product_star_1.png", import.meta.url).href,
    2: new URL("@/assets/img/product_star_2.png", import.meta.url).href,
    3: new URL("@/assets/img/product_star_3.png", import.meta.url).href
  };

  let url = imgMap[type];
  // return new URL(`@/assets/img/${url}`, import.meta.url).href;
  return url;
};

const route = useRoute();
const productDetail = ref({});

const updateProductDetail = async () => {
  let userId = userInfo.value.userId || "";

  const data = await getProductDetail({
    id: productDetail.value.id,
    userId
  });

  let { detectionUrl, evaluateUrl, woodTypeUrl } = data;
  detectionUrl = detectionUrl ? JSON.parse(detectionUrl) : "";
  evaluateUrl = evaluateUrl ? JSON.parse(evaluateUrl) : "";
  woodTypeUrl = woodTypeUrl ? JSON.parse(woodTypeUrl) : "";
  data.detectionUrl = detectionUrl;
  data.evaluateUrl = evaluateUrl;
  data.woodTypeUrl = woodTypeUrl;

  productDetail.value = data;
};

onMounted(async () => {
  const { productId } = route.params;
  let userId = userInfo.value ? userInfo.value.userId : "";
  try {
    const data = await getProductDetail({
      id: productId,
      userId
    });
    let { detectionUrl, evaluateUrl, woodTypeUrl } = data;
    detectionUrl = detectionUrl ? JSON.parse(detectionUrl) : "";
    evaluateUrl = evaluateUrl ? JSON.parse(evaluateUrl) : "";
    woodTypeUrl = woodTypeUrl ? JSON.parse(woodTypeUrl) : "";
    data.detectionUrl = detectionUrl;
    data.evaluateUrl = evaluateUrl;
    data.woodTypeUrl = woodTypeUrl;

    productDetail.value = data;

    isLogin.value && addRecord(data.id);
    // data.id
  } catch (error) {
    console.log(error);
  }
});

const addRecord = (businessId) => {
  addCollectOrRecord({
    businessId,
    type: 1,
    userId: userInfo.value.userId
  }).then(() => {
    // console.log("successs");
  });
};

const getStarName = (type) => {
  const starMap = {
    1: "一星",
    2: "二星",
    3: "三星"
  };

  return `绿色建材${starMap[type]}`;
};

const getImageUrl = () => {
  return new URL(`@/assets/img/product_default.png`, import.meta.url).href;
};

const getPhoneImageUrl = () => {
  return new URL(`@/assets/img/product_phone.png`, import.meta.url).href;
};

const getPreviewImageUrl = () => {
  return new URL(`@/assets/img/product_preview.png`, import.meta.url).href;
};

const getChatImageUrl = () => {
  return new URL(`@/assets/img/product_chat.png`, import.meta.url).href;
};

const downloadFile = (key) => {
  let list = productDetail.value[key];

  // list.forEach((item) => download(item.response.data));
  let url = list[0].response.data;
  window.open(url);
};

const download = (url) => {
  const a = document.createElement("a");
  a.href = url;
  const mouseEvent = new MouseEvent("click");
  a.dispatchEvent(mouseEvent);
};
</script>

<style lang="scss" scoped>
.product-detail {
  width: 100%;
}

.product-info {
  position: relative;
  // display: flex;
  // align-items: flex-start;
  width: 100%;
  padding-right: calc(100% - 372px - 22px);
  box-sizing: border-box;
  // height: 440px;

  &-left {
    width: 350px;
    height: 100%;
    margin-right: 22px;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
  }

  &-img {
    position: relative;
    width: 100%;
    height: 348px;

    &-tag {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 0;
      height: 32px;
      padding: 0 8px;
      box-sizing: border-box;
      background-color: #e8ffea;
      font-size: 14px;
      color: #00b42a;
      background-color: #e8ffea;
      border-bottom-left-radius: 2px;
    }
  }

  &-pictures {
    width: 100%;
    padding-top: 12px;
    box-sizing: border-box;
  }

  &-picture {
    width: calc(100% + 12px);
    margin-left: -6px;
    margin-right: -6px;
    font-size: 0;

    &-item {
      display: inline-block;
      width: 78px;
      height: 78px;
      margin-left: 6px;
      margin-right: 6px;
      cursor: pointer;
    }
  }

  &-right {
    // flex: 1;
    position: absolute;
    right: 0;
    top: 0;
    width: calc(100% - 372px);
    height: 100%;
  }

  &-name {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    width: 100%;
    font-size: 18px;
    line-height: 28px;
    color: #1a1a1a;
    font-weight: 700;
    margin-bottom: 8px;

    &-text {
      display: inline-flex;
      margin-right: 8px;
    }

    &-img {
      display: inline-flex;
      width: 46px;
      height: 25px;
    }
  }

  &-operate {
    position: absolute;
    bottom: 0px;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &-phone,
  &-chat {
    // position: absolute;
    // bottom: 0px;
    // right: 0;
    display: inline-flex;
    align-items: center;
    text-align: center;
    line-height: 34px;
    height: 34px;
    padding: 0 20px;

    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 10px;
    box-sizing: border-box;

    span {
      margin-left: 8px;
    }
  }

  &-chat {
    background-color: #ff8d1a;
    color: #ffffff;
  }

  &-phone {
    background-color: #e8f3ff;
    border: 1px solid #316eff;
    color: #316eff;
  }

  &-content {
    position: relative;
    width: 100%;
    background-color: #f5f7fa;
    border-radius: 2px;
    padding: 0 12px;
    box-sizing: border-box;

    &-top {
      padding-top: 12px;
      padding-bottom: 4px;
      width: 100%;
      border-bottom: 1px solid #e8e8e8;
      box-sizing: border-box;
    }

    &-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 8px;
      line-height: 20px;

      &-key {
        flex-shrink: 0;
        width: 90px;
        text-align: start;
        font-size: 14px;
        color: #666666;
      }

      &-value {
        flex: 1;
        font-size: 14px;
        color: #1a1a1a;
      }
    }

    &-bottom {
      display: flex;
      align-items: center;
      width: 100%;
      height: 48px;
    }

    &-report {
      display: inline-flex;
      align-content: center;
      font-size: 14px;
      line-height: 20px;
      margin-right: 64px;

      &-key {
        color: #666666;
        margin-right: 14px;
      }

      &-value {
        display: inline-flex;
        align-items: center;
        color: #316eff;
        cursor: pointer;

        &-text {
          margin-right: 10px;
        }
      }
    }
  }

  &-collect {
    margin-top: 30px;
  }
}

.other-info {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;

  &-left {
    flex-shrink: 0;
    width: 228px;
    margin-right: 14px;
  }

  &-right {
    flex: 1;
  }

  .detail-container {
    width: 100%;
  }

  .detail-head {
    position: relative;
    width: 100%;
    height: 46px;
    border-left: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    box-sizing: border-box;
    background-color: #f1f1f1;

    &-active {
      position: absolute;
      left: 0;
      top: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 100%;
      background-color: #fff;
      font-size: 16px;
      border-top: 1px solid #316eff;
      color: #1a1a1a;
    }
  }

  .detail-body {
    width: 100%;
    min-height: 300px;
    padding: 16px 16px;
    border-left: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
    box-sizing: border-box;
  }
}

.product-crumb {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;

  &-item {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    color: #999999;

    &.active {
      color: #666666;
    }
  }
}
</style>
