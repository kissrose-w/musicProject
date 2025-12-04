<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';


const curId = ref<string | number>('')
interface Params {
  // id: number
  id?: string | number
}

onLoad((query?: Params) => {
  console.log(query?.id); //打印出上个页面传递的参数。
  curId.value = query?.id!
})

</script>

<template>
  播放页
</template>

<style lang="scss" scoped>

</style>