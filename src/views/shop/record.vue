<template>
  <div class="shopRecoed">
    <Search @search="handleSearch">
      <div class="fontStyle">我的足迹</div>
    </Search>
    <div class="shopRecoed-tab">
      <div class="shopRecoed-tab-inner">
        <div class="shopRecoed-tab-inner-content">我的足迹</div>
      </div>
    </div>
    <div class="mytracks">
      <template v-for="(obj, index) in trackData" :key="index">
        <div class="mytracks-content">
          <div class="allTrack">
            <span class="date">{{ obj.tractCreatedDate }}</span>
            <span class="num">{{ obj.detail.length }}件商品</span>
            <img
              :src="getdelImageUrl()"
              style="vertical-align: -2px; cursor: pointer"
              @click="deleteAll(obj)"
            />
            <span class="del" @click="deleteAll(obj)"> 删除全部 </span>
          </div>
          <div class="allProduct-content">
            <template v-for="(item, index) in obj.detail" :key="index">
              <div class="item">
                <span id="operate" @click="deleteTracet(item)">删除</span>

                <div @click="toProductDetail(item)">
                  <img
                    :src="
                      !item.image
                        ? getImageUrl()
                        : item.image && JSON.parse(item.image).url
                    "
                    class="image"
                  />

                  <!-- <a href="#" class="now">&nbsp;</a> -->
                  <div class="productName">{{ item.name }}</div>
                  <div style="display: flex; align-items: center">
                    <img :src="geticonQiyeImageUrl()" class="iconQiye" />
                    <div class="company">{{ item.enterpriseName }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="pagination" v-if="pagination.total > 0">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        background
        layout="prev, pager, next"
        :total="pagination.total"
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
import Search from "../../components/layout/search.vue";
import { delTracet, tracetList } from "../../api/collectAndFoot";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";

const router = useRouter();
const trackData = ref([]);
const pagination = reactive({
  total: 0,
  page: 1,
  size: 10
});
const condition = reactive({
  contentType: "",
  content: ""
});
onMounted(() => {
  getTraceData();
});

const getImageUrl = () => {
  return new URL(`@/assets/img/product_default.png`, import.meta.url).href;
};
const getdelImageUrl = () => {
  return new URL(`@/assets/img/delete.png`, import.meta.url).href;
};
const geticonQiyeImageUrl = () => {
  return new URL(`@/assets/img/iconQiye.png`, import.meta.url).href;
};
const noDataUrl = () => {
  return new URL(`@/assets/img/nodata.png`, import.meta.url).href;
};
const handleSearch = async (data) => {
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
const deleteTracet = (item) => {
  console.log("MMMMM");
  showConfirm()
    .then(() => {
      const params = {
        type: 1,
        userTractId: item.userTractId
      };
      delTracet(params).then(() => {
        ElMessage({
          message: "刪除成功",
          type: "success"
        });
        getTraceData();
      });
    })
    .catch(() => {});
};

const showConfirm = () => {
  return ElMessageBox.confirm("是否确认删除？", "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  });
};

const deleteAll = (item) => {
  showConfirm()
    .then(() => {
      const params = {
        createDate: item.tractCreatedDate,
        type: 1
        // userTractId: item.userTractId
      };
      delTracet(params).then(() => {
        ElMessage({
          message: "刪除成功",
          type: "success"
        });
        getTraceData();
      });
    })
    .catch(() => {});
};

const getTraceData = () => {
  let params = {
    content: condition.content,
    contentType: condition.contentType,
    // firstProId: 0,
    page: pagination.page,
    size: pagination.size
  };
  tracetList(params).then((res) => {
    trackData.value = res.records || [];
    pagination.total = res.total;
    trackData.value = trackData.value.reduce((pre, cur, index) => {
      let obj = {};
      if (index == 0) {
        obj.tractCreatedDate = cur.tractCreatedDate;
        obj.detail = [cur];
        pre.push(obj);
      } else {
        const i = pre.findIndex(
          (item) => item.tractCreatedDate == cur.tractCreatedDate
        );
        if (i > -1) {
          pre[i].detail.push(cur);
        } else {
          obj.tractCreatedDate = cur.tractCreatedDate;
          obj.detail = [cur];
          pre.push(obj);
        }
      }
      return pre;
    }, []);
  });
};

const toProductDetail = (item) => {
  const { enterpriseId, id } = item;
  router.push({
    path: `/shop/merchant/${enterpriseId}/product/detail/${id}`
  });
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
.shopRecoed {
  .shopRecoed-tab {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #316eff;
    margin-bottom: 38px;
    &-inner {
      width: $min-width;
      margin: 0 auto;
      &-content {
        width: 120px;
        background: rgba(31, 94, 240, 1);
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 40px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
    }
  }
  .mytracks {
    width: $min-width;
    margin: 0 auto;
    .mytracks-content {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0px !important;
      }
      .allTrack {
        border-bottom: 1px solid rgba(232, 232, 232, 1);
        padding: 14px 0;
        .date {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0px;
          line-height: 23.17px;
          color: rgba(26, 26, 26, 1);
          margin-right: 16px;
        }
        .num {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 20.27px;
          color: rgba(102, 102, 102, 1);
          margin-right: 24px;
        }
        .del {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 20.27px;
          color: rgba(212, 48, 48, 1);
          cursor: pointer;
        }
      }
      .allProduct-content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 24px;

        .item {
          position: relative;
          width: calc(20% - 13px);
          margin-right: 16px;
          border: 1px solid rgba(232, 232, 232, 1);
          box-sizing: border-box;
          padding: 14px;
          margin-bottom: 14px;
          &:nth-child(5n) {
            margin-right: 0px !important;
          }
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
          background: rgba(212, 48, 48, 0.8);
          filter: alpha(opacity=60);
          // -moz-opacity: 0.5;
          // opacity: 0.5;
          font-size: 14px;
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
      }
    }
  }
  .pagination {
    width: $min-width;
    margin: 0 auto;
    margin-top: 50px;
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
.fontStyle {
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 28.96px;
  color: rgba(102, 102, 102, 1);
  /* padding-left: 8px; */
  /* vertical-align: 17px; */
  margin-top: 12px;
  /* margin-left: 8px; */
}
.el-pagination.is-background .el-pager li.is-active {
  background: rgba(12, 111, 255, 1) !important;
}
</style>
