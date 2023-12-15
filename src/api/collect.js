import http from "@/utils/http";

// 添加关注收藏
export function addCollectOrRecord(data) {
  return http.post("/user/trace/insert", data);
}

// 删除关注收藏
export function deleteCollectOrRecord(data) {
  return http.post("/user/trace/delete", data);
}
