
<script setup lang='ts'>
import { ref, watch } from 'vue'
import searchResult from './components/searchResult.vue'
import searchHotList from './components/searchHotList.vue'
import searchHistory from './components/searchHistory.vue'
import searchList from './components/searchList.vue'
import { searchHotInfo, searchListInfo, searchResultInfo } from '../../services'
import type { HotItem, conItem, song } from '../../services/type'
import { useRouter } from 'vue-router'


const isActive = ref<boolean>(false)
const hotData = ref<HotItem[]>([])
const resultInfo = ref<string>('')
const resultCon = ref<conItem[]>([])
// 点击历史时抑制接下来的防抖建议触发
const suppressSuggest = ref<boolean>(false)
let debounceTimer: ReturnType<typeof setTimeout> | null = null
const searchListData = ref<song[]>([])
const searchHis = ref<string[]>([])
const showList = ref<boolean>(false)
const router = useRouter()

document.addEventListener('keydown', e => {
  if(e.keyCode === 13 && resultInfo) {
    searchListData.value = []
    getListData()
    showList.value = true
  }
})

// 跳转播放器
const goPlay = () => {
  router.push({
    path: '../palyer/player.vue'
  })
}

// 清空历史搜索
const clearHis = () => {
  localStorage.removeItem('name')
  // 立即清空内存中的历史，避免保留旧数据并让子组件通过现有 v-if 隐藏
  searchHis.value = []
}

// 热门搜索数据
const getData = async () => {
  try {
    const res = await searchHotInfo()
    hotData.value = res.data.data
    if(localStorage.getItem('name')){
      searchHis.value = (JSON.parse(localStorage.getItem('name')))
    }
  } catch(e) {
    console.log(e)
  }
}
getData()

// 搜索列表
const getListData = async () => {
  try {
    if(!searchHis.value?.includes(resultInfo.value)){
      searchHis.value.unshift(resultInfo.value)
      localStorage.setItem('name', JSON.stringify(searchHis.value))
    }
    const res = await searchListInfo({ keywords: resultInfo.value })
    searchListData.value = res.data.result.songs
  } catch(e) {
    console.log(e)
  }
}

// 搜索内容数据
const resultData = async () => {
  try {
    console.log('触发搜索建议')
    const res = await searchResultInfo({ keywords: resultInfo.value })
    resultCon.value = res.data.result?.allMatch ?? []
  } catch(e) {
    console.log(e)
  }
}

// 清空输入框里的值
const clearResult = () => {
  console.log('clearResult')
  resultInfo.value = ''
}

// 取消搜索内容展示
const resultShow = () => {
  isActive.value = false
  resultInfo.value = ''
  resultCon.value = []
  showList.value = false
  searchListData.value = []
}

// 搜索防抖
watch(resultInfo, () => {
  // 如果是通过历史点击设置的输入，跳过本次防抖触发
  if (suppressSuggest.value) {
    suppressSuggest.value = false
    return
  }
  if(debounceTimer) {
    clearTimeout(debounceTimer)
  }
  if(resultInfo.value) {
    // 立即清空现有建议，避免在新建议加载前显示旧数据
    resultCon.value = []
    debounceTimer = setTimeout(() => {
      resultData()
      showList.value = false
    }, 500)
  }
})

// 点击搜索历史，展示搜索列表
const onHisItem = (name:string) => {
  showList.value = true
  // 标记为历史触发，避免 watch 的防抖继续展示建议
  suppressSuggest.value = true
  resultInfo.value = name
  isActive.value = true
  getListData()
}

</script>

<template>
  <view class="search">
    <view class="inp">
      <view class="search-icon" @click="clearResult">
        <uni-icons type="search" size="20" color="#ccc" />
      </view>
      <input 
        type="text"
        placeholder="请输入要搜索的歌曲/歌手"
        :class="{active: isActive}"
        @focus="isActive = true"
        v-model.trim="resultInfo"
      >
      <uni-icons v-if="resultInfo" class="icon" type="clear" size="25" color="#ccc" @click="clearResult" />
    </view>
    <text
      class="del"
      v-if="isActive"
      @click="resultShow"
    >
      取消
    </text>
  </view>
  <view class="search-placeholder"></view>
  <searchResult v-if="resultInfo && !showList" :resultCon="resultCon" @onHisItem="onHisItem" />
  <searchList v-if="showList" :searchListData="searchListData" @goPlay="goPlay" />
  <view v-else-if="hotData.length && !resultInfo">
    <searchHistory v-if="searchHis && searchHis.length > 0" :searchHis="searchHis" @onHisItem="onHisItem" @clearHis="clearHis" />
    <searchHotList :hotData="hotData" @onHisItem="onHisItem" />
  </view>
</template>

<style lang='scss' scoped>
.search{
  height: 56px;
  padding: 10px;  
  display: flex;
  // background: black;
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 999;
  background: #fff;
  .inp{
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
  }
  .search-icon{
    width: 34px;
    height: 100%;
    background: #f8f8f8;
    border: none;
    line-height: 36px;
    text-align: center;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  input{
    flex: 1;
    height: 100%;
    border: none;
    background: #f8f8f8;
    color: black;
    padding: 8px 44px 8px 8px;
    position: relative;
  }
  .icon{
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 5;
  }
}

.search-placeholder{
  height: 56px;
}

.input-placeholder{
  color: #b3b3b3;
  font-size: 14px;
}

.del{
  width: 38px;
  text-align: right;
  line-height: 36px;
  font-size: 14px;
  color: #333;
}
</style>