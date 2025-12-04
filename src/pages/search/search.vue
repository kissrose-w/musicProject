
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

// 热门搜索数据
const getData = async () => {
  try {
    const res = await searchHotInfo()
    console.log(res)
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
      searchHis.value.push(resultInfo.value)
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
    resultCon.value = res.data.result.allMatch
  } catch(e) {
    console.log(e)
  }
}

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
  if(debounceTimer) {
    clearTimeout(debounceTimer)
  }
  if(resultInfo.value) {
    debounceTimer = setTimeout(() => {
      resultData()
    }, 500)
  }
})

// 点击搜索历史，展示搜索列表
const onHisItem = (name:string) => {
  showList.value = true
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
      <uni-icons v-if="resultInfo" class="icon" type="clear" size="25" color="#ccc" />
    </view>
    <text
      class="del"
      v-if="isActive"
      @click="resultShow"
    >
      取消
    </text>
  </view>
  <searchList v-if="showList" :searchListData="searchListData" @goPlay="goPlay" />
  <searchResult v-if="resultInfo && !showList" :resultCon="resultCon" />
  <view v-else-if="hotData.length && !showList">
    <searchHistory v-if="searchHis && searchHis.length > 0" :searchHis="searchHis" @onHisItem="onHisItem" />
    <searchHotList :hotData="hotData" @onHisItem="onHisItem" />
  </view>
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
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
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
    padding: 8px;
    position: relative;
  }
  .icon{
    width: 24px;
    height: 24px;
    // padding: 0 8px;
    flex-shrink: 0;
    position: absolute;
    right: 60px;
  }
}

.input-placeholder{
  color: #b3b3b3;
  font-size: 14px; /* 字体大小 */
}
.del{
  width: 38px;
  text-align: right;
  line-height: 36px;
  font-size: 14px;
  color: #333;
}
</style>