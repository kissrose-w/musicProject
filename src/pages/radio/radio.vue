<script lang="ts" setup>
import { radioApi,radioUrlApi } from "../../services/index"
import { ref } from "vue"
const radioBGInfo = ref([])
const radioUrl = ref("")
const playInfo = ref<{time?:number}>({})
const time = ref(null)
const innerAudioContext = uni.createInnerAudioContext()
const isPlay = ref(false)

const getRadio = async() => {
  try {
    const res = await radioApi()
    console.log(res.playlist.coverImgUrl)
    radioBGInfo.value = res.playlist.coverImgUrl
  } catch (error) {
    console.log(error)
  }
}
getRadio()

const getRadioUrl = async() => {
  try {
    const res = await radioUrlApi()
    console.log(res.data[0].url)
    console.log(res.data[0])
    radioUrl.value = res.data[0].url
    playInfo.value = res.data[0]
    formatTime()
  } catch (error) {
    console.log(error)
  }
}
getRadioUrl()

const ifPlay = () => {
  isPlay.value = !isPlay.value
  if(isPlay.value){
    innerAudioContext.src = radioUrl.value
    innerAudioContext.play()
    console.log("播放")
  }else{
    innerAudioContext.stop()
    console.log("停止")
  }
}
const formatTime = () =>{
  console.log(playInfo.value.time)
  const minute = Math.floor(playInfo.value.time / 1000 / 60)
  const second = Math.floor(playInfo.value.time / 1000 % 60)
  console.log(`${minute}:${second}`) 
  return time.value = `${minute}:${second}`
}

</script>

<template>
  <view class="radio" :style="{ backgroundImage: `url(${radioBGInfo})` }">
    
    <view class="playArea">
      <view class="playInfo">
        <span>0:00</span>
        <view class="playBar">
          <view class="playBall"></view>
        </view>
        <span class="totalTime">{{ time }}</span>
      </view>
      <button @click="ifPlay">{{isPlay?"播放" : "停止"}}</button>
    </view>
  </view>
 
</template>

<style lang="scss" scoped>
.radio{
  width:100vw;
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
.playInfo{
 
  display:flex;
  align-items: center;
  width:100%;
  height:40px;
  padding:10px;
  background: pink;
 
  .playBar{
    width:70%;
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