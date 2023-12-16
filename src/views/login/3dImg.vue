<template>
  <div class="content">
    <div class="top"><img src="../../assets/img/loginBg1.jpg" /></div>
    <div class="bottom"><img src="../../assets/img/loginBg2.jpg" /></div>
    <div class="left"><img src="../../assets/img/loginBg3.jpg" /></div>
    <div class="right"><img src="../../assets/img/loginBg3.jpg" /></div>
    <div class="front"><img src="../../assets/img/loginBg3.jpg" /></div>
    <div class="after"><img src="../../assets/img/loginBg3.jpg" /></div>
  </div>
</template>
<style scoped>
.content {
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(-80deg);
  position: relative;
  margin: 200px auto;
  animation: rotate linear 20s infinite;
}
@-webkit-keyframes rotate {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
.content div {
  width: 200px;
  height: 200px;
  position: absolute;
  opacity: 0.8;
}
.content > div > img {
  width: 200px;
  height: 200px;
}
.content .top {
  transform: rotateX(90deg) translateZ(100px);
}
.content .left {
  transform: rotateY(-90deg) translateZ(100px);
}
.content .bottom {
  transform: rotateX(-90deg) translateZ(100px);
}
.content .right {
  transform: rotateY(90deg) translateZ(100px);
}
.content .front {
  transform: rotateY(0deg) translateZ(100px);
}
.content .after {
  transform: translateZ(-100px) rotateY(180deg);
}
</style>
