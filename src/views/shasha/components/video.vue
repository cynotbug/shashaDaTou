<!-- <template>
  <video :src="videoSource" @play="onPlay" @pause="onPause"></video>
  <button @click="togglePlay">{{ playing ? "Pause" : "Play" }}</button>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["videoSource"]);
const playing = ref(false);

const togglePlay = () => {
  playing.value = !playing.value;
  const video = this.$el.querySelector("video");
  if (playing.value) {
    video.play();
  } else {
    video.pause();
  }
};
const onPlay = () => {
  playing.value = true;
};
const onPause = () => {
  playing.value = false;
};
</script>

<style lang="scss" scoped></style> -->

<script setup>
import { ref } from "vue";

const video = ref(null);
const props = defineProps(["videoSource", "heightValue"]);
console.log(props.heightValue);
// 播放
const handelPlay = () => {
  video.value.play();
};

// 暂停
const handelPause = () => {
  video.value.pause();
};

const suibianFn = () => {
  console.log("11");
  alert("11");
};
defineExpose({ handelPlay });
</script>

<template>
  <div class="home">
    <video
      ref="video"
      :src="videoSource"
      :height="heightValue"
      loop
      controls
      volume="5"
      @timeupdate="handleTimeUpdate"
    ></video>
    <!--
    src: 视频路径
    width: 视频宽度
    height: 视频高度
    autoplay: 是否自动播放
    loop 如果出现该属性，视频播放结束会再次播放，即循环播放。
    controls: 是否显示控制条
    volume: 声音（0-1）
    @timeupdate: 视频播放时触发(获取视频播放的时间)
  -->

    <!-- <button>播放</button>
    <button @click="handelPause">暂停</button> -->
  </div>
</template>
<style scoped>
video {
  width: 100%;
  /* height: 230px; */
}
</style>
