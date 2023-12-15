import { createApp } from "vue";
import "normalize.css";
import "./assets/css/index.scss";
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/assets/iconfont/iconfont.css";
import "@/router/permission";
import { createPinia } from "pinia";
import { limitDirective } from "./directives/permission";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.directive("limit", limitDirective);

app
  .use(createPinia())
  .use(router)
  .use(ElementPlus, { size: "small", zIndex: 3000, locale: zhCn })
  .mount("#app");
