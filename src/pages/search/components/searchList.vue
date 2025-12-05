
<script setup lang='ts'>
import type { song } from '../../../services/type'
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  searchListData: { type: Array as PropType<song[]>, required: false }
})

const emits = defineEmits(['goPlay'])

const list = computed(() => (props.searchListData ?? []) as song[])
</script>

<template>
  <template v-if="list.length">
    <view class="listName" v-for="item in list" :key="item.id" @click="() => emits('goPlay')">
      {{ item.name }}
      <view>专辑:{{ item.album.name }}</view>
      <view>{{ item.artists[0].name }}</view>
    </view>
  </template>
  <!-- <view v-else>无</view> -->
</template>

<style lang='scss' scoped>
  .listName{
    padding: 10px;
    &:not(:last-child){
      border-bottom: 1px dashed #ccc;
    }
  }
</style>