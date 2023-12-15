<template>
  <div class="product">
    <div class="condition-result">
      <div class="condition-result-key">已选条件</div>

      <div class="condition-result-value">
        <div class="condition-result-item">
          <div class="condition-result-item-type">产品大类：</div>
          <div class="condition-result-item-name">
            {{ curFirst.name }}
          </div>
          <el-icon
            :size="12"
            style="color: #999999"
            @click="cancelFirstSelected"
            v-if="curFirst.producePropertyId !== ''"
            ><CloseBold
          /></el-icon>
        </div>

        <template
          v-for="(selectSecond, selectIdx) in curSecond"
          :key="selectSecond.producePropertyId"
        >
          <div
            class="condition-result-item"
            v-if="selectSecond.producePropertyId !== ''"
          >
            <div class="condition-result-item-type">二级分类：</div>
            <div class="condition-result-item-name">
              {{ selectSecond.name }}
            </div>
            <el-icon
              :size="12"
              style="color: #999999"
              @click="cancelSecondSelected(selectIdx)"
              ><CloseBold
            /></el-icon>
          </div>
        </template>

        <div class="condition-result-total">
          <span>共找到</span>
          <span class="condition-result-total-num">{{ productTotal }}</span>
          <span>条</span>
        </div>
      </div>
    </div>

    <div class="search-condition">
      <div class="search-condition-item">
        <div class="search-condition-item-key">产品大类</div>
        <div class="search-condition-item-value">
          <div
            class="search-condition-item-children"
            ref="firstRef"
            :class="[isFirstExpand ? 'expand' : 'unexpand']"
          >
            <div class="search-condition-item-children-inner">
              <div
                class="search-condition-item-child"
                :class="{ active: isFirstActive(firstItem) }"
                v-for="firstItem in categoryList"
                :key="firstItem.producePropertyId"
                @click="changeFirstSelected(firstItem)"
              >
                {{ firstItem.name }}
              </div>
            </div>
          </div>
          <div
            class="search-condition-item-more"
            @click="changeFirstExpand"
            v-if="isFirstMore"
          >
            <span>更多</span>
            <el-icon
              :size="12"
              style="color: #666666"
              class="search-condition-item-more-icon"
              :class="[isFirstExpand ? 'expand' : 'unexpand']"
              ><ArrowDown
            /></el-icon>
            <!-- <el-icon :size="12"><ArrowUp /></el-icon> -->
          </div>
        </div>
      </div>

      <div class="search-condition-item">
        <div class="search-condition-item-key">二级分类</div>
        <div class="search-condition-item-value">
          <div
            class="search-condition-item-children"
            ref="secondRef"
            :class="[isSecondExpand ? 'expand' : 'unexpand']"
          >
            <div class="search-condition-item-children-inner">
              <div
                class="search-condition-item-child"
                :class="{ active: isSecondActive(secondItem) }"
                v-for="secondItem in secondCategoryList"
                :key="secondItem.producePropertyId"
                @click="changeSecondSelected(secondItem)"
              >
                {{ secondItem.name }}
              </div>
            </div>
          </div>
          <div
            class="search-condition-item-more"
            @click="changeSecondExpand"
            v-if="isSecondMore"
          >
            <span>更多</span>
            <el-icon
              :size="12"
              style="color: #666666"
              class="search-condition-item-more-icon"
              :class="[isSecondExpand ? 'expand' : 'unexpand']"
              ><ArrowDown
            /></el-icon>
            <!-- <el-icon :size="12"><ArrowUp /></el-icon> -->
          </div>
        </div>
      </div>

      <div class="search-condition-item">
        <div class="search-condition-item-key">绿色建材</div>
        <div class="search-condition-item-value">
          <div class="search-condition-item-children">
            <div
              class="search-condition-item-child"
              :class="{ active: isStarActive(starItem) }"
              v-for="starItem in starRatesList"
              :key="starItem.value"
              @click="changeStarSelected(starItem)"
            >
              {{ starItem.label }}
            </div>
          </div>
          <div class="search-condition-item-more">
            <span>多选</span>
            <!-- <span>更多</span>
            <el-icon :size="12" style="color: #666666"><ArrowDown /></el-icon> -->
            <!-- <el-icon :size="12"><ArrowUp /></el-icon> -->
          </div>
        </div>
      </div>
    </div>

    <div class="material-item-list" ref="listRef">
      <div class="material-item-empty" v-if="productList.length == 0">
        <div class="material-item-empty-img">
          <img
            :src="getNoDataImageUrl()"
            alt=""
            style="width: 100%; height: 100%"
          />
        </div>

        <div class="material-item-empty-text">暂无商品</div>
      </div>
      <div class="material-item-list-margin" v-else>
        <div
          class="material-item-list-item"
          v-for="productItem in productList"
          :key="productItem.id"
          @click="toProductDetail(productItem)"
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

    <div class="result-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="productTotal"
        :page-size="productPageSize"
        @current-change="productPageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch, nextTick } from "vue";
import { getProductCategory, getProductList } from "@/api/product";
import { useRouter } from "vue-router";

const props = defineProps({
  count: {
    type: Number,
    default: 5
  },
  firstCategory: {
    type: [String, Number],
    default: ""
  },
  secondCategory: {
    type: [String, Number],
    default: ""
  },
  searchValue: {
    type: String,
    default: ""
  },
  enterpriseId: {
    type: [String, Number],
    default: ""
  },
  scopeType: {
    type: [String, Number],
    default: 1
  }
});

// 当前的一级  当前的二级
let curFirst = ref({
  producePropertyId: ""
});
let curSecond = ref([
  {
    producePropertyId: ""
  }
]);

watch(
  () => props.secondCategory,
  () => {
    console.log(props.firstCategory, props.secondCategory);
    let firstIdx = categoryList.value.findIndex(
      (item) => item.producePropertyId == props.firstCategory
    );

    curFirst.value = categoryList.value[firstIdx];
    updateSecondCategoryList();
    let secondIdx = secondCategoryList.value.findIndex((item) => {
      return item.producePropertyId == props.secondCategory;
    });

    if (secondIdx !== -1) {
      curSecond.value = [secondCategoryList.value[secondIdx]];
    }
    resetAndGetData();
  }
);

// 全部类别表
const categoryList = ref([]);
// 当前展示的二级菜单
const secondCategoryList = ref([]);

// 星级
const starRatesList = ref([
  {
    value: "",
    label: "全部"
  },
  {
    value: "1",
    label: "一星"
  },
  {
    value: "2",
    label: "二星"
  },
  {
    value: "3",
    label: "三星"
  }
]);

const curStar = ref([""]);

const changeStarSelected = (item) => {
  let { value } = item;
  let idx = curStar.value.findIndex((star) => star == value);
  if (idx !== -1) {
    // 之前存在
    curStar.value.splice(idx, 1);
  } else {
    if (value == "") {
      curStar.value = [""];
    } else {
      // 如果存在全部 要把全部的选项也删掉
      let allIdx = curStar.value.findIndex((a) => a == "");
      allIdx !== -1 && curStar.value.splice(allIdx, 1);
      curStar.value.push(value);
    }
  }
  if (curStar.value.length == 0) {
    curStar.value = [""];
  }
  // 请求数据
  resetAndGetData();
};

const changeFirstSelected = (item) => {
  // 单选
  const { producePropertyId } = item;
  if (producePropertyId == curFirst.value.producePropertyId) {
    return;
  }
  curFirst.value = { ...item };
  updateSecondCategoryList();
  // 请求数据
  resetAndGetData();
};

const changeSecondSelected = (item) => {
  // 多选
  const { producePropertyId } = item;
  let idx = curSecond.value.findIndex((secItem) => {
    return secItem.producePropertyId == producePropertyId;
  });
  if (idx !== -1) {
    // 取消当前选择
    curSecond.value.splice(idx, 1);
  } else {
    // 处理全部 跟其他种类的关系
    // producePropertyId
    //   ? curSecond.value.push(producePropertyId)
    //   : (curSecond.value = [""]);
    if (producePropertyId == "") {
      curSecond.value = [
        {
          name: "全部",
          secondInfo: null,
          producePropertyId: ""
        }
      ];
    } else {
      let allIdx = curSecond.value.findIndex((a) => a.producePropertyId == "");
      allIdx !== -1 && curSecond.value.splice(allIdx, 1);
      curSecond.value.push({ ...item });
    }
  }

  if (curSecond.value.length == 0) {
    curSecond.value = [
      {
        name: "全部",
        secondInfo: null,
        producePropertyId: ""
      }
    ];
  }

  resetAndGetData();
};

const cancelFirstSelected = () => {
  // 大类选择清空
  curFirst.value = { name: "全部", secondInfo: null, producePropertyId: "" };
  updateSecondCategoryList();
  resetAndGetData();
};

const cancelSecondSelected = (idx) => {
  curSecond.value.splice(idx, 1);
  // 如果当前选择的列表为空了 需要手动加上一个全部的
  if (curSecond.value.length == 0) {
    curSecond.value = [
      {
        name: "全部",
        secondInfo: null,
        producePropertyId: ""
      }
    ];
  }
  resetAndGetData();
};

const isStarActive = (item) => {
  let idx = curStar.value.findIndex((star) => star == item.value);

  return idx !== -1;
};

const isFirstActive = (item) => {
  return item.producePropertyId == curFirst.value.producePropertyId;
};

const isSecondActive = (item) => {
  let idx = curSecond.value.findIndex((secItem) => {
    return secItem.producePropertyId == item.producePropertyId;
  });

  return idx !== -1;
};

// 更新二级类别列表
const updateSecondCategoryList = () => {
  // secondCategoryList
  let catrgoryArr = JSON.parse(JSON.stringify(categoryList.value));
  catrgoryArr = catrgoryArr.filter((item) => item.producePropertyId);

  if (!curFirst.value.producePropertyId) {
    // 一级是全部 二级也显示全部
    let allSecond = catrgoryArr.reduce((prev, cur) => {
      let { secondInfo } = cur;
      secondInfo = secondInfo || [];
      return [...prev, ...secondInfo];
    }, []);
    allSecond.unshift({
      name: "全部",
      secondInfo: null,
      producePropertyId: ""
    });
    secondCategoryList.value = allSecond;
  } else {
    let singleSecond = catrgoryArr.filter((item) => {
      return item.producePropertyId == curFirst.value.producePropertyId;
    });
    if (singleSecond.length > 0) {
      let arr = singleSecond[0].secondInfo || [];
      arr.unshift({
        name: "全部",
        secondInfo: null,
        producePropertyId: ""
      });
      secondCategoryList.value = arr;
    }
  }
  // 更新之后 二级默认为全部
  curSecond.value = [
    {
      name: "全部",
      secondInfo: null,
      producePropertyId: ""
    }
  ];
};

const productTotal = ref(100);
const productPage = ref(1);
const productPageSize = ref(20);

const productPageChange = (value) => {
  productPage.value = value;
};

// 当前展示商品列表
const productList = ref([]);

const resetAndGetData = () => {
  productPage.value = 1;
  getProductListRequest();
};

// 获取产品列表请求
const getProductListRequest = () => {
  let firstType = { ...curFirst.value };
  firstType = firstType.producePropertyId;

  let secondType = [...curSecond.value];
  secondType = secondType.filter((item) => !!item);
  secondType = secondType.map((item) => item.producePropertyId);
  secondType =
    secondType.findIndex((item) => item == "") !== -1 ? [] : secondType;

  let star = [...curStar.value];
  star = star.filter((item) => !!item);
  star = star.length > 0 ? star : [];

  const params = {
    content: props.searchValue, // 搜索内容
    contentType: 2, // 1供应商2商品
    enterpriseId: props.enterpriseId, // 供应商id 商品时必传
    firstProId: firstType, // 一级类别
    scopeType: props.scopeType, // 1搜全站 2搜本店
    secondProIds: secondType, // 二级分类 数组
    starRates: star, // 星级 数组
    page: productPage.value,
    size: productPageSize.value
  };

  getProductList(params).then((data) => {
    const { total, records } = data;
    productTotal.value = total;

    records.forEach((item) => {
      item.image = item.image ? JSON.parse(item.image) : "";
    });
    productList.value = records;
  });
};

onMounted(async () => {
  try {
    let typeList = await getProductCategory();
    typeList.unshift({
      name: "全部",
      secondInfo: [],
      producePropertyId: ""
    });
    categoryList.value = typeList;

    let firstIdx = typeList.findIndex(
      (item) => item.producePropertyId == props.firstCategory
    );

    curFirst.value = categoryList.value[firstIdx];
    updateSecondCategoryList();
    let secondIdx = secondCategoryList.value.findIndex((item) => {
      return item.producePropertyId == props.secondCategory;
    });

    if (secondIdx !== -1) {
      curSecond.value = [secondCategoryList.value[secondIdx]];
    }
    getProductListRequest();
  } catch (error) {
    // console.log(error)
  }
});

// 根据一级获取显示二级菜单

const listRef = ref(null);

let itemWidth = computed(() => {
  let width = 1200;
  if (listRef.value) {
    width = listRef.value.getBoundingClientRect().width;
  }

  return `${parseFloat((width - 12 * (props.count - 1)) / props.count)}px`;
});

const secondRef = ref(null);
const firstRef = ref(null);

watch(
  () => secondCategoryList.value,
  async () => {
    isSecondExpand.value = true;
    await nextTick();
    if (secondRef.value) {
      if (secondRef.value.getBoundingClientRect().height > 42) {
        isSecondMore.value = true;
      } else {
        isSecondMore.value = false;
      }
    }
  },
  {
    // deep: true,
    // immediate: true
  }
);
watch(
  () => categoryList.value,
  async () => {
    isFirstExpand.value = true;
    await nextTick();
    if (firstRef.value) {
      if (firstRef.value.getBoundingClientRect().height > 42) {
        isFirstMore.value = true;
      } else {
        isFirstMore.value = false;
      }
    }
  },
  {
    // deep: true,
    // immediate: true
  }
);

const isSecondMore = ref(false);
const isFirstMore = ref(false);
const isSecondExpand = ref(false);
const isFirstExpand = ref(false);

const changeSecondExpand = () => {
  isSecondExpand.value = !isSecondExpand.value;
};
const changeFirstExpand = () => {
  isFirstExpand.value = !isFirstExpand.value;
};

const getImageUrl = () => {
  return new URL(`@/assets/img/product_default.png`, import.meta.url).href;
};

const getNoDataImageUrl = () => {
  return new URL(`@/assets/img/no_data_product.png`, import.meta.url).href;
};

const router = useRouter();

const toProductDetail = (productItem) => {
  const { enterpriseId, id } = productItem;
  router.push({
    path: `/shop/merchant/${enterpriseId}/product/detail/${id}`
  });
};

// defineExpose
defineExpose({
  resetAndGetData
});
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
}

.condition-result {
  display: flex;
  align-items: flex-start;
  width: 100%;
  // margin-top: 24px;
  margin-bottom: 12px;

  &-key {
    flex-shrink: 0;
    font-size: 14px;
    line-height: 26px;
    margin-right: 20px;
    color: #666666;
  }

  &-value {
    flex: 1;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  &-item {
    display: inline-flex;
    align-items: center;
    height: 26px;
    padding: 0 8px;
    border: 1px solid #e8e8e8;
    cursor: pointer;
    margin-right: 8px;
    margin-bottom: 6px;

    &:last-child {
      margin-right: 0;
    }

    &-type {
      font-size: 14px;
      color: #666666;
    }

    &-name {
      margin-right: 8px;
      font-size: 14px;
      color: #1a1a1a;
    }
  }

  &-total {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    line-height: 26px;
    margin-left: 20px;

    &-num {
      color: #316eff;
    }
  }
}

.search-condition {
  width: 100%;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  margin-bottom: 16px;

  &-item {
    display: flex;
    border-bottom: 1px solid #e8e8e8;

    &:last-child {
      border-bottom: none;
    }

    &-key {
      flex-shrink: 0;
      width: 120px;
      padding: 12px 20px;
      box-sizing: border-box;
      // text-align: center;
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      background-color: #f5f7fa;
    }

    &-value {
      flex: 1;
      display: flex;
      align-items: flex-start;
      padding: 0 12px;
      padding-top: 12px;
    }

    &-children {
      flex: 1;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      // height: 42px;
      overflow: hidden;
      // min-height: 42px;
      transition: height 0.3s ease;

      &.expand {
        min-height: 42px;
      }

      &.unexpand {
        height: 42px;
      }

      &-inner {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
      }
    }

    &-child {
      height: 30px;
      line-height: 30px;
      padding: 0 8px;
      font-size: 14px;
      color: #1a1a1a;
      margin-right: 30px;
      margin-bottom: 12px;
      cursor: pointer;

      &:hover {
        color: #316eff;
      }

      &.active {
        background-color: #316eff;
        color: #ffffff;
      }
    }

    &-more {
      padding: 0 8px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      color: #666666;
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #e8e8e8;
      box-sizing: border-box;
      margin-bottom: 12px;

      &-icon {
        transition: all 0.3s ease;

        &.expand {
          transform: rotate(0);
        }

        &.unexpand {
          transform: rotate(180deg);
        }
      }

      span {
        margin-right: 6px;
      }
    }
  }
}

.material-item {
  &-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 580px;

    &-img {
      width: 320px;
      height: 320px;
    }
    &-text {
      margin-top: 12px;
      line-height: 18px;
      font-size: 12px;
      color: #000000;
    }
  }

  &-list {
    width: 100%;
    box-sizing: border-box;

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
      // width: 180px;
      width: v-bind(itemWidth);
      // height: 264px;
      // height: 316px;
      margin-left: 6px;
      margin-right: 6px;
      background-color: #ffffff;
      border: 1px solid #e8e8e8;
      box-sizing: border-box;
      cursor: pointer;
      margin-bottom: 10px;

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
        // height: 180px;
        // height: 232px;
        width: v-bind(itemWidth);
        height: v-bind(itemWidth);
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
        height: 40px;
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

.result-pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 30px;
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
