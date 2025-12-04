
<script setup lang='ts'>
import type { HotItem } from '../../../services/type'


interface Props {
  hotData: HotItem[] | null
}

interface Emits {
  onHisItem: [name: string]
}

const emit = defineEmits<Emits>()
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
      @click="emit('onHisItem', item.searchWord)"
    >
    <text>{{ index + 1 }}</text>
    <span>{{ item.searchWord }}</span>
    <span class="img"><img v-if="item.iconUrl" :src="item.iconUrl"></span>
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
    font-size: 14px;
    color: #000;
    .hotName{
      height: 30px;
      text{
        width: 20px;
        text-align: left;
        margin-right: 5px;
      }
      .img{
        position: relative;
        margin-left: 5px;
      }
      img{
        width: 15px;
        height: 16px;
        position: absolute;
        left: 0;
        top: 3px;
        right: 0;
        bottom: 0;
        overflow: hidden;
      }
    }
  }
</style>
