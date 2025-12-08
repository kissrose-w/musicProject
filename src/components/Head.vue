<template>
  <view class="header">
    <view @click="showDrawer" class="menu-btn">
      <uni-icons type="bars" :size="30"  ></uni-icons>
    </view>
    <uni-drawer class="dialog" ref="showLeft" mode="left" :mask-click="true" :width="300">
      <view class="wrap">
        <view class="dialog-header">
          <view class="userMsg" @click="goMine">
            <image src="https://p1.music.126.net/q7pUyLVm3g6uL2QQeMvSgg==/109951168645624240.jpg"/>
            <p>hhhh</p>
          </view>
          <view class="rightfn">
            <svg t="1764898456836" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5491" width="20" height="20"><path d="M512 702.836364c-104.727273 0-190.836364-86.109091-190.836364-190.836364V190.836364C321.163636 86.109091 407.272727 0 512 0s190.836364 86.109091 190.836364 190.836364V512c0 104.727273-86.109091 190.836364-190.836364 190.836364z m0-642.327273c-72.145455 0-130.327273 58.181818-130.327273 130.327273V512c0 72.145455 58.181818 130.327273 130.327273 130.327273s130.327273-58.181818 130.327273-130.327273V190.836364c0-72.145455-58.181818-130.327273-130.327273-130.327273z" p-id="5492"></path><path d="M404.945455 1024c-16.290909 0-30.254545-13.963636-30.254546-30.254545 0-16.290909 13.963636-30.254545 30.254546-30.254546h76.8V861.090909c-86.109091-6.981818-167.563636-46.545455-225.745455-111.709091-62.836364-62.836364-95.418182-148.945455-95.418182-237.381818 0-16.290909 13.963636-30.254545 30.254546-30.254545s30.254545 13.963636 30.254545 30.254545c0 160.581818 130.327273 290.909091 290.909091 290.909091S802.909091 672.581818 802.909091 512c0-16.290909 13.963636-30.254545 30.254545-30.254545s30.254545 13.963636 30.254546 30.254545c0 88.436364-32.581818 174.545455-95.418182 239.709091-60.509091 65.163636-139.636364 102.4-225.745455 111.709091v100.072727h76.8c16.290909 0 30.254545 13.963636 30.254546 30.254546 0 16.290909-13.963636 30.254545-30.254546 30.254545h-214.10909z" p-id="5493"></path></svg>
            <svg t="1764900103404" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6936" width="20" height="20"><path d="M928 544 96 544c-17.664 0-32-14.336-32-32s14.336-32 32-32l832 0c17.696 0 32 14.336 32 32S945.696 544 928 544zM832 928l-192 0c-17.696 0-32-14.304-32-32s14.304-32 32-32l192 0c17.664 0 32-14.336 32-32l0-160c0-17.696 14.304-32 32-32s32 14.304 32 32l0 160C928 884.928 884.928 928 832 928zM352 928 192 928c-52.928 0-96-43.072-96-96l0-160c0-17.696 14.336-32 32-32s32 14.304 32 32l0 160c0 17.664 14.368 32 32 32l160 0c17.664 0 32 14.304 32 32S369.664 928 352 928zM128 384c-17.664 0-32-14.336-32-32L96 192c0-52.928 43.072-96 96-96l160 0c17.664 0 32 14.336 32 32s-14.336 32-32 32L192 160C174.368 160 160 174.368 160 192l0 160C160 369.664 145.664 384 128 384zM896 384c-17.696 0-32-14.336-32-32L864 192c0-17.632-14.336-32-32-32l-192 0c-17.696 0-32-14.336-32-32s14.304-32 32-32l192 0c52.928 0 96 43.072 96 96l0 160C928 369.664 913.696 384 896 384z" fill="#272636" p-id="6937"></path></svg>
          </view>
        </view>
        <scroll-view class="dialog-con" style="height: 100%;" scroll-y="true" >
          <view class="con">
            <view class="list" v-for="item in list" :key="item.name">
              <view >{{ item.name }}</view>
            </view>
          </view>
        </scroll-view>
        <view class="footer">
            <p>设置</p>
            <p>更多</p>
        </view>
      </view>
      
    </uni-drawer>
    <view class="inp">
      <uni-icons type="search" size="20" color="gray"></uni-icons>
      <input type="text" placeholder="搜索" @click="goSearch">
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showLeft = ref()
const showDrawer = () => {
  showLeft.value.open();
}

const goSearch = () => {
  uni.navigateTo({
    url: '/pages/search/search'
  })
}
type List = {
    name:string,
    path?:string
  }[]

const list:List = [
  {
    name:"我的消息"
  },
  {
    name: "我的云贝"
  },
  {
    name: "装扮中心"
  },
  {
    name: "创作者中心"
  },
  {
    name: "最近播放"
  },
  {
    name: "定时关闭"
  },
  {
    name: "商城"
  },
  {
    name: "云村有票"
  },
  {
    name: "云推歌"
  },
  {
    name: "我的客服"
  }
]

const goMine = () =>{
  uni.switchTab({
    url: '/pages/mine/mine'
  });
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  display: flex;
  align-items: center;
  height: 70px;
  // border-bottom: 1px solid #eee;
}

.menu-btn{
  padding-left: 15px;
}
.inp{
  flex: 1;
  background: #eee;
  margin: 0 10px;
  padding: 0 10px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  >input{
    width: 100%;
    margin-left: 10px;
    height: 100%;
  }
}
.dialog{
  display: flex;
  width: 100%;
  height: 100vh;
  // padding: 20rpx;
  .wrap{
    height: 100%;
    background: #F3F7FA;
    padding: 40rpx;
  }
}
.dialog-header{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 15rpx;
  border-bottom: 1px solid #eee;
  font-family: "楷体";
  // background: #fff;
  .userMsg{
    display: flex;
    align-items: center;
    image{
      width: 70rpx;
      height: 70rpx;
      border-radius: 50%;
      margin-right: 15rpx;
    }
  }
  .icon{
    margin-right: 20rpx;
  }
}
.con{
  flex: 1;
  background: #fff;
  border-radius: 15rpx;
  height: 1020rpx;
  padding: 10rpx 20rpx;
  overflow: auto;
  &::-webkit-scrollbar{
    display: none;
  }
  .list{
    height: 55px;
    margin: 0 10px;
    line-height: 55px;
    // border-bottom: 1px solid #eee;
    >view{
      font-size: 15px;
      font-family: "楷体";
    }
    &:nth-child(4){
      border-bottom: 1px solid #ddd;
    }
    &:nth-child(6){
      border-bottom: 1px solid #ddd;
    }
  }
}
.footer{
  position: fixed;
  bottom: 10rpx;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40rpx;
  width: 600rpx;
  height: 60px;
  font-size: 14px;
  >p{
    border: 1px solid #eee;
    border-radius: 10rpx;
    width: 100%;
    // margin-right: 5px;
    text-align: center;
    padding: 15rpx;
    background: #fff;
    &:first-child{
      margin-right: 40rpx;
    }
  }
}


</style>
