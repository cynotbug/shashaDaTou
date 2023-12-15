<template>
  <div class="myCollect">
    <div class="infoTips">
      <div class="allProduct">全部产品（{{ pagination.total }}）</div>
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
    <div class="tabs-content-twoFloor">
      <div class="intro">产品分类</div>
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
    <div class="allProduct-content">
      <template v-for="(item, index) in collectData" :key="index">
        <!-- <img :src="item.image" /> -->
        <div class="item" @click.stop="toProductDetail(item)">
          <div class="greenMaterials" v-if="item.startRateDesc">
            {{ item.startRateDesc }}
          </div>
          <img
            :src="
              !item.image
                ? getImageUrl()
                : item.image && JSON.parse(item.image).url
            "
            class="image"
          />
          <span @click.stop="cancelCollect(item)">取消收藏</span>
          <!-- <a href="#" class="now">&nbsp;</a> -->
          <div class="productName">{{ item.name }}</div>
          <div style="display: flex; align-items: center">
            <img :src="geticonQiyeImageUrl()" class="iconQiye" />
            <div class="company">{{ item.enterpriseName }}</div>
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
        <img :src="nodataImageUrl()" />
        <div class="nodataStyle">暂无收藏</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getpropertyFirst } from "@/api/bestSupplier";
import { collectList } from "@/api/collectAndFoot";
import { delTracet } from "@/api/collectAndFoot";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { sanjiaoleftUrl, sanjiaorightUrl } from "../../../utils/imageCommon";

const pages = ref(1);
const collectData = ref([]);
const activeName = ref("");
const activeList = ref([]);
const pagination = reactive({
  total: 0,
  page: 1,
  size: 5
});
const router = useRouter();
const pageDisStyle = { "pointer-events": "none", cursor: "not-allowed" };
const pageCliStyle = { cursor: "pointer" };
const props = defineProps(["condition"]);
onMounted(() => {
  getGoodsCollect();
  getTabsName();
});
const toProductDetail = (productItem) => {
  const { enterpriseId, id } = productItem;
  router.push({
    path: `/shop/merchant/${enterpriseId}/product/detail/${id}`
  });
};
const getTabsName = () => {
  getpropertyFirst().then((res) => {
    console.log(res, "res");
    activeList.value = res.map((v) => ({ label: v.name, value: v.pid }));
  });
};
// 当前页减少
const reducePage = () => {
  pagination.page--;
  if (pagination.page === 0) {
    pagination.page = 1;
    return;
  }
  getGoodsCollect();
};
// 当前页增加
const increasePage = () => {
  pagination.page++;
  // 如果当前页大于总页数 设置为总页数
  if (pagination.page > pages.value) {
    pagination.page = pages.value || 1;
    return;
  }
  getGoodsCollect();
};

const handleCurrentChange = (val) => {
  pagination.page = val;
  getGoodsCollect();
};

const cancelCollect = (item) => {
  console.log("取消收藏单个");
  ElMessageBox.confirm("是否确认取消收藏？", "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      const params = {
        type: 2,
        userTractId: item.userTractId
      };
      delTracet(params).then((res) => {
        console.log(res, "res");
        ElMessage({
          message: "取消收藏成功",
          type: "success"
        });
        getGoodsCollect();
      });
    })
    .catch(() => {
      // ElMessage({
      //   type: "info",
      //   message: "取消删除此收藏"
      // });
    });
};
const getImageUrl = () => {
  return new URL(`@/assets/img/product_default.png`, import.meta.url).href;
};
const geticonQiyeImageUrl = () => {
  return new URL(`@/assets/img/iconQiye.png`, import.meta.url).href;
};
const nodataImageUrl = () => {
  return new URL(`@/assets/img/noCollect.png`, import.meta.url).href;
};
const getGoodsCollect = () => {
  pagination.page = 1;
  let params = {
    content: props.condition.content,
    contentType: props.condition.contentType,
    firstProId: activeName.value,
    page: pagination.page,
    size: pagination.size
  };

  collectList(params).then((res) => {
    console.log(res, "resooo");
    collectData.value = res.records;
    pagination.total = res.total;
    pages.value = 1;
    if (pagination.total) {
      pages.value = Math.ceil(pagination.total / pagination.size);
    }
  });

  console.log(activeName.value, "activeName.value");
};
const handleClick = (tab) => {
  console.log(tab.props.name, "tab");
  activeName.value = tab.props.name;
  pagination.page = 1;
  getGoodsCollect();
};

defineExpose({ getGoodsCollect });
</script>
<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
.myCollect {
  .infoTips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
    padding: 14px 0;
    .allProduct {
      font-size: 16px;
      font-weight: 700;
      line-height: 23.17px;
      color: rgba(26, 26, 26, 1);
    }
  }

  .allProduct-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    // justify-content: space-between;
    // .item {

    .item {
      position: relative;
      // height: 327px;
      width: calc(20% - 13px);
      margin-right: 16px;
      border: 1px solid rgba(232, 232, 232, 1);
      box-sizing: border-box;
      padding: 14px;
      margin-bottom: 14px;
      &:nth-child(5n) {
        margin-right: 0px !important;
      }
      .greenMaterials {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 4px 0px 0px 4px;
        background: rgba(232, 255, 234, 1);
        padding: 3px 6px;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 17.38px;
        color: rgba(0, 180, 42, 1);
      }
      // margin: 0 auto;
    }
    .item a,
    .item span {
      display: none;
      text-decoration: none;
    }
    .item:hover {
      cursor: pointer;
    }
    .item:hover a.now {
      cursor: pointer;
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: 100;
      left: 0;
      display: block;
    }
    .item:hover span {
      display: block;
      position: absolute;
      top: 0px;
      left: 0;
      color: rgba(255, 255, 255, 1);
      width: 100%;
      z-index: 10;
      height: 40px;
      line-height: 40px;
      background: rgba(102, 102, 102, 0.8);
      filter: alpha(opacity=60);
      // -moz-opacity: 0.5;
      // opacity: 0.5;
      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      text-align: center;
    }
    .image {
      width: 100%;
      height: 200px;
    }
    .productName {
      font-size: 14px;
      font-weight: 700;
      line-height: 20.27px;
      color: rgba(26, 26, 26, 1);
      padding: 16px 0;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
    }
    .iconQiye {
      width: 16px;
      height: 16px;
      margin-right: 4px;
      margin-top: 6px;
    }
    .company {
      font-size: 12px;
      font-weight: 400;
      line-height: 17.38px;
      color: rgba(102, 102, 102, 1);
      padding-top: 8px;
    }
    // }
  }
  .tabs-content-twoFloor {
    width: $min-width;
    margin: 0 auto;
    height: 52px;
    line-height: 52px;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(232, 232, 232, 1);
    // padding: 24px 20px 5px 20px;
    margin-top: -52px;
    display: flex;
    align-content: center;
    box-sizing: border-box;
    margin-top: 24px;
    .intro {
      padding: 15px 44px 16px 20px;
      line-height: 52px;
      margin-right: 24px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20.27px;
      color: rgba(102, 102, 102, 1);
      // margin-top: 2px;
      background: rgba(245, 247, 250, 1);
      box-sizing: border-box;
    }
    :deep(.el-tabs.el-tabs--top.demo-tabs) {
      --el-tabs-header-height: 22px !important;
      padding: 15px 44px 16px 20px;
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
  .pagination {
    width: $min-width;
    margin: 0 auto;
    margin-top: 64px;
    margin-bottom: 43px;
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
<style>
.el-pagination.is-background .el-pager li.is-active {
  background: rgba(12, 111, 255, 1) !important;
}
.el-button.el-button--primary.el-button--small {
  background: rgba(12, 111, 255, 1) !important;
}
</style>
