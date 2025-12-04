<template>
  <view class="hotList">
    <swiper class="swiper" next-margin="35px" touch-angle="45">
				<swiper-item 
          class="swiper-item" 
          v-for="(item,index) in props.hotListInfo" 
          :key="index"
        >
					<view 
          class="swiper-li" 
          v-for="(card,cardIndex) in item.resources" 
          :key="card.resourceId"
          @click="player(card.resourceId)"
          >
            <view class="left">
              <image :src="card.uiElement.image.imageUrl" mode="widthFix"/>
            </view>
            <view class="center">
              <p>{{ card.uiElement.mainTitle.title }}</p>
              <span>{{ card.resourceExtInfo.artists[0].name }}</span>
            </view>
            <view class="right">
              <svg  v-if="!ispaly[card.resourceId]" t="1764826575118" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5946" width="16" height="16"><path d="M897.143467 597.051733l-464.648534 311.5264c-46.976 31.488-110.592 18.944-142.08-28.023466A102.4 102.4 0 0 1 273.066667 823.5264V200.4736c0-56.5504 45.8496-102.4 102.4-102.4a102.4 102.4 0 0 1 57.028266 17.348267l464.64 311.5264c46.976 31.488 59.528533 95.104 28.032 142.08a102.4 102.4 0 0 1-28.023466 28.023466z" p-id="5947"></path></svg>
              <svg  v-else t="1764828824726" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23905" width="16" height="16"><path d="M0 512h146.285714v475.428571H0V512zM292.571429 0h146.285714v987.648H292.571429V0z m292.571428 182.857143h146.285714v788.699428h-146.285714V182.857143z m292.571429 475.428571h146.285714v323.218286h-146.285714V658.285714z" fill="#d81e06" p-id="23906"></path></svg> 
            </view>
          </view>
				</swiper-item>
			</swiper>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const ispaly = ref<{[key:string]:boolean}>({})
const props = defineProps(['hotListInfo'])

const player = (id:any) =>{
  //点击全部变成关闭 给对应的id进行取反 如果是当前id直接取反
  const cur = ispaly.value[id] //存取id点击时的状态
  Object.keys(ispaly.value).forEach(key => {
    return ispaly.value[key] = false
  }) 
  ispaly.value[id]=!cur
  // console.log(ispaly.value[id],cur)
}

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
    
    p{
      font-size: 17px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    >span{
      font-size: 11px;
      color: gray;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .right{
    margin-left: 10px;
  }
}

</style>
