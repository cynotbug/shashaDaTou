<template>
  <div class="search-container">
    <div class="search-inner">
      <div class="search-left">
        <div class="logo">
          <div class="logo-name">集采交易商城</div>
          <div class="logo-sub-name">畅选优质服务</div>
        </div>

        <div class="separator" v-if="isShow"></div>

        <div class="custom">
          <slot></slot>
        </div>
      </div>

      <div class="search-right">
        <div class="search-operate">
          <el-dropdown @command="changeSearchType" size="large">
            <div class="search-operate-head">
              <div class="search-operate-head-name">{{ searchTypeName }}</div>

              <div class="search-operate-head-icon">
                <el-icon class="el-icon--right">
                  <el-icon><ArrowDown /></el-icon>
                </el-icon>
              </div>
            </div>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="2">商品</el-dropdown-item>
                <el-dropdown-item :command="1">供应商</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <div class="search-operate-ipt">
            <el-input
              v-model="searchValue"
              placeholder="请输入品牌、商品名称等关键词"
              style="width: 100%"
              size="large"
            />
          </div>
          <div class="search-operate-btn" @click="searchOperate">搜索</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useSlots, computed } from "vue";

const props = defineProps({
  initValue: {
    type: String,
    default: ""
  }
});

const searchValue = ref(props.initValue);

let slots = useSlots();
let isShow = computed(() => {
  return slots.default && slots.default().length > 0;
});

const searchType = ref(2);

const searchTypeName = computed(() => {
  const typeMap = {
    2: "商品",
    1: "供应商"
  };
  return typeMap[searchType.value];
});

const changeSearchType = (command) => {
  searchType.value = Number(command);
};

const emit = defineEmits(["search"]);

const searchOperate = () => {
  // if (searchValue.value.trim().length == 0) {
  //   return;
  // }
  let value = searchValue.value.trim();
  emit("search", {
    value,
    type: searchType.value
  });
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";

:deep(.el-input__wrapper) {
  box-shadow: none;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: none;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
}

.search-container {
  width: 100%;
  height: 98px;
  background-color: #ffffff;
  box-sizing: border-box;
  line-height: 1;
}

.search-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: $min-width;
  margin: 0 auto;
  height: 100%;
}

.search-left {
  display: flex;
  align-items: center;
}

.logo {
  display: inline-flex;
  flex-direction: column;

  &-name {
    font-size: 24px;
    line-height: 32px;
    color: #1a1a1a;
    font-weight: 700;
  }

  &-sub-name {
    font-size: 14px;
    line-height: 20px;
    color: #666666;
    letter-spacing: 11px;
  }
}

.separator {
  width: 0;
  height: 36px;
  border-right: 1px solid #cccccc;
  margin-right: 8px;
}

.custom {
  height: 52px;
}

.search-right {
  display: flex;
  align-items: center;
}

.search-operate {
  display: flex;
  align-items: center;
  width: 542px;
  height: 42px;
  border-radius: 2px;
  overflow: hidden;
  border: 2px solid #316eff;
  box-sizing: border-box;
  background-color: #ffffff;

  &-head {
    flex-shrink: 0;
    width: 94px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #cccccc;
    box-sizing: border-box;
    padding: 0 16px;
    height: 100%;
    overflow: hidden;
    outline: none;
    &-name {
      font-size: 14px;
      color: #1a1a1a;
    }
  }

  &-ipt {
    flex: 1;
    // margin: 0 16px;
  }

  &-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 88px;
    height: 100%;
    font-size: 14px;
    background-color: #316eff;
    color: #ffffff;
    cursor: pointer;
  }
}

:deep(.el-dropdown:focus-visible) {
  outline: none;
}
</style>
