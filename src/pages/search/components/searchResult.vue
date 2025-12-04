
<script setup lang='ts'>
import type { conItem } from '../../../services/type'

interface Props {
  resultCon: conItem[] | null
}

const props = defineProps<Props>()


</script>

<template>
<view class="con" v-for="item in props.resultCon" :key="item.keyword">
  {{ item.keyword }}
</view>
</template>

<style lang='scss' scoped>
  .con{
    padding: 10px;
    border-bottom: 1px dashed #ccc;
  }
</style>
