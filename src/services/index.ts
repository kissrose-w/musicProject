import { request } from "./request1";
import axios from "axios";

//主页接口
export const homepageApi = () =>{
  return request({
    url:"https://music.zyxcl.xyz/homepage/block/page"
  })}

// 搜索接口
type searchParams = {
  keywords: string | number
}
const instance = axios.create({
  baseURL: 'https://music.zyxcl.xyz/',  // 设置默认路径
  timeout: 10000,  // 可选：设置超时时间
});
export const searchHotInfo = () => {
  return instance.get('/search/hot/detail')
}
export const searchResultInfo = ({keywords}: searchParams) => {
  return instance.get(`/search/suggest?keywords=${keywords}&type=mobile`)
}