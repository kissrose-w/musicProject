<template>
  <view class="header">
    <view @click="showDrawer" class="menu-btn">
      <uni-icons type="bars" :size="30"  ></uni-icons>
    </view>
    <uni-drawer ref="showLeft" mode="left" :mask-click="true" >
      <scroll-view style="height: 100%;" scroll-y="true">
        <view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
      </scroll-view>
    </uni-drawer>
    <view class="inp">
      <uni-icons type="search" size="20" color="gray"></uni-icons>
      <input type="text" placeholder="搜索">
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showLeft = ref()
const showDrawer=() =>{
	showLeft.value.open();
}



</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #eee;
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


</style>
