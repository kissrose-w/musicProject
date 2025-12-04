<script setup lang="ts">
import type { Comment } from '@/services/type';


const props = defineProps<{
  commentList: Comment[];
  hotComments: Comment[];
}>()

console.log(props.commentList)
</script>

<template>
  <view class="mark">
    <view class="com-wrap" @click.stop>
      <view class="hot" v-if="hotComments.length !== 0">
        <view class="tit">
          热门评论
          <view class="border-bottom"></view>
        </view>
        <view class="com-item" v-for="item in hotComments">
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
      </view>
      <view class="new" v-if="commentList.length !== 0">
        <view class="tit">
          最新评论
          <view class="border-bottom"></view>
        </view>
      </view>
      <view
        class="empty"
        v-if="hotComments.length === 0 && commentList.length === 0"
      >暂无评论</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.mark{
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: .4);
  z-index: 4;
  overflow: hidden;
  .com-wrap{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1000rpx;
    background: #fff;
    overflow: auto;
  }
}

.tit{
  position: relative;
  height: 44px;
  padding: 12px 10px 12px 20px;
  // margin-left: 6px;
  font-weight: 400;
  color: #333;
  font-size: 16px;
  line-height: 20px;
  &::before{
    content: '';
    position: absolute;
    width: 4px;
    height: 12px;
    border-radius: 10px;
    background: #c84341;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
}

.com-item{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .avatar{
    width: 52rpx;
    height: 52rpx;
    image{
      width: 100%;
      height: 100%;
    }
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