<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Md5 } from "ts-md5/dist/md5";
import { ElMessage } from "element-plus";
import { useUserStore } from "../../store/user";

import imgRovolve from "./3dImg2.vue";
const userStore = useUserStore();
const { setToken } = userStore;
const router = useRouter();
const formState = reactive({
  username: "莎头",
  password: "5114ST"
});
const captcha = reactive({
  token: "",
  sessionId: "",
  sig: ""
});

const login = async (params: any) => {
  //如果没有点击阿里云验证就给一个提示，而不是接口报错
  if (!captcha.token || !captcha.sig || !captcha.sessionId) {
    ElMessage({
      message: "请完成验证后点击登录",
      type: "error"
    });
    return;
  }
  // setToken(APP.TOKEN,'12')
  let token = "5114ST";
  setToken(token);
  router.push("/");
};

const onFinish = () => {
  const params = {
    username: formState.username,
    password: Md5.hashStr(formState.password),
    data: {
      scene: "ic_login",
      session_id: captcha.sessionId,
      sig: captcha.sig,
      token: captcha.token
    }
  };
  if (formState) {
    login(params);
    // getVerification(params)
  }
};
const initDrag = () => {
  if ((document.getElementById("sc")?.childNodes || []).length > 0) {
    (window as any).ic["reset"]();
    return;
  }
  // @ts-ignore: Unreachable code error
  window.ic = new smartCaptcha({
    renderTo: "#sc",
    width: 300,
    height: 40,
    default_txt: "点击按钮开始智能验证",
    success_txt: "验证成功",
    fail_txt: "验证失败，请在此点击按钮刷新",
    scaning_txt: "智能检测中",
    success: function (data: any) {
      // console.log('token: ', (window as any).NVC_Opt.token)
      // console.log('sessionId: ', data.sessionId);
      // console.log('sig: ', data.sig);
      captcha.token = (window as any).NVC_Opt.token;
      captcha.sessionId = data.sessionId;
      captcha.sig = data.sig;
    },
    fail: function (data: any) {
      console.log("ic error");
    }
  });
  (window as any).ic.init();
  // return ic;
};

onMounted(() => {
  initDrag();
});
</script>

<template>
  <div class="login">
    <div class="title">莎头</div>
    <!-- <Heart /> -->
    <div style="margin-left: -100px">
      <imgRovolve />
    </div>
    <div class="login-main">
      <!-- <div class="img">
        <img src="../../assets/img/loginBg3.jpg" class="loginBg1" />
        <img src="../../assets/img/loginBg2.jpg" class="loginBg2" />
        
      </div> -->
      <div class="title1">登录</div>
      <div class="login-form">
        <el-form :model="formState" class="formlogin">
          <el-form-item name="username">
            <el-input
              v-model:value="formState.username"
              placeholder="请输入用户名"
              style="width: 300px; height: 40px"
            >
            </el-input>
          </el-form-item>

          <el-form-item name="password">
            <el-input
              v-model:value="formState.password"
              placeholder="请输入密码"
              style="width: 300px; height: 40px"
            >
            </el-input>
          </el-form-item>
          <div id="sc"></div>
          <el-form-item>
            <el-button type="primary" class="btn" @click="onFinish"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  // background: #303645;
  color: #fff;
  user-select: none;
  // background-color: #f1f1f1;
  // background-color: rgba(0, 0, 0, 0.9);
  //   background-image: url('../../assets/images/登录背景.png');
  background-image: url("../../assets/img/loginbg3.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: auto;
  position: relative;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  .title {
    position: absolute;
    top: 55px;
    left: 55px;
    font-size: 50px;
    color: red;
  }
  .login-main {
    width: 400px;
    height: 400px;
    position: absolute;
    top: 150px;
    right: 100px;
    // float: right;
    border-radius: 12px;
    background-color: #fff;
    text-align: center;
    // max-width: 100%;
    // background-color: rgba(255, 255, 255, 0.2);
    // background-image: url('../../assets/images/矩形.png');
    // background-position: center center;
    // background-size: cover;
    // background-repeat: no-repeat;
    .title1 {
      color: #969696;
      font-size: 24px;
      margin-top: 24px;
      margin-bottom: 34px;
    }
    .img {
      display: flex;
      align-items: center;
      .loginBg1 {
        // width: 455px;
        // height: 400px;
        // border-radius: 12px;
        width: 200px;
        height: 200px;
        border-radius: 12px;
        transform: rotate(22deg);
      }
      // .loginBg2 {
      //   width: 300px;
      //   height: 520px;
      //   border-radius: 12px;
      //   margin-left: -50px;
      // }

      .loginBg2 {
        width: 200px;
        height: 200px;
        border-radius: 12px;
        transform: rotate(22deg);
        // transition: transform 0.5s ease-in-out; /* 添加过渡效果 */
      }

      .loginBg2:hover {
        transform: rotate(160deg); /* 实现旋转效果 */
      }
    }
    .login-form {
      width: 300px;
      box-sizing: border-box;
      margin: 0 auto;

      #sc {
        width: 100%;
        margin: 0;
        background-color: #fff;
        #SM_BTN_1 {
          border: none;

          .sm-ico {
            transform: scale(0.8);
          }
        }
      }
    }
  }
}

:deep(
    .sm-btn-default .sm-ico,
    .sm-btn-fail .sm-ico,
    .sm-btn-loading .sm-ico,
    .sm-btn-success .sm-ico
  ) {
  margin-left: -87px !important;
}
:deep(.sm-ico) {
  margin-left: -170px !important;
}
:deep(.el-button.el-button--primary.el-button--small.btn) {
  width: 300px;
  height: 40px;
  margin-top: 32px;
}
</style>

<!-- <template>
  <div class="login"></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;

  background-color: #f1f1f1;
  background-size: 100% 100%;
}
</style> -->
