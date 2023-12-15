import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import legacy from "@vitejs/plugin-legacy";
import path from "path";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue()
    // legacy({
    //   targets: ["defaults", "not IE 11"]
    // })
  ],
  // https://doc.smart.com/activity/sit/xxx/doc/index.html
  // 配置为
  // base:'/activity/sit/xxx/doc/'
  // https://cynotbug.github.io/shashaDaTou/dist/#/shasha/home
  base: "./",
  //   // publicPath: "./",

  build: {
    outDir: "docs" // 打包文件的输出目录
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    open: true
    // proxy: {
    //   "/api": {
    //     target: "http://10.8.11.107:6010",
    //     changeOrigin: true, // 这里不加的话 服务端 无法拿到origin属性
    //     rewrite: (path) => path.replace(/^\/api/, "")
    //   }
    // }
  }
});
