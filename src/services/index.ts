
import axios from "axios"
import type { HotSearchResponse, SearchSuggestResponse, SearchListResponse, PLDetail, officialChart, Song, SongDeatil } from './type'
import request from "./request";


//主页接口
export const homepageApi = () =>{
  return request({
    url:"https://music.zyxcl.xyz/homepage/block/page"
  })}

// 搜索接口
type searchParams = {
  keywords: string | number,
  limit?: number
}
const instance = axios.create({
  baseURL: '/api/',  // 设置默认路径
  timeout: 10000,  // 可选：设置超时时间
});
// 热门搜索
export const searchHotInfo = () => {
  return instance.get<HotSearchResponse>('/search/hot/detail')
}
// 搜索结果
export const searchResultInfo = ({keywords}: searchParams) => {
  return instance.get<SearchSuggestResponse>(`/search/suggest?keywords=${keywords}&type=mobile`)
}
// 搜索列表
export const searchListInfo = ({keywords, limit = 30}: searchParams) => {
  return instance.get<SearchListResponse>(`/search`, { params: { keywords, limit } })
}




// 获取歌单详情
export const getPLDetailApi = (id?: number) => {
  let url = '';
  if(id) {
    url = `/api/playlist/detail?id=${id}`;
  } else {
    url = '/api/recommend/songs'
  };
  return request<PLDetail>({
    url,
  })
}

// 获取歌单评论详情
export const getCommentApi = (id: number) => {
  return request({
    url: '/api/comment/playlist',
    id
  })
}


// 获取官方榜
export const officialChartApi = () => {
    return request<officialChart>({
      url:"/api/toplist/detail"
    })
}
// 获取我的
export const mineApi = ()=>{
  return request({
    url:"/api/user/playlist?uid=9862787213"
  })
}

// 获取播放音乐url
export const radioUrlApi = (id:number | string) =>{
  return request({
    url:`/api/song/url?id=${id}`
  })
}

// 获取音乐详情
export const songDetailApi = (id: number | string) => {
  return request<SongDeatil>({
    url: `/api/song/detail?ids=${id}`
  })
}

//手机号登录
export const telLoginApi = (phone:string ,password:string) => {
  return request({
    url:`/api/login/cellphone?phone=${phone}&password=${password}`,
    method:'POST'
  })
}

// 获取歌词
export const radioLyricApi = (id:number | string) =>{
  return request({
    url:`/api/lyric?id=${id}`,
  })
}

// 获取播放页评论
export const playerCommentApi = (id:number | string) =>{
  return request({
    url:`/api/comment/music?id=${id}`,
  })
}

//生成二维码key
export const getKeyApi = () =>{
  return request({
    url:"/api/login/qr/key"
  })
}
//获取二维码
export const getQRCodeApi = (key:string,qrimg:string) =>{
  return request({
    url:`/api/login/qr/create?key=${key}&qrimg=${qrimg}`,
  })
}

//扫码登录状态
export const getStatusApi = (key:string) => {
  return request({
    url:`/api/login/qr/check?key=${key}`
  })
} 