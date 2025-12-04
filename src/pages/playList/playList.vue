<script setup lang="ts">
import { getCommentApi, getPLDetailApi } from '@/services';
import { ref } from 'vue';
import type { PLDetail, Playlist, User } from '@/services/type';
import SongList from './components/songList.vue';
import Comment from '@/components/comment.vue';
import { onLoad } from '@dcloudio/uni-app';


const playList = ref<Playlist | null>(null);
const show = ref(false);
const commentList = ref([]);
const hotComments = ref([]);


const curId = ref<number>()
interface Params {
  // id: number
  id?: number
}

onLoad(async (query?: Params) => {
  console.log(query?.id); //打印出上个页面传递的参数。
  curId.value = query?.id!
  
  getPLDetail(curId.value);
})

const getPLDetail = async (id: number) => {
  try {
    console.log(curId.value)
    const res = await getPLDetailApi(id);
    console.log(res);
    playList.value = res.playlist;
  } catch (e) {
    console.log(e)
  }
}


const getCommentList = async (id: number) => {
  try {
    const res = await getCommentApi(id);
    console.log(res)
    commentList.value = res.comments;
    hotComments.value = res.hotComments;
    console.log(commentList.value)
  } catch (e) {
    console.log(e)
  }
}

const goPlayer = (id: number) => {
  uni.navigateTo({
    url: `/pages/player/player?id=${id}`,
    // params: {
    //   id
    // }
  })
  console.log(id)
}

const showComment = async (commentThreadId?: string) => {
  const id = commentThreadId?.split('_').reverse()[0];
  console.log(id);
  await getCommentList(Number(id));
  show.value = true;
}



</script>

<template>
  <view class="wrap">
    <view class="content">
      <view class="header">
        <view class="bg" :style="`background-image: url(${playList?.coverImgUrl})`">
          <!-- <image :src="playList?.coverImgUrl"  /> -->
        </view>
        <!-- <image :src="playList?.coverImgUrl" alt=""/> -->
        <view class="header-content">
          <view class="info">
            <view class="img">
              <image :src="playList?.coverImgUrl" />
            </view>
            <view class="title">
              <h3>{{ playList?.name }}</h3>
              <p>
                <span class="avatar" :style="`background-image: url(${playList?.creator.avatarUrl})`"></span>
                <span class="username">
                  {{ playList?.creator.nickname }}
                </span>
              </p>
            </view>
          </view>
          <view class="desc">
            {{ playList?.description }}
          </view>
          <view class="btns">
            <view class="btn forward">
              <svg t="1764810041098" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5042" width="20" height="20">
                <path d="M965.930667 562.197333L603.626667 882.688c-30.784 29.397333-80.896 6.912-80.896-36.352v-161.450667a516.224 516.224 0 0 0-36.821334-1.386666c-165.973333 0-310.570667 77.696-386.56 192.917333-15.658667 23.530667-51.136 14.549333-54.165333-13.845333A423.722667 423.722667 0 0 1 42.666667 816.213333c0-241.706667 208.341333-441.749333 480.234666-477.034666V177.664c0-43.264 50.133333-65.749333 80.896-36.352l362.304 348.394667c20.330667 19.370667 20.330667 52.949333-0.170666 72.490666z" fill="#ffffff" p-id="5043"></path>
              </svg>
              {{ playList?.shareCount }}
            </view>
            <view class="btn comment" @click="showComment(playList?.commentThreadId)">
              <svg t="1764810253477" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6410" width="20" height="20">
                <path d="M847.36 107.52h-665.6c-69.12 0-125.44 56.32-125.44 125.44v401.92c0 69.12 56.32 125.44 125.44 125.44h38.4l15.36 181.76 158.72-181.76h453.12c69.12 0 125.44-56.32 125.44-125.44V232.96c0-69.12-56.32-125.44-125.44-125.44z m-563.2 376.32c-33.28 0-61.44-28.16-61.44-61.44 0-33.28 28.16-61.44 61.44-61.44 33.28 0 61.44 28.16 61.44 61.44 2.56 33.28-25.6 61.44-61.44 61.44z m230.4 0c-33.28 0-61.44-28.16-61.44-61.44 0-33.28 28.16-61.44 61.44-61.44 33.28 0 61.44 28.16 61.44 61.44 0 33.28-28.16 61.44-61.44 61.44z m227.84 0c-33.28 0-61.44-28.16-61.44-61.44 0-33.28 28.16-61.44 61.44-61.44 33.28 0 61.44 28.16 61.44 61.44 2.56 33.28-25.6 61.44-61.44 61.44z" fill="#ffffff" p-id="6411"></path>
              </svg>
              {{ playList?.commentCount }}
            </view>
            <view class="btn favorite">
              <svg t="1764810423066" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14468" id="mx_n_1764810423067" width="20" height="20">
                <path d="M887.466667 216.177778H505.173333l-104.675555-111.502222H143.36c-50.062222 0-93.297778 40.96-93.297778 93.297777v628.053334c0 50.062222 40.96 93.297778 93.297778 93.297777H887.466667c50.062222 0 93.297778-40.96 93.297777-93.297777V309.475556c0-52.337778-43.235556-93.297778-93.297777-93.297778z m-193.422223 402.773333h-143.36v143.36c0 18.204444-15.928889 34.133333-34.133333 34.133333s-34.133333-15.928889-34.133333-34.133333v-143.36h-143.36c-18.204444 0-34.133333-15.928889-34.133334-34.133333s15.928889-34.133333 34.133334-34.133334h143.36v-143.36c0-18.204444 15.928889-34.133333 34.133333-34.133333s34.133333 15.928889 34.133333 34.133333v143.36h143.36c18.204444 0 34.133333 15.928889 34.133334 34.133334s-15.928889 34.133333-34.133334 34.133333z" fill="#ffffff" p-id="14469"></path>
              </svg>
              {{ playList?.subscribedCount }}
            </view>
          </view>
        </view>
      </view>
      <view class="list">
        <view class="allPlay">
          <svg t="1764812358296" class="icon" viewBox="0 0 1085 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16678" id="mx_n_1764812358296" width="26" height="26">
            <path d="M546.904228 18.10573c-277.76918 0-502.94529 225.17611-502.94529 502.94529 0 277.77164 225.17488 502.94775 502.94529 502.94775 277.76795 0 502.94529-225.17611 502.94529-502.94775C1049.849518 243.28307 824.672178 18.10573 546.904228 18.10573L546.904228 18.10573zM546.904228 973.701659c-249.992631 0-452.651868-202.659237-452.651868-452.651868 0-249.990172 202.659237-452.649408 452.651868-452.649408s452.650638 202.659237 452.650638 452.649408C999.554866 771.042422 796.896859 973.701659 546.904228 973.701659L546.904228 973.701659zM775.203924 485.406478c-78.267962-53.25591-220.1919-132.967608-301.004232-182.358388-33.132146-20.893592-60.993549-12.502952-63.667043 24.399633-1.938099 98.840588 0 289.550264 0 390.101445 1.681079 37.462125 34.709926 42.403293 63.37559 27.362121 80.72133-48.906255 219.456505-132.95777 300.588574-182.112436C773.968017 562.476656 836.097862 528.305364 775.203924 485.406478L775.203924 485.406478z" fill="#c84341" p-id="16679"></path>
          </svg>
          <span>播放全部({{ playList?.trackCount }})</span>
          <view class="border-bottom"></view>
        </view>
        <SongList
          :songList="playList?.tracks"
          @goPlayer="goPlayer"
        />
      </view>
      
    </view>
  </view>
  <Comment
    v-if="show"
    @click="show = false"
    :commentList="commentList"
    :hotComments="hotComments"
  />
</template>

<style lang="scss" scoped>



.header{
  width: 100%;
  position: relative;
  padding: 30rpx;
  overflow: hidden;
  color: #fff;  
  .bg{
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(20px);
    width: 100%;
    height: 100%;
    // background: #ccc;
    background-size: cover;
    background-repeat: no-repeat;
    transform: scale(1.5);
    z-index: 1;
  }
}

.header-content{
  position: relative;
  z-index: 3;
  .img{
    image{
      width: 240rpx;
      height: 240rpx;
      border-radius: 20rpx;
    }
  }
  .info{
    display: flex;
  }
  .desc{
    font-size: 12px;
    margin: 20rpx 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .btns{
    display: flex;
    .btn{
      flex: 1;
      margin: 0 15rpx;
      height: 70rpx;
      border-radius: 40rpx;
      background: rgba($color: #fff, $alpha: .2);
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  }
}

.title{
  flex: 1;
  overflow: hidden;
  margin-left: 30rpx;
  h3{
    font-weight: 700;
    font-size: 16px;
  }

  p{
    display: flex;
    align-items: center;
    margin-top: 20rpx;
  }
  .avatar{
    height: 52rpx;
    width: 50rpx;
    border-radius: 50%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .username{
    margin-left: 16rpx;
    flex: 1;
    overflow: hidden;
    font-size: 12px;
  }
}

image{
  vertical-align: middle;
} 

.list{
  .allPlay{
    position: relative;
    padding: 12px 15px;
    display: flex;
    // flex: 1;
    align-items: center;
    
    span{
      font-size: 14px;
      padding-left: 20rpx;
    }
  }
  .border-bottom{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 1px;
    transform: scaleY(.5);
    background-color: #e5e5e5;
    z-index: 1;
  }
}


</style>