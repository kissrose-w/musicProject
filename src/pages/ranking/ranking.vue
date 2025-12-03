<script setup lang="ts">
import { ref } from "vue"
import { officialChartApi } from "../../services/index"
import type { officialChart } from "@/services/type"

const officialList = ref<officialChart | any[]>([])
const getOfficialChart = async()=>{
  try {
    const res = await officialChartApi()
    console.log("官方榜",res.list)
    officialList.value = res.list
  } catch (error) {
    console.log(error.message)
  }
}
getOfficialChart()

 const toSongList = (e:any)=>{
  const { id } = e.currentTarget.dataset
  console.log(id)
  uni.navigateTo({
    url:`/pages/player/player?id=${id}`
  })
}
</script>

<template>
  <view class="container">
  <view class="officialChart">
    <view class="officialTit">官方榜</view>
    <view class="official-item" 
    v-for="item in officialList.slice(0,4)" 
    :key="item.id" :data-id="item.id"
    @click="toSongList">
      <view class="offItemName">
        <img :src=" item.coverImgUrl " alt="">
        <view class="chartInfo">
          <view class="chartName">{{ item.name }}</view>
          <view class="chartId">{{ item.playCount }}</view>
        </view>
        <view class="updateTime">{{ item.updateFrequency }}</view>
      </view>
      <view class="offItemList">
        <view class="offSongName" v-for="(v,index) in item.tracks">
          {{ index + 1 }}.{{ v.first }}
          <text class="offSingerName">
            -{{ v.second }}
          </text>
        </view>
      </view>
    </view>
  </view>
  <view class="otherCharts">
    <view class="otherTit">其他榜单</view>
    <view class="otherContent">
      <view class="otherConItem" 
      v-for="item in officialList.slice(7,62)" 
      :key="item.id"
      :data-id="item.id"
      @click="toSongList">
        <img :src="item.coverImgUrl" alt="">
      </view>
    </view>
  </view>
  </view>
  
</template>

<style lang="scss" scoped>
.container{
  padding:15px;
  overflow: auto;
  background: #ffffff;
}
.officialTit{
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  &::before{
    content: '';
    display: inline-block;
    width:3px;
    height:14px;
    background: #C20C0C;
    margin-right: 3px;
  }
}
.official-item{
  height:130px;
  padding:10px;
  border: 1px solid #EBEEF5;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 3px 1px;
  background: #ffffff;
  margin-bottom: 15px;
}
.offItemName{
  height:55px;
  display:flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  img{
    width:40px;
    height:40px;
    margin-right: 8px;
  }
}
.chartInfo{
  flex: 1;
  .chartName{
    font-size: 15px;
    color:#3A3A3A;
  }
  .chartId{
    font-size: 12px;
    color:#909399;
  }
}
.updateTime{
  font-size: 12px;
  color: #909399;
}
.offItemList{
  padding:10px;
  .offSongName{
    font-size: 12px;
    color:#6A6A6A;
    font-weight: 500;
    height:24px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .offSingerName{
    font-weight: normal;
    font-size: 10px;
  }
}
.otherTit{
  @extend .officialTit;
}
.otherContent{
  display: flex;
  flex-wrap: wrap;
  .otherConItem{
    width:calc((100% - 30px)/3);
    margin-right: 15px;
    &:nth-child(3n){
      margin-right: 0;
    }
    img{
      width:100%;
    }
  }
}
</style>