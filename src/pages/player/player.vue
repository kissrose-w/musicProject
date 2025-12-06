<script setup lang="ts">
import { onLoad,onUnload,onHide,onShow} from '@dcloudio/uni-app'
import { ref, watch,computed} from 'vue'
import { radioUrlApi,radioLyricApi, songDetailApi, playerCommentApi} from "../../services/index"
import disk from './components/disk.vue'
import bottomNav from './components/bottomNav.vue'
import lyric from './components/lyric.vue'
import comment from '@/components/comment.vue'
const radioBGInfo = ref('')
const radioUrl = ref("")
const radiolyric = ref("")
const playInfo = ref<{time?:number}>({})
const totalTime = ref(null)
const curTime = ref(0)
const player = uni.createInnerAudioContext()
const isPlay = ref(true)
const timer = ref(null)
const playwidth = ref(null)
const playball = ref(null)
const playbar = ref(null)
const isMove = ref(false)
const showLyric = ref(false)
const showRemark = ref(false)
const commentList = ref([])
const hotComments = ref([])
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
  getSongDetail()
  isPlay.value = true
  clearInterval(timer.value)
  curTime.value = 0
  getRadioUrl()
  radioLyric()
  getPlayerComment()
  timer.value = setInterval(() => {
    if (isPlay.value && curTime.value < totalTime.value) {
      curTime.value += 1000
      progressRate()
    }else if(curTime.value >= totalTime.value){
       clearInterval(timer.value)
      }
  }, 1000)
  // console.log(curTime.value)
})
onUnload(() => {
  if(player){
    player.stop()
    player.destroy()
    clearInterval(timer.value)
    isPlay.value = false
  }
})
// onHide(() => {
//   if (isPlay.value) {
//     player.pause()
//     isPlay.value = false
//   }
// })
// onShow(() => {
//   if (radioUrl.value && !isPlay.value) {
//     player.src = radioUrl.value
//     player.play()
//   }
// })
// 歌曲url
const getRadioUrl = async() => {
  try {
    const res = await radioUrlApi(curId.value)
    // console.log(res.data[0].url)
    // console.log(res.data[0])
    radioUrl.value = res.data[0].url
    playInfo.value = res.data[0]
    totalTime.value = playInfo.value.time
  } catch (error) {
    console.log(error)
  }
}
// 获取歌曲详情
const getSongDetail = async () => {
  try {
    const res = await songDetailApi(curId.value);
    console.log(res);
    radioBGInfo.value = res.songs[0].al.picUrl;
  } catch (e) {
    console.log(e);
  }
}
// 歌词
const radioLyric = async() => {
  try {
    const res = await radioLyricApi(curId.value)
    console.log(res);
    radiolyric.value = res.lrc.lyric.split('\n')
  } catch (error) {
    console.log(error) 
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

const formatTime = (t:number) =>{
  // console.log(playInfo.value.time)
  if(!t){
    return "0:00"
  }
  const minute = Math.floor( t/ 1000 / 60)
  const second = Math.floor(t / 1000 % 60)
  // console.log(`${minute}:${second}`) 
  return  `${minute}:${second}`
}
// 播放自动显示进度
const progressRate = () => {
  const rate = (curTime.value / totalTime.value)*100
  // console.log(rate +"%")
  // console.log(playwidth.value)
  playwidth.value.style.width = `${rate}%`
  playball.value.style.left = `${rate}%`
}
interface event {
  currentTarget: object,
  clientX:number
}
const move = (n:event) =>{
  const e = n
  playbar.value = e.currentTarget as HTMLElement
  const clientWidth = playbar.value.getBoundingClientRect()
  const x = e.clientX - clientWidth.left
  const percent = (x/clientWidth.width) * 100
  playwidth.value.style.width = `${percent}%`
  playball.value.style.left = `${percent}%`
  curTime.value = Math.floor(totalTime.value * percent / 100)
  player.seek(curTime.value / 1000)
}
// 点击进度条
const mousedown = (e:MouseEvent) => {
  isMove.value = true
  console.log("isMove状态1:", isMove.value)
  console.log(e)
  move(e)
}
const mousemove = (e:MouseEvent) => {
  console.log("111")
  console.log("isMove状态2:", isMove.value)
  e.preventDefault() 
  if(isMove.value){
    console.log("222")
    move(e)
  }
}
const mouseup = () => {
  isMove.value = false
}
const mouseleave = () => {
  isMove.value = false
}
// 歌词关闭
const changeshow = () =>{
  showLyric.value = false
}
// 获取播放页面评论
const getPlayerComment = async() =>{
  try {
    console.log(curId.value)
    const res = await playerCommentApi(curId.value)
    console.log(res.comments)
    console.log(res.hotComments)
    commentList.value = res.comments
    hotComments.value = res.hotComments
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
 <view class="radio" :style="{ backgroundImage: `url(${radioBGInfo})` }" @click="showRemark = false">
    <view class="mianPlay">
      <view class="diskBox" @click="showLyric = true" v-if="showLyric === false"><disk :bg="radioBGInfo" :isPlay="isPlay" ></disk></view>
      <view class="lyricBox"><lyric v-if="showLyric" :radiolyric="radiolyric" :curTime="curTime" @changeShow="changeshow" :showLyric="showLyric" :player="player"></lyric></view>
    </view>
    <view class="playArea">
      <view class="like-remark">
        <view class="like">
          <svg t="1764905108412" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2454" width="40" height="40"><path d="M523.733333 841.024l33.173334-32.576 99.690666-97.813333c70.976-69.632 120.32-117.973333 138.709334-135.893334 59.008-57.514667 93.248-121.28 99.626666-184.234666 6.250667-61.44-15.488-119.744-61.589333-164.672-44.992-43.84-98.88-61.909333-157.034667-52.906667-49.365333 7.616-101.034667 34.624-150.016 78.848a21.333333 21.333333 0 0 1-28.586666 0c-48.981333-44.224-100.650667-71.232-150.016-78.869333-58.154667-8.96-112.042667 9.088-157.034667 52.928-46.101333 44.928-67.84 103.210667-61.610667 164.693333 6.4 62.933333 40.64 126.72 99.648 184.213333a100207.573333 100207.573333 0 0 1 145.92 142.826667l24.256 23.765333L512 852.522667l11.733333-11.498667z m-11.733333 11.52l-1.493333 1.429333A2.133333 2.133333 0 0 1 512 853.333333c0.512 0 1.045333 0.213333 1.493333 0.64l-1.493333-1.450666z m157.781333-721.792c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z" fill="#ffffff" p-id="2455"></path></svg>
        </view>
        <view class="remark">
          <svg t="1764905397873" @click.stop="showRemark = true" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3545" width="40" height="40"><path d="M853.333333 768c35.413333 0 64-20.650667 64-55.978667V170.581333A63.978667 63.978667 0 0 0 853.333333 106.666667H170.666667C135.253333 106.666667 106.666667 135.253333 106.666667 170.581333v541.44C106.666667 747.285333 135.338667 768 170.666667 768h201.173333l110.016 117.44a42.752 42.752 0 0 0 60.586667 0.042667L651.904 768H853.333333z m-219.029333-42.666667h-6.250667l-115.797333 129.962667c-0.106667 0.106667-116.010667-129.962667-116.010667-129.962667H170.666667c-11.776 0-21.333333-1.621333-21.333334-13.312V170.581333A21.205333 21.205333 0 0 1 170.666667 149.333333h682.666666c11.776 0 21.333333 9.536 21.333334 21.248v541.44c0 11.754667-9.472 13.312-21.333334 13.312H634.304zM341.333333 490.666667a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z" fill="#ffffff" p-id="3546"></path></svg>
          <comment 
          v-if="showRemark"
          :commentList="commentList"
          :hotComments="hotComments"
          >
          </comment>
        </view>
        
      </view>
    <view>
    <view class="playInfo">
      <span>{{ formatTime(curTime) }}</span>
      <div class="playBar"
      ref="playbar"
      @mousedown = "mousedown"
      @mousemove = "mousemove"
      @mouseup = "mouseup"
      @mouseleave = "mouseleave"
      >
          <div class="playBall" ref="playball"></div>
          <div class="playWidth" ref="playwidth"></div>
        </div>
        <span class="totalTime">{{ formatTime(totalTime)}}</span>
      </view>
      <bottomNav :isPlay="isPlay" @ifPlay="ifPlay"></bottomNav>
    </view>
  </view>
</view>
</template>

<style lang="scss" scoped>
body,html{
  height: 100%;
  overflow: hidden;
}
.radio{
  width:100%;
  height:100vh;
  position: relative;
   &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: inherit;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(20rpx);
  }
}
.lyricBox{
  position: relative;
  z-index: 100;
}
// :deep(disk) {
//   z-index: 150; 
// }
.playArea{
  position: absolute;
  left: 0;
  width: 100%;
}
.playInfo{
  display:flex;
  align-items: center;
  width:100vw;
  height:80rpx;
  padding:0 20rpx;
  // background: pink;
  .playBar{
    flex: 1;
    height:6rpx;
    background: #ffffff;
    border-radius: 2rpx;
    margin: 0 16rpx;
    position: relative;
  }
  .playBall{
    width:20rpx;
    height:20rpx;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
    top:-6rpx;
    left:-10rpx;
  }
  .playWidth{
    height:6rpx;
    width:0;
    background: #10AEFF;
    position: absolute;
    top:0;
    left:0;
  }
  span{
    color:#ffffff;
    font-size: 28rpx;
    margin-left: 20rpx;
  }
}
.like-remark{
  display: flex;
  justify-content: center;
  .like{
    margin-right: 80rpx;
    z-index: 999;
  }
  .remark{
    z-index: 999;
  }
}
</style>