<template>
  <div class="contactUs">
    <el-descriptions
      title="联系我们"
      :column="2"
      border
      style="margin-top: 24px; height: 194px; margin-bottom: 90px"
    >
      <el-descriptions-item
        label="店铺负责人"
        label-align="left"
        align="center"
        label-class-name="my-label"
        class-name="my-content"
        >{{ merchantDetail.principal }}
      </el-descriptions-item>
      <el-descriptions-item
        label="联系电话"
        label-align="left"
        align="center"
        >{{ merchantDetail.principalPhone }}</el-descriptions-item
      >
      <el-descriptions-item label="业务联系人" label-align="left" align="center"
        >{{ merchantDetail.legalPhone }}-{{
          merchantDetail.legalPhone
        }}</el-descriptions-item
      >
      <el-descriptions-item
        label="客服电话"
        label-align="left"
        align="center"
        >{{ merchantDetail.legalPhone }}</el-descriptions-item
      >
      <el-descriptions-item label="地址" label-align="left" align="center">
        {{ merchantDetail.address
        }}<img
          :src="getAddressImageUrl()"
          style="vertical-align: -3px; margin-left: 5px"
        />
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { inject } from "vue";

const merchantDetail = inject("detail", {});

const getAddressImageUrl = () => {
  return new URL(`@/assets/img/position.png`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
.contactUs {
  width: $min-width;
  margin: 0 auto;
  :deep(.el-descriptions.el-descriptions--small) {
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
}
</style>
