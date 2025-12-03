<template>
  <view class="content">
    <Head></Head>
    <swiper class="swipers" 
    circular  
    indicator-color="rgb(255,255,255,.5)" 
    indicator-active-color="#ffffff"
    indicator-dots
    >
			<swiper-item  v-for="item in swiperData" :key="item.targetId">
          <image :src="item.pic" mode="widthFix" />
			</swiper-item>
		</swiper>
  </view>
  <NavSwiper :navSwiperInfo="navSwiper"></NavSwiper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Head from './components/head/Head.vue';
import { homepageApi } from '@/services';
import NavSwiper from './components/navSwiper/NavSwiper.vue';
type SwiperIn ={
  targetId: number,
  pic: string
}

const swiperData = ref<SwiperIn[]>([]) //轮播图
const navSwiper = ref([]) 
const homePage = async () =>{
  try{
    const res = await homepageApi()
    console.log(res.data.blocks[1].creatives[0].resources)
    navSwiper.value = res.data.blocks[1].creatives[0].resources
    swiperData.value = res.data.blocks[0].extInfo.banners
  }catch(e){
    console.log(e)
  }
}
homePage()

</script>

<style lang="scss" scoped>
	.swipers {
    padding: 30rpx;
    height: 268rpx;
    image{
      width: 690rpx;
      border-radius: 20px;
    }
	}
	
	
</style>
