import http from "@/utils/http";

// 获取产品一级类别信息
export function getpropertyFirst(data) {
  return http.get("/ctp/property/first", data);
}
// 优质供应商
export function superiorEnterprise(data) {
  return http.post("/ctp/superior/enterprise/page", data);
}
