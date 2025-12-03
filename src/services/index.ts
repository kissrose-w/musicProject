import request from "./request";
import type {
  PLDetail
} from './type'




// 获取歌单详情
export const getPLDetailApi = (id: string) => {
  return request<PLDetail>({
    url: 'https://music.zyxcl.xyz/playlist/detail',
    id
  })
}