
<script setup lang='ts'>

interface conItem {
  alg?: string
  feature?: string
  keyword: string
  lastKeyword?: string
  type?: number
}

interface Props {
  resultCon: conItem[] | null
}

const props = defineProps<Props>()


</script>

<template>

</template>

<style lang='scss' scoped>
  
</style>
