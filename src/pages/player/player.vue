<script setup lang="ts">
import { onLoad,onUnload,onHide,onShow} from '@dcloudio/uni-app'
import { ref, watch,computed} from 'vue'
import { radioApi,radioUrlApi, songDetailApi } from "../../services/index"
const radioBGInfo = ref([])
const radioUrl = ref("")
const playInfo = ref<{time?:number}>({})
const totalTime = ref(null)
const curTime = ref(0)
const player = uni.createInnerAudioContext()
const isPlay = ref(true)
 const timer = ref(null)

// 获取id类型
const curId = ref<string | number>('')
interface Params {
  // id: number
  id?: string | number
}
// 监听id变化
watch(curId, async (newId) => {
  if (newId) {
    player.stop()
    radioUrl.value = ''
    await getRadioUrl()
    if(radioUrl.value ){
      player.src = radioUrl.value
      player.play()
    }
  }   
}, 
{ 
  immediate: false 
})
onLoad((query?: Params) => {
  console.log(query?.id) //打印出上个页面传递的参数
  curId.value = query?.id!
  getRadioUrl()
  getSongDetail();
  isPlay.value = true
  timer.value = setInterval(() => {
    if (isPlay.value && curTime.value < totalTime.value) {
      curTime.value += 1000
    }
  }, 1000)
  console.log(curTime.value)
})
onUnload(() => {
  if(player){
    player.stop()
    player.destroy()
    clearInterval(timer.value)
  }
})
onHide(() => {
  if (isPlay.value) {
    player.pause()
    isPlay.value = false
  }
})
onShow(() => {
  if (radioUrl.value && !isPlay.value) {
    player.src = radioUrl.value
    player.play()
  }
})
// 获取歌曲url
const getRadioUrl = async() => {
  try {
    const res = await radioUrlApi(curId.value)
    // console.log(res.data[0].url)
    // console.log(res.data[0])
    radioUrl.value = res.data[0].url
    playInfo.value = res.data[0]
    formatTime()
  } catch (error) {
    console.log(error)
  }
}
// 获取歌曲详情
const getSongDetail = async () => {
  try {
    const res = await songDetailApi(curId.value);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

const ifPlay = () => {
  isPlay.value = !isPlay.value
  if(isPlay.value){
    player.src = radioUrl.value
    player.play()
    console.log("播放")
  }else{
    player.pause()
    console.log("停止")
  }
}
// 临时不正确背景
const getRadio = async() => {
  try {
    const res = await radioApi()
    // console.log(res.playlist.coverImgUrl)
    radioBGInfo.value = res.playlist.coverImgUrl
  } catch (error) {
    console.log(error)
  }
}
getRadio()

const formatTime = () =>{
  // console.log(playInfo.value.time)
  const minute = Math.floor(playInfo.value.time / 1000 / 60)
  const second = Math.floor(playInfo.value.time / 1000 % 60)
  console.log(`${minute}:${second}`) 
  return totalTime.value = `${minute}:${second}`
}


</script>

<template>
 <view class="radio" :style="{ backgroundImage: `url(${radioBGInfo})` }">
    <view class="playArea">
      <view class="playInfo">
        <span>{{ curTime }}</span>
        <view class="playBar" >
          <view class="playBall"></view>
        </view>
        <span class="totalTime">{{ totalTime }}</span>
      </view>
      <button @click="ifPlay">{{isPlay?"播放" : "停止"}}</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,html{
  height: 100%;
  overflow: hidden;
}
.radio{
  width:100%;
  height:100vh;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  img{
    width:100%;
    height:100%;
    filter: blur(10px);
  }
}
.playArea{
  position: absolute;
  bottom: 44px;
  left: 0;
  width: 100%;
}
.playInfo{
  display:flex;
  align-items: center;
  width:100%;
  height:40px;
  padding:0 10px;
  background: pink;
 
  .playBar{
    flex: 1;
    height:3px;
    background: #ffffff;
    border-radius: 1px;
    margin: 0 8px;
    position: relative;
  }
  .playBall{
    width:10px;
    height:10px;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
    top:-3px;
    left:-5px;
  }
}
</style>