<template>
  <view class="hotList">
    <swiper class="swiper" next-margin="35px">
				<swiper-item class="swiper-item" v-for="item in props.hotListInfo" >
					<view class="swiper-li" v-for="card in item.resources">
            <view class="left">
              <image :src="card.uiElement.image.imageUrl" mode="widthFix"/>
            </view>
            <view class="center">
              <p>{{ card.uiElement.mainTitle.title }}</p>
              <span>{{ card.resourceExtInfo.artists[0].name }}</span>
            </view>
            <view class="right">
              <svg t="1764826575118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5946" width="16" height="16"><path d="M897.143467 597.051733l-464.648534 311.5264c-46.976 31.488-110.592 18.944-142.08-28.023466A102.4 102.4 0 0 1 273.066667 823.5264V200.4736c0-56.5504 45.8496-102.4 102.4-102.4a102.4 102.4 0 0 1 57.028266 17.348267l464.64 311.5264c46.976 31.488 59.528533 95.104 28.032 142.08a102.4 102.4 0 0 1-28.023466 28.023466z" p-id="5947"></path></svg>
            </view>
          </view>
				</swiper-item>
			</swiper>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['hotListInfo'])
</script>

<style lang="scss" scoped>
.swiper{
  width: 100%;
  height: 400rpx;
  .swiper-item{
    width: 640rpx;
    height: 100%;
    .swiper-li{
      width: 640rpx;
      height: 93rpx;
      display: flex;
      align-items: center;
      padding: 10px 15px;
      // background: #eee
    }
  }
}
.swiper-li{
  .left{
    width: 86rpx;
    height: 90rpx;
    margin-right: 10px;
    image{
      width: 100%;
      border-radius: 5px;
    }
  }
  .center{
    flex: 1;
    max-width: 68%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    p{
      font-size: 17px;
    }
    >span{
      font-size: 11px;
      color: gray;
    }
  }
  .right{
    margin-left: 10px;
  }
}

</style>
