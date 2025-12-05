
<script setup lang='ts'>
import type { HotItem } from '../../../services/type'


interface Props {
  hotData: HotItem[] | null
}

interface Emits {
  onHisItem: [name: string]
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()

</script>

<template>
  <view class="hotTitle">
    <view class="icon"></view>
    <span>热门搜索</span>
  </view>
  <view class="hotCon">
    <view 
      class="hotName"
      v-for="(item, index) in props.hotData" 
      :key="item.searchWord"
      @click="emits('onHisItem', item.searchWord)"
    >
      <view class="left">
        <text :class="{ red: index + 1 <= 3 }">{{ index + 1 }}</text>
        <view class="word">{{ item.searchWord }} <view class="tag" v-if="item.content">{{ item.content }}</view></view>
        <span class="img"><img v-if="item.iconUrl" :src="item.iconUrl"></span>
      </view>
      <view class="score">{{ item.score }}</view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
  .hotTitle{
    display: flex;
    align-items: center;
    padding: 12px 10px;
    span{
      font-size: 14px;
      color: rgb(51, 51, 51);
      font-weight: 400;
    }
     .icon{
      width: 4px;
      height: 12px;
      border-radius: 10px;
      margin-right: 6px;
      background-color: #c84341;
    }
  }
  .hotCon{
    padding: 10px;
    font-size: 18px;
    color: #000;
    .hotName{
      min-height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .left{
        display: flex;
        align-items: center;
        .word{
          display: flex;
          flex-direction: column;
        }
        .tag{
          font-size: 14px;
          color: #ccc;
        }
      }
      text{
        width: 20px;
        text-align: left;
        margin-right: 10px;
        color: #ccc;
        &.red{
          color: red;
        }
      }
      .score{
        margin-right: 5px;
        font-size: 14px;
        color: #ccc;
      }
      .img{
        padding-top: 2px;
        margin-left: 5px;
      }
      img{
        width: 14px;
        height: 16px;
      }
    }
  }
</style>
