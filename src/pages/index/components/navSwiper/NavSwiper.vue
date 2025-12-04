<template>
  <Swiper
  class="swiper"
    :slides-per-view="5"  
    :free-mode="true"     
  >
    <SwiperSlide
    class="swiper-slide"
    v-for="(item,index) in props.navSwiperInfo"
    :key="item.resourceId"
    >
      <view class="item">
        <img :src="item.uiElement.image.imageUrl" >
      </view>
      <span>{{ item.uiElement.mainTitle.title}}</span>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/free-mode';
import 'swiper/css';
const props = defineProps(['navSwiperInfo'])


</script>

<style lang="scss" scoped>

.swiper{
  width: 100%;
  height: 150rpx;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .item{
      width: 40px;
      height: 40px;
      background: #C84341;
      border-radius: 50%;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    >span{
      font-size: 13px;
      margin-top: 8px;
    }
  }  
}


</style>