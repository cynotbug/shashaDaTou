import axios from "axios";
import { showLoading, hideLoading } from "./loading";
import sessionStorage from "./sessionStorage";
import { TOKEN_NAME } from "./const";
import { ElMessage } from "element-plus";

class HttpRequest {
  constructor() {
    this.baseURL = import.meta.env.DEV
      ? "/api"
      : "https://discipline.zjbdsc.com/ctp-test/api";
    this.timeout = 3000;
  }

  request(options) {
    const instance = axios.create();
    options = Object.assign(
      {
        baseURL: this.baseURL,
        timeout: this.timeout
      },
      options
    );
    this.setInterceptors(instance);

    return instance(options);
  }

  setInterceptors(instance) {
    instance.interceptors.request.use(
      (config) => {
        // 添加token
        const token = sessionStorage.getCache(TOKEN_NAME);
        showLoading();
        config.headers["bmssdTokenDev"] = token;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (res) => {
        hideLoading();
        const { code, msg } = res.data;
        if (code == 0) {
          return res.data;
        } else {
          ElMessage({
            message: msg,
            type: "warning"
          });
          return Promise.reject(res);
        }
      },
      (error) => {
        hideLoading();
        return Promise.reject(error);
      }
    );
  }

  post(url, data) {
    return this.request({
      method: "post",
      url,
      data
    }).then(
      (res) => {
        return Promise.resolve(res.data);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(url, data) {
    return this.request({
      method: "get",
      url,
      params: data
    }).then(
      (res) => {
        return Promise.resolve(res.data);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

export default new HttpRequest();
