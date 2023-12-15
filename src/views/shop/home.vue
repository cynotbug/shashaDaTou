<template>
  <Search @search="handleSearch"></Search>

  <div class="shop-head">
    <div class="shop-head-inner">
      <div class="type-container">
        <div class="type-head">
          <div class="type-head-icon"></div>
          <div class="type-head-name">全部商品分类</div>
        </div>
        <div class="type-list">
          <div
            class="type-list-item"
            v-for="categoryItem in categoryList"
            :key="categoryItem.producePropertyId"
          >
            <div class="type-list-item-name">{{ categoryItem.name }}</div>
            <div class="type-list-item-sub">
              <span
                class="type-list-item-sub-item"
                @click="toProductList(secondCategory)"
                :key="secondCategory.producePropertyId"
                v-for="secondCategory in categoryItem.secondInfo"
                >{{ secondCategory.name }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="banner-container">
        <div class="banner-main">
          <el-carousel
            height="376px"
            indicator-position="none"
            :autoplay="false"
          >
            <el-carousel-item v-for="item in 4" :key="item">
              <img
                :src="getBannerImageUrl()"
                alt=""
                style="width: 100%; height: 100%"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="user-container">
        <div class="user-main">
          <div class="user-head">
            <div class="user-head-avatar">
              <img
                :src="getAvatarImageUrl()"
                alt=""
                style="width: 100%; height: 100%"
              />
            </div>

            <div class="user-head-name" v-if="isLogin">
              <span style="margin-right: 6px">HI!</span>
              <span>{{ userInfo.name }}</span>
            </div>

            <div class="user-head-name tourist" v-if="!isLogin">
              <span>登陆后可查看更多服务</span>
            </div>
          </div>

          <div class="user-menu" v-if="isLogin">
            <div class="user-menu-item" @click="toFavorites(0)">
              <div class="user-menu-item-icon icon1"></div>
              <div class="user-menu-item-name">收藏产品</div>
            </div>
            <div class="user-menu-item" @click="toRecord">
              <div class="user-menu-item-icon icon2"></div>
              <div class="user-menu-item-name">我的足迹</div>
            </div>
            <div class="user-menu-item" @click="toFavorites(1)">
              <div class="user-menu-item-icon icon3"></div>
              <div class="user-menu-item-name">收藏供应商</div>
            </div>
          </div>

          <div class="user-menu-login" v-if="!isLogin">
            <div class="user-menu-login-btn">登录</div>
          </div>

          <div class="notice-container">
            <div class="notice-title">网站公告</div>
            <div class="notice-list">
              <div class="notice-list-item">
                <div class="notice-list-item-label">公告</div>
                <el-tooltip
                  content="精准对接，共赢未来！欢迎加入建筑原材料综合交易平台！"
                  placement="bottom"
                  effect="light"
                >
                  <div class="notice-list-item-detail">
                    精准对接，共赢未来！欢迎加入建筑原材料综合交易平台！
                  </div>
                </el-tooltip>
              </div>
              <div class="notice-list-item">
                <div class="notice-list-item-label">公告</div>

                <el-tooltip
                  content="一站式采购，助力建筑产业发展！体验创新交易平台！"
                  placement="bottom"
                  effect="light"
                >
                  <div class="notice-list-item-detail">
                    一站式采购，助力建筑产业发展！体验创新交易平台！
                  </div>
                </el-tooltip>
              </div>
              <div class="notice-list-item">
                <div class="notice-list-item-label">公告</div>

                <el-tooltip
                  content="打造智慧交易生态，畅享建材行业新机遇！"
                  placement="bottom"
                  effect="light"
                >
                  <div class="notice-list-item-detail">
                    打造智慧交易生态，畅享建材行业新机遇！
                  </div>
                </el-tooltip>
              </div>
              <div class="notice-list-item">
                <div class="notice-list-item-label">公告</div>
                <el-tooltip
                  content="打造智慧交易生态，畅享建材行业新机遇！"
                  placement="bottom"
                  effect="light"
                >
                  <div class="notice-list-item-detail">
                    优质原材料，卓越交易体验！建筑产业的选择之地！
                  </div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="material-container">
    <h1 class="material-title">全品类商品在线下单</h1>
    '
    <div class="material-list">
      <div class="material-item" v-for="(item, idx) in productList" :key="idx">
        <div class="material-item-head" :class="[`type${idx + 1}`]">
          <div class="material-item-type">
            <div class="material-item-type-name">{{ item.name }}</div>
            <div
              class="material-item-type-more"
              @click.stop="toFirstProductList(item)"
            >
              <span>查看更多</span>
              <el-icon :size="12"><ArrowRight /></el-icon>
            </div>
          </div>

          <div class="material-item-enum">
            <div
              class="material-item-enum-item"
              :class="[`type${idx + 1}`]"
              v-for="secondItem in item.secondInfo"
              :key="secondItem.producePropertyId"
              @click.stop="toProductList(secondItem)"
            >
              {{ secondItem.name }}
            </div>
          </div>
        </div>

        <div class="material-item-list">
          <div
            class="material-item-list-empty"
            v-if="item.proPartVoList.length == 0"
          >
            <div class="material-item-list-empty-img">
              <img
                :src="getNoDataImageUrl()"
                alt=""
                style="width: 100%; height: 100%"
              />
            </div>

            <div class="material-item-list-empty-text">暂无商品</div>
          </div>
          <div class="material-item-list-margin" v-else>
            <div
              class="material-item-list-item"
              v-for="productItem in item.proPartVoList"
              :key="productItem.id"
              @click.stop="toProductDetail(productItem)"
            >
              <div
                class="material-item-list-item-label"
                v-if="productItem.startRateDesc"
              >
                {{ productItem.startRateDesc }}
              </div>

              <div class="material-item-list-item-img">
                <div class="material-item-list-item-img-detail">查看详情</div>
                <img
                  v-if="!productItem.image"
                  :src="getImageUrl()"
                  alt=""
                  style="width: 100%; height: 100%"
                />
                <img
                  v-else
                  :src="productItem.image.url"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </div>

              <div class="material-item-list-item-name">
                {{ productItem.name }}
              </div>

              <div class="material-item-list-item-footer">
                <div class="material-item-list-item-footer-icon"></div>
                <div class="material-item-list-item-footer-merchant">
                  {{ productItem.enterpriseName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Search from "@/components/layout/search.vue";
import { useRouter } from "vue-router";
import { getProductCategory, getHomeAllProduct } from "../../api/product";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isLogin, userInfo } = storeToRefs(userStore);

const getImageUrl = () => {
  return new URL(`@/assets/img/product_default.png`, import.meta.url).href;
};

const getAvatarImageUrl = () => {
  return new URL(`@/assets/img/user_default.png`, import.meta.url).href;
};

const router = useRouter();

const toProductList = (secondCategory) => {
  const { pid, producePropertyId } = secondCategory;
  router.push({
    path: "/shop/productList",
    query: {
      firstCategory: pid,
      secondCategory: producePropertyId
    }
  });
};

const toFirstProductList = (item) => {
  let { producePropertyId } = item;
  router.push({
    path: "/shop/productList",
    query: {
      firstCategory: producePropertyId
    }
  });
};

const toProductDetail = (productItem) => {
  const { enterpriseId, id } = productItem;
  router.push({
    path: `/shop/merchant/${enterpriseId}/product/detail/${id}`
  });
};

const toRecord = () => {
  router.push({
    path: "/shop/record"
  });
};

const toFavorites = (type) => {
  router.push({
    path: "/shop/favorites",
    query: {
      type
    }
  });
};

const getNoDataImageUrl = () => {
  return new URL(`@/assets/img/no_data_product.png`, import.meta.url).href;
};

const getBannerImageUrl = () => {
  return new URL(`@/assets/img/banner_img_1.png`, import.meta.url).href;
};

const categoryList = ref([]);

const productList = ref([]);

const getAllProductRequest = () => {
  getHomeAllProduct().then((data) => {
    data.forEach((item) => {
      item.proPartVoList = item.proPartVoList.slice(0, 3);
      item.proPartVoList.forEach((c) => {
        c.image = c.image ? JSON.parse(c.image) : "";
      });
    });

    productList.value = data;
  });
};

onMounted(() => {
  getProductCategory().then((data) => {
    categoryList.value = data;
  });
  getAllProductRequest();
});

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
@import "../../assets/css/variable.scss";

.shop-head {
  width: 100%;
  height: 400px;
  background-image: url("../../assets/img/home_bg.png");
  background-size: 100% 100%;

  &-inner {
    display: flex;
    align-items: center;
    width: $min-width;
    height: 100%;
    margin: 0 auto;
  }

  .type-container {
    flex-shrink: 0;
    width: 290px;
    height: 100%;
    background-color: #fff;
  }

  .type-head {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 14px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: #316eff;
    color: #fff;

    &-icon {
      width: 18px;
      height: 18px;
      background-size: 100% 100%;
      background-image: url("../../assets/img/menu_icon.png");
      margin-right: 16px;
    }
  }

  .type-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 345px;
    margin-top: 15px;

    &-item {
      flex-shrink: 0;
      height: 69px;
      width: 100%;
      padding: 0px 14px 0px 14px;
      box-sizing: border-box;
      overflow: hidden;

      &-name {
        line-height: 24px;
        font-size: 16px;
        color: #1a1a1a;
        font-weight: 700;
        margin-bottom: 8px;
      }

      &-sub {
        // display: flex;
        // flex-wrap: wrap;
        overflow: hidden;
        font-size: 14px;
        color: #666666;
        white-space: nowrap;
        line-height: 20px;
        margin-bottom: 16px;

        &-item {
          margin-right: 8px;
          cursor: pointer;

          &:hover {
            color: #316eff;
          }
        }
      }
    }
  }

  .banner-container {
    flex: 1;
    height: 100%;
    padding: 12px 12px;
    box-sizing: border-box;
  }

  .banner-main,
  .user-main {
    width: 100%;
    height: 100%;
  }

  .user-container {
    flex-shrink: 0;
    width: 290px;
    height: 100%;
    padding: 12px 12px;
    box-sizing: border-box;
  }

  .user-main {
    background-color: #fff;
  }

  .user-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 26px;

    &-avatar {
      width: 68px;
      height: 68px;
      margin-top: 16px;
    }

    &-name {
      margin-top: 8px;
      font-size: 16px;
      line-height: 24px;
      color: #1a1a1a;
      font-weight: 700;

      &.tourist {
        font-size: 14px;
        color: #666666;
      }
    }
  }

  .user-menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 48px;
    &-login {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 48px;

      &-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 36px;
        background-color: #316eff;
        color: #fff;
        border-radius: 2px;
        box-sizing: border-box;
        cursor: pointer;
      }
    }

    &-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      &-name {
        font-size: 14px;
        line-height: 20px;
        color: #666666;
      }

      &-icon {
        width: 24px;
        height: 24px;
        margin-bottom: 4px;
        background-size: 100% 100%;

        &.icon1 {
          background-image: url("../../assets/img/user_collect.png");
        }
        &.icon2 {
          background-image: url("../../assets/img/user_record.png");
        }
        &.icon3 {
          background-image: url("../../assets/img/user_record_shop.png");
        }
      }
    }
  }

  .notice-container {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    margin-top: 24px;
  }

  .notice-title {
    font-size: 14px;
    color: #1a1a1a;
    font-weight: 700;
    line-height: 20px;
    margin-bottom: 12px;
  }

  .notice-list {
    width: 100%;
  }

  .notice-list-item {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    margin-bottom: 12px;

    &-label {
      flex-shrink: 0;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      background-color: #fff7f9;
      padding: 0 4px;
      box-sizing: border-box;
      color: #e33c64;
      margin-right: 12px;
    }

    &-detail {
      font-size: 14px;
      line-height: 20px;
      color: #666666;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
    }
  }
}

.material-container {
  width: $min-width;
  margin: 0 auto;
}

.material-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 24px;
  color: #1a1a1a;
  line-height: 36px;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 20px;
}

.material-list {
  width: calc(100% + 12px);
  margin-left: -6px;
  margin-right: -6px;
  margin-bottom: 24px;
}
.material-item {
  display: inline-flex;
  flex-direction: column;
  margin-left: 6px;
  margin-right: 6px;
  width: 594px;
  // height: 430px;
  background-color: #f6f8fe;
  margin-bottom: 12px;

  &-head {
    width: 100%;
    height: 140px;
    padding-right: 240px;
    box-sizing: border-box;
    background-size: 100% 100%;

    &.type1 {
      background-image: url("../../assets/img/material_1.png");
    }
    &.type2 {
      background-image: url("../../assets/img/material_2.png");
    }
    &.type3 {
      background-image: url("../../assets/img/material_3.png");
    }
    &.type4 {
      background-image: url("../../assets/img/material_4.png");
    }
    &.type5 {
      background-image: url("../../assets/img/material_5.png");
    }
  }

  &-type {
    display: flex;
    align-items: center;
    width: 100%;

    margin-top: 20px;
    padding: 0 14px;
    box-sizing: border-box;

    &-name {
      font-size: 18px;
      line-height: 28px;
      color: #1a1a1a;
      font-weight: 700;
      margin-right: 50px;
    }

    &-more {
      display: inline-flex;
      align-items: center;
      font-size: 12px;
      color: #999999;
      cursor: pointer;
    }
  }

  &-enum {
    display: flex;
    flex-wrap: wrap;
    padding: 0 14px;
    margin-top: 20px;
    height: 64px;
    overflow: hidden;

    &-item {
      height: 22px;
      line-height: 22px;
      padding: 0 14px;
      font-size: 12px;
      color: #ffffff;
      border-radius: 22px;
      margin-right: 8px;
      margin-bottom: 10px;
      cursor: pointer;

      &.type1 {
        background-color: #4b9dfa;
      }
      &.type2 {
        background-color: #798df2;
      }
      &.type3 {
        background-color: #68c2f2;
      }
      &.type4 {
        background-color: #5ec6db;
      }
      &.type5 {
        background-color: #46c7be;
      }
    }
  }

  &-list {
    width: 100%;
    padding: 14px 14px;
    box-sizing: border-box;

    &-empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 264px;
      background-color: #fff;

      &-img {
        width: 180px;
        height: 180px;
      }

      &-text {
        font-size: 12px;
        line-height: 18px;
        margin-top: 12px;
        color: #000000;
      }
    }

    &-margin {
      width: calc(100% + 12px);
      margin-left: -6px;
      margin-right: -6px;
    }

    &-item {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      width: 180px;
      height: 264px;
      margin-left: 6px;
      margin-right: 6px;
      background-color: #ffffff;
      border: 1px solid #e8e8e8;
      box-sizing: border-box;
      cursor: pointer;

      &-label {
        position: absolute;
        top: 0;
        right: 0;
        height: 24px;
        line-height: 24px;
        padding: 0 6px;
        color: #00b42a;
        background-color: #e8ffea;
        font-size: 12px;
        z-index: 10;
      }

      &-img {
        position: relative;
        width: 100%;
        height: 180px;
        padding: 12px 12px;
        box-sizing: border-box;

        &-detail {
          // display: none;
          opacity: 0;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          font-size: 12px;
          height: 32px;
          line-height: 32px;
          background-color: #316eff;
          text-align: center;
          color: #fff;
        }
      }

      &-name {
        width: 100%;
        height: 40px;
        line-height: 20px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 14px;
        color: #1a1a1a;
        font-weight: 700;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        // margin-bottom: 12px;
        margin: 6px 0;
      }

      &-footer {
        display: flex;
        align-items: center;
        width: calc(100% - 24px);
        height: 30px;
        margin: 0 auto;
        border-top: 1px solid #e8e8e8;
        box-sizing: border-box;
        color: #666666;
        overflow: hidden;

        &-icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          margin-right: 3px;
          background-size: 100% 100%;
          background-image: url("../../assets/img/company_icon.png");
        }

        &-merchant {
          flex: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 12px;
        }
      }
    }
  }
}

.material-item-list-item:hover {
  border-color: #316eff;
  transition: all 0.3s ease;

  .material-item-list-item-img-detail {
    // display: block;
    opacity: 1;
  }
}
</style>
