<template>
  <div>
    <div class="dibu2">
      <span id="marquee1">{{ message }}{{ message }}</span>
      <span id="marquee2">{{ message }}{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const message = ref(
  "看的是青春有这一往无前的目标，磕的是- -往无前路_上一路相伴的人，在他们身上看到了自己不曾走到过的光辉未来"
);
const marqueeVar = ref(null);
const speed1 = ref(0);
const speed2 = ref(0);
onMounted(() => {
  setTimeout(() => {
    runMarquee();
  }, 1000);
});

//将移动的关键代码移出
const moveMarquee = () => {
  // 获取内容区宽度
  var width1 = document
    .getElementById("marquee1")
    .getBoundingClientRect().width;
  var width2 = document
    .getElementById("marquee2")
    .getBoundingClientRect().width;
  //width为第二个span标签尾部到盒子尾部的距离，500为外层盒子的宽度
  var width = width1 + width2 - 1200;
  var marquee1 = document.getElementById("marquee1");
  var marquee2 = document.getElementById("marquee2");

  speed1.value = speed1.value - 1;
  speed2.value -= 1;
  // 如果speed2的尾部移到盒子的尾部并且speed1的移动距离不超过文字的距离
  if (-speed2.value >= width && -speed1.value >= width1) {
    //让speed1重新在原位置移动
    speed1.value = 1200;
  }
  if (-speed2.value >= width1 + width2) {
    //如果speed2的尾部移动到盒子的头部，让speed2跟在speed1之后移动
    speed2.value = 0;
  }
  marquee1.style.transform = "translateX(" + speed1.value + "px)";
  marquee2.style.transform = "translateX(" + speed2.value + "px)";
};
const runMarquee = () => {
  var marquee1 = document.getElementById("marquee1");
  var marquee2 = document.getElementById("marquee2");
  marqueeVar.value = setInterval(() => moveMarquee(), 30);
  //监听鼠标移入，清空定时器
  marquee1.addEventListener("mouseenter", () => {
    clearInterval(marqueeVar.value);
    marqueeVar.value = null;
  });
  marquee2.addEventListener("mouseenter", () => {
    clearInterval(marqueeVar.value);
    marqueeVar.value = null;
  });
  //监听鼠标移开，重启定时器
  marquee1.addEventListener("mouseleave", () => {
    marqueeVar.value = setInterval(() => moveMarquee(), 30);
  });
  marquee2.addEventListener("mouseleave", () => {
    marqueeVar.value = setInterval(() => moveMarquee(), 30);
  });
};
</script>

<style lang="scss">
@import "../../assets/css/variable.scss";
.dibu2 {
  width: 100%;
  height: 21px;
  line-height: 21px;
  font-size: 0.3rem;
  overflow: hidden;
  white-space: nowrap;
  background: red;
}

#marquee1 {
  display: inline-block;
}

#marquee2 {
  display: inline-block;
}
</style>
