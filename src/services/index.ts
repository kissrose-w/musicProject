import request from "./request"
import type { officialChart } from "./type"


export const officialChartApi = () => {
    return request<officialChart>({
      url:"https://music.zyxcl.xyz/toplist/detail"
    })
}

export const mineApi = ()=>{
  return request({
    url:"https://music.zyxcl.xyz/user/playlist?uid=9862787213"
  })
}

export const radioApi = () =>{
  return request({
    url:"https://music.zyxcl.xyz/playlist/detail?id=757439549"
  })
}

export const radioUrlApi = () =>{
  return request({
    url:"https://music.zyxcl.xyz/song/url?id=515453363"
  })
}