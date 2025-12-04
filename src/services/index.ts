import request from "./request";
import type {
  PLDetail
} from './type'




// 获取歌单详情
export const getPLDetailApi = (id: number) => {
  return request<PLDetail>({
    url: 'https://music.zyxcl.xyz/playlist/detail',
    id
  })
}

// 获取歌单评论详情
export const getCommentApi = (id: number) => {
  return request({
    url: 'https://music.zyxcl.xyz/comment/playlist',
    id
  })
}