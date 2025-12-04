<template>
  <view class="content">
    <view class="list-ul">
      <view class="item-li" v-for="item in props.recommendationInfo" :key="item.creativeId" @click="goDetail(item.creativeId)">
        <image :src="item.uiElement.image.imageUrl" mode="widthFix"/>
        <view class="text">{{ item.uiElement.mainTitle.title }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
type RecomT ={
  recommendationInfo:{
    creativeId:string,
    uiElement:{
      image:{
        imageUrl:string
      },
      mainTitle:{
        title:string
      }
    },
    
  }[]
}
const props = defineProps<RecomT>()
const goDetail = (id:string) =>{
  uni.navigateTo({
    url: `/pages/player/player?id=${id}`
  });
  console.log(id)
}
</script>

<style lang="scss" scoped>
.content{
  height: 330rpx;
  width: 100%;
}
.list-ul{
  padding:0 15px 10px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x:scroll;
  scrollbar-width: none;
  .item-li{
    width: 240rpx;
    margin-right: 10px;
    image{
      width: 240rpx;
      border-radius: 5px; 
    }
    .text{
      width: 100%;
      font-size: 13px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }
  }
  
}
</style>
