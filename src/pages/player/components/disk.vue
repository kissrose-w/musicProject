<script lang="ts" setup>
const props = defineProps(["bg", "isPlay"])
</script>

<template>
<view class="wrap">
  <view class="mid" :class="{rotate : isPlay}">
    <img src="https://zyxcl.github.io/MusicApp/assets/disc-BpXxhfCl.png" alt="">
    <view class="inner">
      <img :src="props.bg" alt="">
    </view>
  </view>  
  <view class="bar"><img src="https://zyxcl.github.io/MusicApp/assets/needle-ab-rkdmo8lr.png" alt=""></view>
</view>
<view class="lyricArea"></view>


</template>

<style lang="scss" scoped>
.wrap{
  padding-top:150rpx;
  position: relative;
}
.mid{
  width:600rpx;
  height:600rpx;
  margin:0 auto;
  position: relative;
    &.rotate{
      animation: rotate 5s linear infinite;
    }
  img{
    width:100%;
    height:100%;
  }
}
@keyframes rotate {
  from { transform: rotate(0deg); } 
  to { transform: rotate(360deg); } 
}
.bar{
  position: absolute;
  top:-20rpx;
  left:50%;
  transform: rotate(-15deg);
  transform-origin: center;
  width:260rpx;
  height:320rpx;
  img{
    display: block;
    width:100%;
    height:100%;
  }
}
.inner{
  width:360rpx;
  height:360rpx;
  position: absolute;
  top: 120rpx;
  left: 120rpx;
  transform: translate(-50% -50%);
  border-radius: 50%;
  overflow: hidden;
  img{
    width:100%;
    height:100%;
  }
}
.lyricArea{
  min-height:150rpx;
  margin: 20rpx 0;
}


</style>