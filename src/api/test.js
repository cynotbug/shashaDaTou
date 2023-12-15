import http from "@/utils/http";

export function testRequest(data) {
  return http.get("/ctp/product/category", data);
}
