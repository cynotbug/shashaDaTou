import http from "@/utils/http";

// 获取商品类别
export function getProductCategory(data) {
  return http.get("/ctp/product/category", data);
}

// 获取商品列表
export function getProductList(data) {
  return http.post("/ctp/product/page", data);
}

// 获取首页全品类商品
export function getHomeAllProduct(data) {
  return http.get("/ctp/product/part", data);
}

// 获取商品详情
export function getProductDetail(data) {
  return http.get("/ctp/product/detail", data);
}

// 获取大类统计
export function getProductTypeStatistic(data) {
  return http.get("/ctp/property/number", data);
}
