<template>
  <div class="shopCollect">
    <div class="infoTips">
      <div class="allProduct">全部供应商（{{ pagination.total }}）</div>
      <div class="searchright">
        <div class="input-btn-compact">
          <el-input
            v-model="searchShop"
            placeholder="请输入店铺名称"
            class="input"
            @keyup.enter="onSearch"
          >
          </el-input>
          <div @click="onSearch" class="btn">搜索</div>
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
    </div>
    <div class="supply-main">
      <template v-for="(item, index) in shopCollectData" :key="index">
        <div class="item">
          <div class="main-left">
            <div style="display: flex">
              <img :src="getMerchantImageUrl()" class="picture" />
              <div>
                <div class="companyName">
                  {{ item.name }}
                  <span class="grade">{{ item.score }}</span>
                  <img
                    :src="delUrl()"
                    class="delpicture"
                    @click.stop="delShop(item)"
                  />
                </div>
                <div class="livetime">入驻时长：{{ item.createDate }}</div>
                <div class="fontValue">
                  所在地区：{{ item.province }} {{ item.city }}
                </div>
                <div class="fontValue_one" @click="onJumpMerchant">
                  进入店铺
                  <img
                    :src="rightArrUrl()"
                    style="width: 16px; height: 16px; vertical-align: -4px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="main-right">
            <div v-if="item.proPartVoList.length > 0" style="display: flex">
              <div v-for="(img, i) in item.proPartVoList || []" :key="i">
                <div class="img" @click.stop="toProductDetail(img)">
                  <img
                    :src="
                      !img.image
                        ? getImageUrl()
                        : img.image && JSON.parse(img.image).url
                    "
                    style="width: 94px; height: 94px"
                  />
                  <div class="fontStyle_third" v-if="img.name.length < 5">
                    {{ img.name }}
                  </div>
                  <el-tooltip
                    :content="img.name"
                    placement="top"
                    effect="light"
                    v-else
                  >
                    <div class="fontStyle_third">
                      {{ img.name.slice(0, 5) }}...
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div v-else class="nodata">
              <div>
                <img
                  :src="noproductDataUrl()"
                  style="width: 94px; height: 94px"
                />
                <div class="nodataStyle">暂无商品发布</div>
              </div>
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
        <img :src="nodataImageUrl()" />
        <div class="nodataStyle">暂无收藏</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { collectSupplyList } from "@/api/collectAndFoot";
import { delTracet } from "@/api/collectAndFoot";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  sanjiaoleftUrl,
  sanjiaorightUrl,
  noproductDataUrl,
  rightArrUrl
} from "../../../utils/imageCommon";
// companyimgurl

const router = useRouter();
const pages = ref(1);
const props = defineProps(["condition"]);
const shopCollectData = ref([]);
const pageDisStyle = { "pointer-events": "none", cursor: "not-allowed" };
const pageCliStyle = { cursor: "pointer" };
const pagination = reactive({
  total: 0,
  page: 1,
  size: 5
});
const searchShop = ref("");
onMounted(() => {
  getshopCollect();
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
const nodataImageUrl = () => {
  return new URL(`@/assets/img/noCollect.png`, import.meta.url).href;
};
const delUrl = () => {
  return new URL(`@/assets/img/del.png`, import.meta.url).href;
};
const getMerchantImageUrl = () => {
  return new URL(`@/assets/img/merchant_default.png`, import.meta.url).href;
};
const onSearch = () => {
  pagination.page = 1;
  getshopCollect();
};
const onJumpMerchant = (item) => {
  router.push({
    path: `/shop/merchant/${item.id}`
  });
};
// 当前页减少
const reducePage = () => {
  pagination.page--;
  if (pagination.page === 0) {
    pagination.page = 1;
    return;
  }
  getshopCollect();
};
// 当前页增加
const increasePage = () => {
  pagination.page++;
  // 如果当前页大于总页数 设置为总页数
  if (pagination.page > pages.value) {
    pagination.page = pages.value || 1;
    return;
  }
  getshopCollect();
};
const getshopCollect = () => {
  pagination.page = 1;
  let params = {
    content: props.condition.content,
    contentType: props.condition.contentType,
    name: searchShop.value,
    page: pagination.page,
    size: pagination.size
  };

  collectSupplyList(params).then((res) => {
    console.log(res, "resooo");
    shopCollectData.value = res.records;
    pagination.total = res.total;
    pages.value = 1;
    if (pagination.total) {
      pages.value = Math.ceil(pagination.total / pagination.size);
    }
  });
};

const handleCurrentChange = (val) => {
  pagination.page = val;
  getshopCollect();
};
const delShop = (item) => {
  ElMessageBox.confirm("是否确认取消收藏?", "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      const params = {
        type: 3,
        userTractId: item.userTractId
      };
      delTracet(params).then((res) => {
        console.log(res, "res");
        ElMessage({
          message: "取消收藏成功",
          type: "success"
        });
        getshopCollect();
      });
    })
    .catch(() => {
      // ElMessage({
      //   type: "info",
      //   message: "取消删除此收藏"
      // });
    });
};

defineExpose({ getshopCollect });
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
.shopCollect {
  .infoTips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
    padding: 14px 0;
    .searchright {
      display: flex;
      align-items: center;

      :deep(.el-input__wrapper) {
        border-radius: 0px;
        border: 1px solid rgba(217, 217, 217, 1);
        border-right: transparent;
        box-shadow: none;
      }
      // .input {
      //   width: 230px;
      //   height: 32px;
      //   margin-right: 16px;
      // }
      .input-btn-compact {
        width: 230px;
        height: 32px;
        box-sizing: border-box;
        display: flex;
        margin-right: 16px;
        .btn {
          width: 72px;
          height: 32px;
          border-radius: 0px 2px 2px 0px;
          background: rgba(241, 241, 241, 1);
          border: 1px solid rgba(217, 217, 217, 1);
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 32px;
          color: rgba(102, 102, 102, 1);
          text-align: center;
          cursor: pointer;
          box-sizing: border-box;
        }
      }
    }
    .allProduct {
      font-size: 16px;
      font-weight: 700;
      line-height: 23.17px;
      color: rgba(26, 26, 26, 1);
    }
  }
  .supply-main {
    width: $min-width;
    margin: 0 auto;

    margin-top: 20px;
    box-sizing: border-box;
    .item {
      display: flex;
      border-bottom: 1px solid rgba(232, 232, 232, 1);
      width: 100%;
      padding: 16px 20px;
      box-sizing: border-box;
      //   margin-bottom: 16px;
      .main-left {
        width: 40%;
        position: relative;
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
            margin-right: 126px;
          }
          .delpicture {
            position: absolute;
            top: 4px;
            right: 35px;
            cursor: pointer;
          }
          .picture {
            vertical-align: -3px;
            cursor: pointer;
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
        width: 40%;
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
          .nodataStyle {
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 20.27px;
            color: rgba(153, 153, 153, 1);
            text-align: center;
          }
        }
      }
    }
  }
  .pagination {
    width: $min-width;
    margin: 0 auto;
    margin-top: 95px;
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
