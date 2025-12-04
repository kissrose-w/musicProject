<template>
  <view @click="goSearch" class="content">
    搜索
  </view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goSearch = () => {
  router.push({
    path: 'pages/search/search'
  })
}
</script>

<style>
.content{
  border: 1px solid red;
  font-size: 20px;
}
</style>
