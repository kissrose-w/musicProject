
<script setup lang='ts'>
import type { song } from '../../../services/type'

interface Props {
  searchListData: song[] | null
}

interface Emits {
  goPlay: []
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

</script>

<template>
  <view class="listName" v-for="item in props.searchListData" :key="item.name" @click="emits('goPlay')">
    {{ item.name }}
    <view>专辑:{{ item.album.name }}</view>
    <view>{{ item.artists[0].name }}</view>
  </view>
</template>

<style lang='scss' scoped>
  .listName{
    padding: 10px;
    &:not(:last-child){
      border-bottom: 1px dashed #ccc;
    }
  }
</style>