<template>
  <div class="highQualitySupplier">
    <div class="supplierBg">
      <div>
        <div class="title_one">覆盖5大集采品类的精选优质供应商</div>
        <div class="title_Two">提供供需直连的高效服务</div>
        <div class="input-btn-compact">
          <el-input
            v-model="searchInput"
            placeholder="请输入企业名称"
            class="searchInput"
            @keyup.enter="onSearch"
          >
          </el-input>
          <div @click="onSearch" class="btn">搜索</div>
        </div>
      </div>
    </div>
    <div class="tabs-content">
      <div class="intro">经营分类</div>
      <div class="tabs">
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="全部" name=""></el-tab-pane>
          <template v-for="(item, index) in activeList" :key="index">
            <el-tab-pane :label="item.label" :name="item.value"></el-tab-pane>
          </template>
        </el-tabs>
      </div>
    </div>
    <div class="supplier-content">
      <div style="display: flex; align-items: center">
        <div class="supplier-header">
          <div class="icon_box">
            <div class="value">入驻时长</div>
            <div>
              <!-- 1是上升，0是下降 -->
              <img
                :src="jaintoutopUrl()"
                style="display: block; margin-bottom: 4px"
                :style="timeSort === 1 ? pageDisStyle : pageCliStyle"
                @click="getUpChange"
              />
              <img
                :src="jaintoubottomUrl()"
                style="display: block"
                :style="timeSort === 0 ? pageDisStyle : pageCliStyle"
                @click="getDownChange"
              />
            </div>
          </div>
          <el-divider direction="vertical" style="margin: 0 24px" />
          <div class="icon_box">
            <div class="value">评分排序</div>
            <div>
              <img
                :src="jaintoutopUrl()"
                style="display: block; margin-bottom: 4px"
                :style="scoreSort === 1 ? pageDisStyle : pageCliStyle"
                @click="getUpScore"
              />
              <img
                :src="jaintoubottomUrl()"
                style="display: block"
                :style="scoreSort === 0 ? pageDisStyle : pageCliStyle"
                @click="getDownScore"
              />
            </div>
          </div>
        </div>
        <div class="compact">
          <div class="label">所在地</div>
          <el-cascader
            clearable
            style="width: 400px"
            v-model="areavalue"
            :options="options"
            :props="addressProps"
            @change="handleChange"
          />
          <!-- <el-select v-model="areavalue" class="m-2" placeholder="Select">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="obj in options"
              :key="obj.value"
              :label="obj.label"
              :value="obj.value"
            ></el-option>
          </el-select> -->
        </div>
      </div>
      <div>
        <span
          :style="pagination.page === 1 ? pageDisStyle : pageCliStyle"
          @click="reducePage"
        >
          <img :src="sanjiaoleftUrl()" />
        </span>

        <span
          style="
            color: rgba(49, 110, 255, 1);
            font-size: 14px;
            margin-left: 4px;
            vertical-align: 3px;
            cursor: pointer;
          "
        >
          {{ pagination.page }}
        </span>
        <span
          style="
            color: rgba(26, 26, 26, 1);
            font-size: 14px;
            margin-right: 4px;
            vertical-align: 3px;
          "
          >/{{ pages }}</span
        >

        <span
          :style="pagination.page >= pages ? pageDisStyle : pageCliStyle"
          @click="increasePage"
        >
          <img :src="sanjiaorightUrl()" />
        </span>
      </div>
    </div>
    <div class="supply-main">
      <template v-for="(item, index) in supplierData" :key="index">
        <div class="item">
          <div class="main-left">
            <div style="display: flex">
              <img :src="getMerchantImageUrl()" class="picture" />
              <div>
                <div class="companyName">
                  {{ item.name }}
                  <span class="grade">{{ item.score }}</span>
                </div>
                <div class="livetime">入驻时长：{{ item.createDate }}</div>
                <div class="fontValue">
                  所在地区：{{ item.province }} {{ item.city }}
                </div>
                <div class="fontValue_one" @click="onJumpMerchant(item)">
                  进入店铺
                  <img
                    :src="rightArrUrl()"
                    style="width: 16px; height: 16px; vertical-align: -4px"
                  />
                </div>
              </div>
            </div>
            <!-- <div class="fontValue" style="margin-top: 17px">
              企业介绍：{{ item.intro }}mainProduce
            </div> -->
            <div class="fontValue" style="margin-top: 17px">
              经营范围：{{ item.mainProduce }}
            </div>
          </div>
          <div class="main-right">
            <div v-if="item.proPartVoList.length > 0" style="display: flex">
              <div v-for="(img, i) in item.proPartVoList || []" :key="i">
                <div class="img" @click.stop="toProductDetail(img)">
                  <!--  -->
                  <!-- {{ img.image && JSON.parse(img.image).url }} -->
                  <img
                    :src="
                      !img.image
                        ? getImageUrl()
                        : img.image && JSON.parse(img.image).url
                    "
                    style="width: 160px; height: 160px; margin-bottom: 8px"
                  />
                  <div class="fontStyle_third" v-if="img.name.length < 8">
                    {{ img.name }}
                  </div>
                  <el-tooltip
                    :content="img.name"
                    placement="top"
                    effect="light"
                    v-else
                  >
                    <div class="fontStyle_third">
                      {{ img.name.slice(0, 8) }}...
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div v-else class="nodata">
              <img :src="noproDataUrl()" />
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="pagination" v-if="pagination.total > 0">
      <el-pagination
        v-model:current-page="pagination.page"
        :page-size="pagination.size"
        background
        layout="prev, pager, next"
        :total="pagination.total"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-else class="noAlldata">
      <div>
        <img :src="noDataUrl()" />
        <div class="nodataStyle">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getpropertyFirst, superiorEnterprise } from "@/api/bestSupplier";

import regions from "../../utils/region";
import {
  sanjiaoleftUrl,
  sanjiaorightUrl,
  rightArrUrl
  // companyimgurl
} from "@/utils/imageCommon";
// url带过来的搜索词
const route = useRoute();
const router = useRouter();
let { searchValue } = route.query;
searchValue = searchValue ? decodeURIComponent(searchValue) : "";

const searchInput = ref(searchValue);
const addressProps = ref({ children: "dtoList", label: "name", value: "name" });
const activeName = ref("");
const areavalue = ref("");
const pages = ref(1);
const pagination = reactive({
  total: 0,
  page: 1,
  size: 5
});
const options = ref(regions);
const timeSort = ref("");
const scoreSort = ref("");
const activeList = ref([]);
const supplierData = ref([]);
const pageDisStyle = { "pointer-events": "none", cursor: "not-allowed" };
const pageCliStyle = { cursor: "pointer" };
onMounted(() => {
  getDemand();
  getTabsName();
});
const toProductDetail = (productItem) => {
  const { enterpriseId, id } = productItem;
  router.push({
    path: `/shop/merchant/${enterpriseId}/product/detail/${id}`
  });
};
const getImageUrl = () => {
  return new URL(`@/assets/img/product_default.png`, import.meta.url).href;
};
const noDataUrl = () => {
  return new URL(`@/assets/img/nodata.png`, import.meta.url).href;
};
const noproDataUrl = () => {
  return new URL(`@/assets/img/noproData.png`, import.meta.url).href;
};

const jaintoutopUrl = () => {
  return new URL(`@/assets/img/jaintoutop.png`, import.meta.url).href;
};
const jaintoubottomUrl = () => {
  return new URL(`@/assets/img/jiantoubottom.png`, import.meta.url).href;
};
const getMerchantImageUrl = () => {
  return new URL(`@/assets/img/merchant_default.png`, import.meta.url).href;
};
//进入店铺
const onJumpMerchant = (item) => {
  router.push({
    path: `/shop/merchant/${item.id}`
  });
};
const handleChange = (e) => {
  console.log(e, "e");
  pagination.page = 1;
  getDemand();
};
const onSearch = () => {
  pagination.page = 1;
  getDemand();
};
//tabs一级分类
const getTabsName = () => {
  getpropertyFirst().then((res) => {
    console.log(res, "res");
    activeList.value = res.map((v) => ({ label: v.name, value: v.pid }));
  });
};
//入驻时长升序
const getUpChange = () => {
  if (timeSort.value == "" || timeSort.value == "0") {
    timeSort.value = 1;
    pagination.page = 1;
    getDemand();
  }
};
//入驻时长降序
const getDownChange = () => {
  if (timeSort.value == "" || timeSort.value == "1") {
    timeSort.value = 0;
    pagination.page = 1;
    getDemand();
  }
};
//评分升序
const getUpScore = () => {
  if (scoreSort.value == "" || scoreSort.value == "0") {
    scoreSort.value = 1;
    pagination.page = 1;
    getDemand();
  }
};
//评分降序
const getDownScore = () => {
  if (scoreSort.value == "" || scoreSort.value == "1") {
    scoreSort.value = 0;
    pagination.page = 1;
    getDemand();
  }
};
const handleClick = (tab) => {
  console.log(tab.props.name, "tab");
  activeName.value = tab.props.name;
  pagination.page = 1;
  getDemand();
};
// 当前页减少
const reducePage = () => {
  pagination.page--;
  if (pagination.page === 0) {
    pagination.page = 1;
    return;
  }
  getDemand();
};
// 当前页增加
const increasePage = () => {
  pagination.page++;
  // 如果当前页大于总页数 设置为总页数
  if (pagination.page > pages.value) {
    pagination.page = pages.value || 1;
    return;
  }
  getDemand();
};

const getDemand = () => {
  let params = {
    createOrder: timeSort.value,
    score: scoreSort.value,
    enterpriseName: searchInput.value,
    page: pagination.page,
    propertyProduceId: activeName.value,
    size: pagination.size,
    // province: areavalue.value[0],
    // city: areavalue.value[1]
    province: !areavalue.value ? null : areavalue.value[0],
    city: !areavalue.value ? null : areavalue.value[1]
  };
  superiorEnterprise(params).then((res) => {
    console.log(res, "res11");
    supplierData.value = res.records;
    pagination.total = res.total;
    pages.value = 1;
    if (pagination.total) {
      pages.value = Math.ceil(pagination.total / pagination.size);
    }
  });
};

const handleCurrentChange = (val) => {
  console.log(val);
  pagination.page = val;
  getDemand();
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
.highQualitySupplier {
  width: 100vw;
  .supplierBg {
    width: 100vw;
    height: 262px;
    background-image: url("../../assets/img/supplier_bg.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;

    .title_one {
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 52.13px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 7px;
      margin-top: 29px;
    }
    .title_Two {
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 4px;
      line-height: 20.27px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 30px;
      text-align: center;
    }
    .input-btn-compact {
      width: 543px;
      height: 40px;
      box-sizing: border-box;
      display: flex;
      .btn {
        width: 88px;
        height: 40px;
        border-radius: 0px 2px 2px 0px;
        background: rgba(49, 110, 255, 1);
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 40px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
      }
    }
    :deep(.searchInput) {
      .el-input__wrapper {
        border-radius: 2px;
        border: 1px solid rgba(49, 110.00000000000003, 255, 1);
        box-shadow: none;
      }
      .el-input-group__append {
        width: 88px;
        height: 100%;
        font-size: 14px;
        background-color: #316eff;
        color: #ffffff;
        cursor: pointer;
        box-shadow: none;
      }
    }
  }
  .tabs-content {
    width: $min-width;
    margin: 0 auto;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(217, 217, 217, 1);
    padding: 32px 20px 16px 20px;
    margin-top: -52px;
    display: flex;
    align-content: center;
    box-sizing: border-box;
    .intro {
      margin-right: 82px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20.27px;
      color: rgba(102, 102, 102, 1);
      margin-top: 2px;
    }
    :deep(.el-tabs.el-tabs--top.demo-tabs) {
      --el-tabs-header-height: 22px !important;
      .el-tabs__nav.is-top {
        .el-tabs__item.is-top {
          margin-right: 32px !important;
          padding: 0px !important;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 20.27px;
          color: rgba(26, 26, 26, 1);
        }
        .el-tabs__item.is-top.is-active {
          padding: 12px 8px !important;
          border-radius: 2px;
          background: rgba(49, 110, 255, 1);
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 20.27px;
          color: rgba(255, 255, 255, 1);
          margin-right: 32px !important;
        }
      }
      .el-tabs__nav-wrap::after {
        background-color: transparent !important;
      }
      .el-tabs__active-bar {
        background-color: transparent !important;
      }
    }
  }
  .supplier-content {
    width: $min-width;
    margin: 0 auto;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(232, 232, 232, 1);
    padding: 16px 20px;
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .supplier-header {
      display: flex;
      .icon_box {
        display: flex;
        align-items: center;

        .value {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 20.27px;
          color: rgba(102, 102, 102, 1);
          margin-right: 5px;
        }
      }
    }
    :deep(.compact) {
      display: flex;
      align-items: center;
      border: 1px solid #dcdfe6;
      background-color: #fff;
      // border-radius: 5px;
      margin-left: 55px;
      height: 26px;
      .label {
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        white-space: nowrap;
        margin-right: 4px;
        padding: 0 2px 0 11px;
      }
      .el-cascader.el-cascader--small.el-tooltip__trigger.el-tooltip__trigger {
        width: 164px !important;
        border-left: 1px solid #dcdfe6;
        .el-input.el-input--small.el-input--suffix {
          .el-input__wrapper {
            box-shadow: none;
          }
        }
      }
      .el-select {
        width: 84px;
        border-left: 1px solid #dcdfe6;
        .el-input.el-input--suffix {
          .el-input__wrapper {
            box-shadow: none;
          }
          .el-input__inner {
            border: 1px solid transparent;
            border-top-left-radius: 0px !important;
            border-bottom-left-radius: 0px !important;
            color: rgba(102, 102, 102, 1) !important;
          }
        }
      }
      .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
        border: 1px solid transparent;
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
        color: rgba(26, 26, 26, 1) !important;
      }
    }
  }
  .supply-main {
    width: $min-width;
    margin: 0 auto;

    margin-top: 20px;
    box-sizing: border-box;
    .item {
      display: flex;
      border: 1px solid rgba(232, 232, 232, 1);
      width: 100%;
      padding: 16px 20px;
      box-sizing: border-box;
      margin-bottom: 16px;
      .main-left {
        width: 40%;
        .picture {
          width: 120px;
          height: 120px;
          margin-right: 16px;
        }
        .companyName {
          font-size: 14px;
          font-weight: 700;
          line-height: 20.27px;
          color: rgba(26, 26, 26, 1);
          margin-bottom: 6px;
          .grade {
            display: inline-block;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0px;
            line-height: 20.27px;
            color: rgba(0, 186, 173, 1);
            border-radius: 2px;
            background: rgba(235, 255, 254, 1);
            padding: 1px 5px 1px 5px;
          }
        }
        .livetime {
          border-radius: 2px;
          background: rgba(232, 243, 255, 1);
          padding: 2px 5px 2px 5px;
          font-size: 14px;
          font-weight: 400;
          line-height: 20.27px;
          color: rgba(49, 110, 255, 1);
          display: inline-block;
          margin-bottom: 8px;
        }
        .fontValue {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 20.27px;
          color: rgba(102, 102, 102, 1);
          margin-bottom: 13px;
        }
        .fontValue_one {
          display: inline-block;
          border-radius: 20px;
          background: rgba(255, 255, 255, 1);
          cursor: pointer;
          border: 1px solid rgba(49, 110.00000000000003, 255, 1);
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 17.38px;
          color: rgba(49, 110, 255, 1);
          padding: 3px 12px;
        }
      }
      .main-right {
        width: 60%;
        display: flex;
        margin-left: 27px;
        .img {
          margin-right: 18px;
          cursor: pointer;
          // &:last-child{
          //   margin-right: 0px!important;
          // }
          .fontStyle_third {
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0px;
            line-height: 20.27px;
            color: rgba(26, 26, 26, 1);
          }
        }
        .nodata {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .pagination {
    width: $min-width;
    margin: 0 auto;
    margin-top: 123px;
    margin-bottom: 51px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .noAlldata {
    width: $min-width;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 51px;
    img {
      width: 249px;
      height: 249px;
    }
    .nodataStyle {
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 20.27px;
      color: rgba(153, 153, 153, 1);
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.el-pagination.is-background .el-pager li.is-active {
  background: rgba(12, 111, 255, 1) !important;
}
</style>
