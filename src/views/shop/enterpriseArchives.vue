<template>
  <div class="enterpriseArchives" v-if="merchantDetail">
    <div class="archivesDeatil">
      <img :src="getMerchantImageUrl()" />
      <div class="info">
        <div class="companyName">{{ merchantDetail.name }}</div>
        <div class="livetime">入驻时长：{{ merchantDetail.createDate }}</div>
        <div class="fontValue">
          所在地区：{{ merchantDetail.province }} {{ merchantDetail.city }}
          {{ merchantDetail.area }}
        </div>
      </div>
      <div class="download" @click="downloadFile(merchantDetail.qrCodeUrl)">
        <img
          :src="getIconImageUrl()"
          style="width: 16px; height: 16px; vertical-align: -2px"
        />
        下载二维码
      </div>
    </div>
    <div class="intro">
      河南亿建联跨境电商有限公司是一家从事软件开发、电子商务、以及IT技术解决方案互联网公司，主要专注于研发建筑行业电商平台。公司坚持以用户为中心，以建筑行业为基础，以电子商务为导向，致力于为建筑行业提供一站式服务。
    </div>
    <el-descriptions title="主营产品" :column="3" border>
      <el-descriptions-item
        label="主营产品"
        label-align="left"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        width="150px"
        >{{ merchantDetail.mainProduce || "--" }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      title="认证信息"
      :column="2"
      border
      style="margin-top: 24px; height: 194px; margin-bottom: 90px"
    >
      <el-descriptions-item
        label="公司名称"
        label-align="left"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        >{{ merchantDetail.name }}
      </el-descriptions-item>
      <el-descriptions-item
        label="企业统一信用代码"
        label-align="left"
        align="center"
        >{{ merchantDetail.code }}</el-descriptions-item
      >
      <el-descriptions-item
        label="企业类型"
        label-align="left"
        align="center"
        >{{ getMerchantTypeMap(merchantDetail.type) }}</el-descriptions-item
      >
      <el-descriptions-item label="地址" label-align="left" align="center">
        {{ merchantDetail.address }}
        <img
          :src="getAddressImageUrl()"
          style="vertical-align: -3px; margin-left: 5px"
        />
      </el-descriptions-item>
      <el-descriptions-item
        label="法人代表"
        label-align="left"
        align="center"
        >{{ merchantDetail.legalPerson }}</el-descriptions-item
      >
      <el-descriptions-item label="营业期限" label-align="left" align="center"
        >--</el-descriptions-item
      >
    </el-descriptions>
  </div>
</template>

<script setup>
// import { watch, ref } from "vue";

// const props = defineProps({
//   detail: {
//     // type: Object,
//     required: true
//   }
// });

// const merchantDetail = ref({});

// watch(
//   () => props.detail,
//   () => {
//     merchantDetail.value = props.detail;
//   },
//   {
//     deep: true,
//     immediate: true
//   }
// );
import { inject } from "vue";

const merchantDetail = inject("detail", {});

const downloadFile = (url) => {
  const a = document.createElement("a");
  a.href = url;
  const mouseEvent = new MouseEvent("click");
  a.dispatchEvent(mouseEvent);
};

const getMerchantTypeMap = (type) => {
  const typeMap = {
    1: "供应商",
    2: "施工单位",
    3: "监理单位",
    4: "建设单位"
  };

  return typeMap[type] || "--";
};

const getMerchantImageUrl = () => {
  return new URL(`@/assets/img/merchant_default.png`, import.meta.url).href;
};

const getIconImageUrl = () => {
  return new URL(`@/assets/img/download.png`, import.meta.url).href;
};

const getAddressImageUrl = () => {
  return new URL(`@/assets/img/position.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
.enterpriseArchives {
  width: $min-width;
  margin: 0 auto;
  margin-top: 24px;

  .archivesDeatil {
    display: flex;
    align-items: center;
    position: relative;
    .download {
      border-radius: 2px;
      border: 1px solid rgba(49, 110.00000000000003, 255, 1);
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 20.27px;
      color: rgba(49, 110, 255, 1);
      padding: 7px 14px;
      position: absolute;
      top: 5px;
      right: 0;
      cursor: pointer;
    }
    img {
      width: 88px;
      height: 88px;
    }
    .info {
      margin-left: 16px;
      .companyName {
        font-size: 14px;
        font-weight: 700;
        line-height: 20.27px;
        color: rgba(26, 26, 26, 1);
        margin-bottom: 10px;
        margin-top: 8px;
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
        margin-bottom: 11px;
      }
      .fontValue {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 20.27px;
        color: rgba(102, 102, 102, 1);
        margin-bottom: 13px;
      }
    }
  }
  .intro {
    background: rgba(245, 247, 250, 1);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20.27px;
    color: rgba(102, 102, 102, 1);
    padding: 16px;
    margin-top: 16px;
  }
}
</style>
<style lang="scss">
.el-descriptions.el-descriptions--small {
  .el-descriptions__body {
    height: 52px;
    .el-descriptions__table.is-bordered tbody tr {
      height: 52px;
      border: 1px solid rgba(232, 232, 232, 1);
    }
    .el-descriptions__label.el-descriptions__cell.is-bordered-label {
      background: rgba(245, 247, 250, 1);
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 20.27px;
      color: rgba(102, 102, 102, 1);
      padding: 4px 20px;
    }
    .el-descriptions__content.el-descriptions__cell.is-bordered-content {
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 20.27px;
      color: rgba(26, 26, 26, 1);
      margin-left: 12px;
    }
  }
  .el-descriptions__title {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 23.17px;
    color: rgba(26, 26, 26, 1);
    margin-top: 24px;
  }
}
</style>
