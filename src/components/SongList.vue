<script setup lang="ts">
import type { Song } from '@/services/type';

const props = defineProps<{ songList?: Song[] }>();
const emit = defineEmits(['goPlayer']);

console.log('songList props:', props.songList)

</script>

<template>
  <view
    class="song-item"
    v-for="(item, index) in props.songList"
    :key="item.id"
    @click="emit('goPlayer', item.id)"
  >
    <view class="song-info">
      <view class="num">{{ index + 1 }}</view>
      <view class="song-con">
        <view class="title">{{ item.name }}</view>
        <view class="avatar">{{ item.ar.reduce((prev, val) => {
          if(prev === '') prev += val.name;
          else prev += (' / ' + val.name)
          return prev
        }, '') }}</view>
      </view>
    </view>
    <svg t="1764818295007" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17718" width="14" height="14">
      <path d="M534.826667 935.466667a47.36 47.36 0 0 1-66.986667-66.773334L835.413333 501.333333 467.84 133.973333a47.36 47.36 0 1 1 66.986667-66.773333l400.64 400.64a47.36 47.36 0 0 1 0 66.986667z" fill="#bbbbbb" p-id="17719"></path>
    </svg>
    <view class="border-bottom"></view>
  </view>
</template>

<style lang="scss" scoped>
.song-item{
  position: relative;
  // width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .song-info{
    flex: 1;
    padding: 12px 15px;
    display: flex;
    overflow: hidden;
    .num{
      width: 80rpx;
      text-align: center;
      line-height: 80rpx;
      font-weight: 700;
      font-size: 16px;
    }
  }
  .icon{
    display: flex;
    margin: 0 10px;
  }
  .border-bottom{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 1px;
    transform: scaleY(.5);
    background-color: #e5e5e5;
    z-index: 1;
  }
}

.song-con{
  display: flex;
  flex-direction: column;
  width: 530rpx;
  .title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #3b4144;
  }
  .avatar{
    margin-top: 6rpx;
    color: #999;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>