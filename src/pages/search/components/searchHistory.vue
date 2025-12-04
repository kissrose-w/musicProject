
<script setup lang='ts'>

interface Props {
  searchHis: string[]
}

interface Emits {
  onHisItem: [name: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

</script>

<template>
  <view class="hisTitle">
    <view class="icon"></view>
    <span>搜索历史</span>
  </view>
  <view class="hisName">
    <text v-for="item in props.searchHis" :key="item" @click="emit('onHisItem', item)">{{ item }}</text>
  </view>
</template>

<style lang='scss' scoped>
  .hisTitle{
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
  .hisName{
    padding: 10px;
    min-height: 49px;
    display: flex;
    flex-wrap: wrap;
    text{
      border-color: #ddd;
      background-color: #ddd;
      color: #333;
      border-radius: 15px;
      font-size: 12px;
      padding: 2px 5px;
      font-weight: 200;
      line-height: 14px;
      margin: 0 10px 10px 0;
    }
  }
</style>
