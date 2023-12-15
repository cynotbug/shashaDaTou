<template>
  <Search :initValue="searchValue" @search="handleSearch">
    <div class="page-title">
      <span>{{ pageTitle }}</span>
    </div>
  </Search>
  <div class="product-list">
    <div class="product-tab">
      <div class="product-tab-inner">
        <div
          class="product-tab-menu"
          @mouseenter="showTypeMenu"
          @mouseleave="hideTypeMenu"
        >
          <div class="product-tab-menu-icon"></div>
          <div class="product-tab-menu-title">全部商品分类</div>

          <div class="menu-type-list" v-if="isMenuShow">
            <div
              class="menu-type-list-item"
              v-for="categoryItem in categoryList"
              :key="categoryItem.producePropertyId"
            >
              <div class="menu-type-list-item-name">
                {{ categoryItem.name }}
              </div>
              <div class="menu-type-list-item-sub">
                <span
                  class="menu-type-list-item-sub-item"
                  @click.stop="changeFirstCategory(secondCategory)"
                  :key="secondCategory.producePropertyId"
                  v-for="secondCategory in categoryItem.secondInfo"
                  >{{ secondCategory.name }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-list-inner">
      <Product
        :firstCategory="firstCategory"
        :secondCategory="secondCategory"
        :searchValue="searchValue"
        ref="productRef"
      ></Product>
    </div>
  </div>
</template>

<script setup>
import Search from "@/components/layout/search.vue";
import Product from "@/components/product/index.vue";
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProductCategory } from "@/api/product";

const route = useRoute();
const router = useRouter();
let { title = "" } = route.meta;
const pageTitle = title;

let firstCategory = ref("");
let secondCategory = ref("");

let searchValue = ref("");

let {
  firstCategory: first,
  secondCategory: second,
  searchValue: text
} = route.query;
firstCategory.value = first || "";
secondCategory.value = second || "";
searchValue.value = text ? decodeURIComponent(text) : "";

const productRef = ref(null);

const handleSearch = async (data) => {
  const { value, type } = data;
  // 1供应商2商品
  if (type == 1) {
    if (value.length == 0) {
      return;
    }
    let path = `/supplier`;
    router.push({
      path,
      query: {
        searchValue: encodeURIComponent(value)
      }
    });
  } else {
    searchValue.value = value;
    await nextTick();
    productRef.value && productRef.value.resetAndGetData();
  }
};

const categoryList = ref([]);

onMounted(() => {
  getProductCategory().then((data) => {
    categoryList.value = data;
  });
});

const isMenuShow = ref(false);
const showTypeMenu = () => {
  isMenuShow.value = true;
};

const hideTypeMenu = () => {
  isMenuShow.value = false;
};

const changeFirstCategory = (categoryItem) => {
  isMenuShow.value = false;
  let { producePropertyId, pid } = categoryItem;
  firstCategory.value = pid;
  secondCategory.value = producePropertyId;
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";

.page-title {
  display: inline-flex;
  align-items: center;
  height: 100%;
  font-size: 20px;
  color: #666666;
}

.product-list {
  width: 100%;

  &-inner {
    padding-top: 12px;
    width: $min-width;
    margin: 0 auto;
  }
}

.product-tab {
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #316eff;
  box-sizing: border-box;

  &-inner {
    width: $min-width;
    height: 100%;
    margin: 0 auto;
  }

  &-menu {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 294px;
    height: 100%;
    background-color: #316eff;
    padding: 0 16px;
    box-sizing: border-box;

    &-icon {
      width: 16px;
      height: 16px;
      margin-right: 16px;
      background-size: 100% 100%;
      background-image: url("../../assets/img/menu_icon.png");
    }
    &-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
  }
}

.menu-type-list {
  position: absolute;
  left: 0;
  bottom: -345px;
  // display: flex;
  // flex-direction: column;
  width: 294px;
  height: 345px;
  background-color: #fff;
  z-index: 200;
  box-shadow: 0px 0px 2px 2px rgba(232, 232, 232, 1);

  &-item {
    flex-shrink: 0;
    height: 69px;
    width: 100%;
    padding: 0px 14px 0px 14px;
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    cursor: pointer;

    &:hover {
      background: linear-gradient(90deg, #f5faff 0%, #e8f3ff 100%);
    }

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
        margin-right: 12px;
        cursor: pointer;

        &:hover {
          color: #316eff;
        }
      }
    }
  }
}
</style>
