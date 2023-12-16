<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import WORLD from "../../assets/map/world.js";
import NameMap from "../../assets/map/nameMap.js";
import { useRouter } from "vue-router";
//  npm i echarts@^5.3.2 -D --force or --legacy-peer-dep
const router = useRouter();
const MapRef = ref<any>();

onMounted(() => {
  initMap([]);
});

const initMap = (data: any) => {
  const countries = [{ name: "法国(剑指巴黎)", value: 100 }];
  const myChart = echarts.init(MapRef.value);
  echarts.registerMap("world", WORLD);
  const option = {
    color: ["#5681FF"],
    visualMap: {
      show: false,
      min: 10,
      max: 100,
      inRange: {
        color: ["rgba(72,116,243,0.16)", "red"]
      }
    },
    tooltip: {
      formatter: "{b}"
    },
    // geo:{
    //   type:'map',
    //   map:'world',
    //   roam:true,
    //   nameMap: NameMap,
    //   scaleLimit: {
    //     min: 1,
    //     max: 10
    //   },
    //   label: {
    //     show:false,
    //     color: '#FFFFFF'
    //   },
    //   itemStyle: {
    //     areaColor: 'rgba(72,116,243,0.16)',
    //     borderColor: '#4874F3',
    //     borderWidth: 1
    //   },
    //   emphasis: {
    //     itemStyle: {
    //       areaColor: '#4874F3',
    //     },
    //     label: {
    //       color: '#FFFFFF'
    //     }
    //   }
    // },
    series: [
      {
        type: "map",
        map: "world",
        roam: false,
        zoom: 6,
        nameMap: NameMap,
        selectedMode: false,
        scaleLimit: {
          min: 1,
          max: 10
        },
        center: [10, 53],
        label: {
          show: true,
          color: "#FFFFFF"
        },
        itemStyle: {
          areaColor: "rgba(72,116,243,0.16)",
          borderColor: "rgba(255,255,255,0.6)",
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            areaColor: "#D1BF6E"
          },
          label: {
            color: "#FFFFFF"
          }
        },

        data: countries
      }
    ]
  };
  option && myChart.setOption(option);
  myChart.on("click", function (data) {
    // if (data.name === '美国') {
    //   // 跳转美国
    //   router.push('/America')
    // } else
    if (countries.filter((i) => i.name === data.name).length > 0) {
      router.push({
        path: "/europeanEntity/searchCountry",
        query: { nation: data.name }
      });
      // 跳转欧盟
      // router.push('/Europe')
    }
  });
};
</script>

<template>
  <div class="world-map" ref="MapRef"></div>
</template>

<style lang="scss" scoped>
.world-map {
  // width: 100%;
  // height: 100%;
  width: 900px;
  height: 497px;
  background: linear-gradient(153deg, #424b5c 0%, #202532 100%);
  border-radius: 4px;
}
</style>
