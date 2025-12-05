
<script setup lang='ts'>
import type { song } from '../../../services/type'
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  searchListData: { type: Array as PropType<song[]>, required: false },
  name: { type: String as PropType<string>, required: false }
})
const emits = defineEmits<{ (e: 'goPlay', id: number): void }>()
const list = computed(() => (props.searchListData ?? []) as song[])


</script>

<template>
  <template v-if="list.length">
    <view class="page">
      <view 
        class="listName" 
        v-for="item in list" 
        :key="item.id" 
        @click="emits('goPlay', item.id)"
      >
        <view :class="{active: props.name && item.name.includes(props.name)}">{{ item.name }}</view>
        <view :class="['artist', {active: props.name && item.artists[0].name.includes(props.name)}]">
          <view class="artistName">
            <text v-for="(v, index) in item.artists">
              {{ v.name }}{{ index !== item.artists.length - 1 ? '/' : '' }}
            </text>--
          </view>
          <text :class="{active: props.name && item.album.name.includes(props.name)}">{{ item.album.name }}</text>
        </view>
      </view>
    </view>
  </template>
  <!-- <view v-else>无</view> -->
</template>

<style lang='scss' scoped>
  .page{
    padding: 0 10px;
  }
  .listName{
    padding: 10px;
    color: #666;
    font-size: 16px;
    &:not(:last-child){
      border-bottom: 1px dashed #ccc;
    }
    .artist{
      font-size: 12px;
      display: flex;
      .artistName{
        max-width: 250px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text{
          white-space: inherit;
        }
      }
    }
  }
  .active{
    color: rgb(66, 122, 178);
  }
</style>