
<script setup lang='ts'>

interface Props {
  searchHis: string[]
}

interface Emits {
  onHisItem: [name: string],
  clearHis: []
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

</script>

<template>
  <view class="hisTitle">
    <view class="hisCon">
      <view class="icon"></view>
      <span>搜索历史</span>
    </view>
    <uni-icons type="trash" size="20" color="#ccc" @click="emits('clearHis')" />
  </view>
  <view class="hisName">
    <text v-for="(item, index) in props.searchHis" :key="item" @click="emits('onHisItem', item)">{{ item }}</text>
  </view>
</template>

<style lang='scss' scoped>
  .hisTitle{
    display: flex;
    align-items: center;
    padding: 12px 10px;
    justify-content: space-between;
    .hisCon{
      display: flex;
      align-items: center;
    }
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
      border-color: #f1f1f1;
      background-color: #f1f1f1;
      color: black;
      border-radius: 15px;
      font-size: 14px;
      padding: 2px 10px;
      font-weight: 300;
      line-height: 20px;
      margin: 0 10px 10px 0;
    }
  }
</style>
