<template>
  <div class="type-list">
    <div class="type-head">产品列表</div>

    <div class="type-content">
      <div
        class="type-item"
        v-for="(typeItem, typeIdx) in typeStatisticList"
        :key="typeIdx"
      >
        <div class="type-item-name">
          <span>{{ typeItem.name }}</span>
          <span>(</span>
          <span>{{ typeItem.count || 0 }}</span>
          <span>)</span>
        </div>

        <div class="type-item-icon">
          <!-- <el-icon :size="16" color="#1A1A1A"><ArrowRight /></el-icon> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import { getProductTypeStatistic } from "@/api/product";

const props = defineProps({
  detail: {
    // type: Object,
    required: true
  }
});

watch(
  () => props.detail,
  () => {
    if (!props.detail.id) return;
    getProductTypeStatistic({
      enterpriseId: props.detail.id
    }).then((data) => {
      typeStatisticList.value = data;
    });
  },
  {
    deep: true,
    immediate: true
  }
);

const typeStatisticList = ref([]);
</script>

<style lang="scss" scoped>
.type-list {
  width: 100%;
}

.type-head {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 0 20px;
  box-sizing: border-box;
  color: #fff;
  background-color: #316eff;
}

.type-content {
  width: 100%;
  border-left: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  box-sizing: border-box;
}

.type-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 14px;
  box-sizing: border-box;

  &-name {
    flex: 1;
    font-size: 14px;
    color: #1a1a1a;
  }

  &-icon {
    flex-shrink: 0;
  }
}
</style>
