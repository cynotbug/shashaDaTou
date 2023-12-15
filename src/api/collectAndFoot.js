import http from "@/utils/http";

// 足迹删除
export function delTracet(data) {
  return http.post("/user/trace/delete", data);
}
//产品足迹列表
export function tracetList(data) {
  return http.post("/user/trace/tract/page", data);
}
// 产品收藏列表
export function collectList(data) {
  return http.post("/user/trace/collect/page", data);
}
//店铺收藏列表
export function collectSupplyList(data) {
  return http.post("/user/trace/enterprise/page", data);
}
