<script setup lang="ts">
import type { Comment } from '@/services/type';


const props = defineProps<{list: Comment[]}>()

</script>

<template>
  <view class="com-item" v-for="item in list">
    <view class="com-info">
      <view class="avatar">
        <image :src="item.user.avatarUrl"/>
      </view>
      <view class="con">
        <view class="username">{{ item.user.nickname }}</view>
        <view class="text">{{ item.content }}</view>
      </view>
    </view>
    <svg t="1764818295007" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17718" width="14" height="14">
      <path d="M534.826667 935.466667a47.36 47.36 0 0 1-66.986667-66.773334L835.413333 501.333333 467.84 133.973333a47.36 47.36 0 1 1 66.986667-66.773333l400.64 400.64a47.36 47.36 0 0 1 0 66.986667z" fill="#bbbbbb" p-id="17719"></path>
    </svg>
    <view class="border-bottom"></view>
  </view>
</template>

<style lang="scss" scoped>
.com-item{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .com-info{
    flex: 1;
    display: flex;
    padding: 12px 0 12px 15px;
    align-items: center;
    .avatar{
      // flex: 1;
      width: 52rpx;
      height: 52rpx;
      margin-right: calc(18rpx + 10px);
      image{
        width: 100%;
        height: 100%;
      }
    }
    .con{
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding-right: 8px;
      color: #3b4144;
      .username{
        font-size: 14px;
        white-space: pre-line;
      }
      .text{
        margin-top: 6rpx;
        color: #999;
        font-size: 12px;
        white-space: pre-line;
      }
    }
  }
  .icon{
    margin: 0 10px;
  }
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
</style>