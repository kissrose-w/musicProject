import request from "./request"
import type { officialChart } from "./type"

// 'https://music.zyxcl.xyz/toplist/detail'

export const officialChartApi = () => {
    return request<officialChart>({
      url:"https://music.zyxcl.xyz/toplist/detail"
    })
}

export const recommend =()=>{
  return request({
    url:"https://music.zyxcl.xyz/homepage/block/page"
  })
}

export const mineApi = ()=>{
  return request({
    url:"https://music.zyxcl.xyz/user/playlist?uid=9862787213"
  })
}