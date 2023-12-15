<template>
  <div
    class="collect-container"
    :style="{ width: contentWidth, height: contentHeight }"
  >
    <div
      class="collect-not"
      @click="collectOperate"
      v-if="!productDetail.userTractId"
    >
      <div class="collect-not-icon"></div>
      <div class="collect-not-name">
        <slot>收藏产品</slot>
      </div>
    </div>
    <div class="collect-has" @click="cancelOperate" v-else>
      <div class="collect-has-icon"></div>
      <div class="collect-has-name">已收藏</div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";

import { addCollectOrRecord, deleteCollectOrRecord } from "@/api/collect";
import { useUserStore } from "../../../store/user";
import { storeToRefs } from "pinia";
import { ElMessage, ElMessageBox } from "element-plus";
const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore);
const addCollect = (businessId) => {
  addCollectOrRecord({
    businessId,
    type: 2,
    userId: userInfo.value.userId
  }).then(() => {
    // console.log("successs");
    ElMessage({
      message: "收藏成功",
      type: "success"
    });
    emit("update");
  });
};

const emit = defineEmits(["update"]);

const deleteCollect = (businessId) => {
  deleteCollectOrRecord({
    type: 2,
    userTractId: businessId
  }).then(() => {
    // console.log("successs");
    ElMessage({
      message: "取消收藏成功",
      type: "success"
    });
    emit("update");
  });
};

const collectOperate = () => {
  addCollect(productDetail.value.id);
};

const cancelOperate = () => {
  ElMessageBox.confirm("是否确认取消收藏?", "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      deleteCollect(productDetail.value.userTractId);
    })
    .catch(() => {});
};

const props = defineProps({
  detail: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    default: "large"
  }
});

const productDetail = ref({});

watch(
  () => props.detail,
  () => {
    productDetail.value = props.detail;
  },
  {
    deep: true,
    immediate: true
  }
);

const contentWidth = computed(() => {
  return props.size == "large" ? "132px" : "116px";
});

const contentHeight = computed(() => {
  return props.size == "large" ? "34px" : "24px";
});
</script>

<style lang="scss" scoped>
.collect-container {
  .collect-not {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #316eff;
    background-color: #316eff;

    &-icon {
      width: 16px;
      height: 16px;
      background-size: 100% 100%;
      background-image: url("../../../assets/img/un_collect_product.png");
      background-size: 100% 100%;
    }

    &-name {
      color: #fff;
      font-size: 14px;
      margin-left: 8px;
      line-height: 16px;
    }
  }

  .collect-has {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #d43030;
    background-color: #d43030;

    &-icon {
      width: 16px;
      height: 16px;
      background-size: 100% 100%;
      background-image: url("../../../assets/img/has_collect_icon.png");
      background-size: 100% 100%;
    }

    &-name {
      color: #fff;
      font-size: 14px;
      margin-left: 8px;
      line-height: 16px;
    }
  }
}
</style>
