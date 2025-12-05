
<script setup lang='ts'>
import type { conItem } from '../../../services/type'
import { computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  resultCon: { type: Array as PropType<conItem[]>, required: false }
})
interface Emits {
  onHisItem: [name: string]
}

const emits = defineEmits<Emits>()
const list = computed(() => (props.resultCon ?? []) as conItem[])

</script>

<template>
  <template v-if="list.length">
    <view class="con" v-for="item in list" :key="item.keyword" @click="emits('onHisItem', item.keyword)">
      {{ item.keyword }}
    </view>
  </template>
</template>

<style lang='scss' scoped>
  .con{
    padding: 10px;
    border-bottom: 1px dashed #ccc;
  }
</style>
