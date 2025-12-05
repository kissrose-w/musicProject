<script lang="ts" setup>
import { mineApi } from "../../services/index"
import { ref } from "vue"

interface MineInfo {
  id: number;
  coverImgUrl: string;
  name: string;
  playCount: number;
  subscribedCount: number;
}

const mineInfo = ref<MineInfo>()
const getMine = async() => {
  try {
    const res = await mineApi()
    console.log(res.playlist[0])
    mineInfo.value = res.playlist[0]
    console.log(mineInfo.value)
  } catch (error) {
    console.log(error)
  }
}
getMine()
const toMyLike = (e:any) => {
  const { id } = e.currentTarget.dataset
  uni.navigateTo({
    url:`/pages/playList/playList?id=${id}`
  }) 
}
</script>

<template>
  <view class="basicInfo">
    <view class="avatar">
      <img src="https://p1.music.126.net/q7pUyLVm3g6uL2QQeMvSgg==/109951168645624240.jpg" alt="">
    </view>
    <view class="infoNav">
      <view>关注</view>
      <view>粉丝</view>
      <view>等级</view>
      <view>听歌</view>
    </view>
  </view>
  <view class="myLike" :data-id="mineInfo?.id" @click="toMyLike">
    <img :src="mineInfo?.coverImgUrl" alt="">
    <view class="likeInfo">
      <text>{{ mineInfo?.name }}</text>
      <view class="count">{{mineInfo?.playCount}}首·{{mineInfo?.subscribedCount}}次播放</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
button{
  width: 100%;
  height: 50px;
}
.basicInfo{
  height:225px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.avatar{
  width:75px;
  height:75px;
  margin-bottom: 20px;
  img{
    width:100%;
    height:100%;
    border-radius: 50%;
  }
}
.infoNav{
  display: flex;
  view{
    margin-right: 10px;
    font-size: 14px;
    color:#cfc4c4;
  }
}
.myLike{
  display: flex;
  border-bottom: 1px solid #cfc4c4;
  border-top: 1px solid #cfc4c4;
  padding: 12px 15px;
  align-items: center;
  img{
    width:40px;
    height:40px;
    margin-right: 15px;
  }
}
.likeInfo{
  text{
    font-size: 14px;
    color:#3B4144;
  }
  .count{
    font-size: 12px;
    color:#999999;
  }
}
</style>
