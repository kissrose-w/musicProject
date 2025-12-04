
<script setup lang='ts'>
import { ref, watch } from 'vue'
import searchResult from './components/searchResult.vue'
import searchHotList from './components/searchHotList.vue'
import { searchHotInfo, searchResultInfo } from '../../services'

interface HotItem {
  searchWord: string
  score: number
  iconType: number
  source: number
  iconUrl?: string
  content: string
  url: string
  alg?: string
}
interface conItem {
  alg?: string
  feature?: string
  keyword: string
  lastKeyword?: string
  type?: number
}

const isActive = ref<boolean>(false)
const hotData = ref<HotItem[]>([])
const resultInfo = ref<string | number>('')
const resultCon = ref<conItem[]>([])
let debounceTimer: ReturnType<typeof setTimeout> | null = null

// 热门搜索数据
const getData = async () => {
  try {
    const res = await searchHotInfo()
    console.log(res)
    hotData.value = res.data.data
  } catch(e) {
    console.log(e)
  }
}
getData()

// 搜索内容数据
const resultData = async () => {
  try {
    const res = await searchResultInfo({ keywords: resultInfo.value })
    console.log(res.data.result)
    resultCon.value = res.data.result
  } catch(e) {
    console.log(e)
  }
}

// 取消搜索内容展示
const resultShow = () => {
  isActive.value = false
  resultInfo.value = ''
}

// 搜索防抖
watch(resultInfo, () => {
  if(debounceTimer) {
    clearTimeout(debounceTimer)
  }
  if(resultInfo.value) {
    debounceTimer = setTimeout(() => {
      resultData()
    }, 500)
  }
})

</script>

<template>
  <view class="search">
    <view class="inp">
      <view class="search-icon"></view>
      <input 
        type="text"
        placeholder="请输入要搜索的歌曲/歌手"
        :class="{active: isActive}"
        @focus="isActive = true"
        v-model="resultInfo"
      >
    </view>
    <text
      v-if="isActive"
      @click="resultShow"
    >
      <span>取消</span>
    </text>
  </view>
  <searchResult v-if="resultInfo && isActive" :resultCon="resultCon" />
  <searchHotList v-else-if="hotData.length" :hotData="hotData" />
</template>

<style lang='scss' scoped>
.search{
  height: 56px;
  padding: 10px;  
  display: flex;
  // background: black;
  .inp{
    flex: 1;
    height: 100%;
    display: flex;
    border-radius: 5px;
    overflow: hidden;
  }
  .search-icon{
    width: 34px;
    background: #f8f8f8;
    border: none;
  }
}
input{
  flex: 1;
  height: 100%;
  border: none;
  background: #f8f8f8;
  color: black;
  padding: 8px;
}
.input-placeholder{
  color: #b3b3b3;
  font-size: 14px; /* 字体大小 */
}
text{
  width: 38px;
  text-align: right;
  span{
    font-size: 14px;
    line-height: 36px;
    color: #333;
    cursor: pointer
  }
}
</style>