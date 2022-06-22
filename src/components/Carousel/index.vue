<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in carouselData"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["carouselData"],
  watch: {
    // 监听bannerListData数据变化
    carouselData: {
      immediate: true,
      // 检测到数据变化后立刻调用nextTick钩子
      //nextTick：在下次DOM更新   循环结束之后  执行延迟回调（再修改数据之后，立刻使用这个方法，可以获取更新后的DOM）
      handler() {
        this.$nextTick(() => {
          // 创建swiper实例必须要页面有对应的DOM之后
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            autoplay: true, //自定播放
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>