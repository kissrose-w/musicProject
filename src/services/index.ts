import request from "./request"
import type { officialChart } from "./type"

// 'https://music.zyxcl.xyz/toplist/detail'

export const officialChartApi = () => {
    return request<officialChart>({
      url:"https://music.zyxcl.xyz/toplist/detail"
    })
}