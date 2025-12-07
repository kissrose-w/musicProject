<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
const props = defineProps(["radiolyric","curTime","showLyric","player"])
const emits = defineEmits(["changeTime"])
const lines = ref([])
const line = ref([])
const newTime = ref(0)
const container = ref(null)
const currentLine = ref<Record<number, any>>({})
const curIndex = ref(null)

const formatLyric = () => {
  lines.value=props.radiolyric
  return line.value =lines.value.map(item =>{
    let [time, text] = item.split("]")
    return {
      time,
      text
    }
  })
}
formatLyric()

const formatTime = () => {
  line.value = line.value.map(item => {
    const minutes = parseInt(item.time.substring(1, 3))
    const seconds = parseFloat(item.time.substring(4, 9))
    const totalSeconds = (minutes * 60 + seconds) *1000
    return {
      ...item,
      time: totalSeconds
    }
  })
}
formatTime()

currentLine.value = new Array(line.value.length).fill(null)
const getCurLine = computed(() => {
  if (!line.value.length) return null
  const curLineI = line.value.findIndex((item, index) => {
    return props.curTime >= item?.time && props.curTime < line.value[index + 1]?.time
  })
  return curLineI
})
// 获取循环渲染的ref
const setCur = (el: any, index: number) => {
  if (el) {
    currentLine.value[index] = el
  }
}
onMounted(() => {
  // await nextTick(() => {
  // console.log(getCurLine.value)
  // console.log(container.value?.$el.clientHeight)
  // console.log(currentLine.value[getCurLine.value]?.$el.offsetTop)
    scrollTo(getCurLine.value)
  // })
})
watch([() => newTime.value,() => props.curTime], ()=>{
//  console.log(getCurLine.value)
  if(newTime.value){
    props.player.seek(newTime.value/1000)
    newTime.value = 0
    return
  }
  scrollTo(getCurLine.value)
})

const scrollTo = (i:number) => {
  curIndex.value = i
  if(curIndex.value === -1) return
  const height = container.value?.$el.clientHeight
  const top = currentLine.value[i]?.$el.offsetTop
  const curHeight = currentLine.value[i]?.$el.clientHeight
  const resTop = top - (height / 2) + (curHeight / 2)
  container.value.$el.scrollTo({
    top: resTop,
    behavior: 'smooth'
  })
  if(i !==getCurLine.value ){
    newTime.value = line.value[i].time
    emits("changeTime", newTime.value)
  } 
}

</script>

<template>
<view class="lyricWrap" ref="container" @click="emits('changeShow')">
<view class="eachLine" 
v-for="(item, index) in line" 
:key="item.text" 
:ref="(el:any) => setCur(el, index)"
:class="{active : curIndex === index}"
@click.stop="scrollTo(index)"
>{{ item.text }}</view>
</view>
</template>

<style lang="scss" scoped>
.lyricWrap{
  height:62vh;
  font-size: 16px;
  color:#ABA5A1;
  overflow: auto;
  // padding:40rpx;
  text-align: center;
  margin-bottom: 140rpx;
  scrollbar-width: none;
  .eachLine{
    line-height: 60rpx;
    width:80%;
    margin-left: 70rpx;
    &.active{
    color:#ffffff;
    transform: scale(1.3);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  }
}
</style>