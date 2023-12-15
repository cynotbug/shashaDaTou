import http from "@/utils/http";

// 获取供应商详情
export function getProductCategory(data) {
  return http.get("/ctp/enterprise/detail", data);
}
