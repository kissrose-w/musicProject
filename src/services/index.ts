import axios from "axios"
import type { HotSearchResponse, SearchSuggestResponse, SearchListResponse } from './type'

type searchParams = {
  keywords: string | number
}

const instance = axios.create({
  baseURL: 'https://music.zyxcl.xyz/',  // 设置默认路径
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
export const searchListInfo = ({keywords}: searchParams) => {
  return instance.get<SearchListResponse>(`/search`, { params: { keywords } })
} 