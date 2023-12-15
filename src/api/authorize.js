import http from "@/utils/http";

export function validateIdentity(data) {
  return http.post("/sys/login/enterpriseCode", data);
}
