import { request } from "./request1";

//主页接口
export const homepageApi = () =>{
  return request({
    url:"https://music.zyxcl.xyz/homepage/block/page"
  })
}