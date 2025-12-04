<script setup lang="ts">
import type { Comment } from '@/services/type';
import CommentList from './CommentList.vue';

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
        <CommentList :list="hotComments"/>
      </view>
      <view class="new" v-if="commentList.length !== 0">
        <view class="tit">
          最新评论
          <view class="border-bottom"></view>
        </view>
        <CommentList :list="commentList"/>
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