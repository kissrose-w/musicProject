<template>
  <view class="content">
    <Head></Head>
    <swiper class="swiper" 
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Head from './components/head/Head.vue';
import { homepageApi } from '@/services';
type SwiperIn ={
  targetId: number,
  pic: string
}

const swiperData = ref<SwiperIn[]>([]) 
const info = ref([])
const homePage = async () =>{
  try{
    const res = await homepageApi()
    console.log(res.data.blocks[0].extInfo.banners)
    info.value = res.data.blocks
    swiperData.value = res.data.blocks[0].extInfo.banners
  }catch(e){
    console.log(e)
  }
}
homePage()

</script>

<style lang="scss" scoped>

	.swiper {
    padding: 30rpx;
    height: 268rpx;
    image{
      width: 690rpx;
      border-radius: 20px;
    }
	}
	
	
</style>
