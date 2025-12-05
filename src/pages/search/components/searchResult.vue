
<script setup lang='ts'>
import type { conItem } from '../../../services/type'
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  resultCon: { type: Array as PropType<conItem[]>, required: false },
  name: { type: String as PropType<string>, required: false }
})
interface Emits {
  onHisItem: [name: string]
}

const emits = defineEmits<Emits>()
const list = computed(() => (props.resultCon ?? []) as conItem[])

</script>

<template>
  <view class="search-title">搜索“{{ props.name ?? '' }}”</view>
  <template v-if="list.length">
    <view class="con" v-for="item in list" :key="item.keyword" @click="emits('onHisItem', item.keyword)">
      <uni-icons class="search" type="search" size="20" color="#ccc" />
      {{ item.keyword }}
    </view>
  </template>
</template>

<style lang='scss' scoped>
  .search-title{
    padding-left: 20px;
    margin-top: 10px;margin-bottom: 10px;
    color: rgb(66, 122, 178);
    font-size: 16px;
  }
  .con{
    padding: 20px;
    // border-bottom: 1px dashed #ccc;
    color: rgba($color: #000000, $alpha: .6);
  }
  .search{
    margin-right: 5px;
  }
</style>
