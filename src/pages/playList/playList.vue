<script setup lang="ts">
import { getPLDetailApi } from '@/services';
import { ref } from 'vue';
import type { PLDetail, Playlist } from '@/services/type';


const playList = ref<Playlist | null>(null);

const getPLDetail = async () => {
  try {
    const res = await getPLDetailApi("14068522351");
    console.log(res);
    playList.value = (res as { playlist: Playlist }).playlist;
  } catch (e) {
    console.log(e)
  }
}

getPLDetail();


</script>

<template>
  <view class="wrap">
    <view class="content">
      <view class="header">
        <view class="bg" :style="`background-image: url(${playList?.coverImgUrl})`">
          <!-- <image :src="playList?.coverImgUrl"  /> -->
        </view>
        <!-- <image :src="playList?.coverImgUrl" alt=""/> -->
        <view class="header-content">
          <view class="info">
            <view class="img">
              <image :src="playList?.coverImgUrl" />
            </view>
            <view class="title">
              <h3>{{ playList?.name }}</h3>
              <p>
                <span class="avatar" :style="`background-image: url(${playList?.coverImgUrl})`"></span>
                <span class="username">
                  {{ playList?.creator.nickname }}
                </span>
              </p>
            </view>
          </view>
          <view class="desc">
            {{ playList?.description }}
          </view>
          <view class="btns">
            <button class="forward"></button>
            <button class="comment"></button>
            <button class="favorite"></button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>

.header{
  width: 100%;
  position: relative;
  padding: 30rpx;
  overflow: hidden;
  color: #fff;
  .bg{
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(20px);
    width: 100%;
    height: 100%;
    // background: #ccc;
    background-size: cover;
    background-repeat: no-repeat;
    transform: scale(1.5);
    z-index: 1;
  }
}

.header-content{
  position: relative;
  z-index: 3;
  .img{
    image{
      width: 240rpx;
      height: 240rpx;
      border-radius: 20rpx;
    }
  }
  .info{
    display: flex;
  }
}

.title{
  flex: 1;
  overflow: hidden;
  margin-left: 30rpx;
  h3{
    font-weight: 700;
    font-size: 16px;
  }

  p{
    display: flex;
    align-items: center;
    margin-top: 20rpx;
  }
  .avatar{
    height: 52rpx;
    width: 50rpx;
    border-radius: 50%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .username{
    margin-left: 16rpx;
    flex: 1;
    overflow: hidden;
    font-size: 12px;
  }
}

image{
  vertical-align: middle;
}


</style>