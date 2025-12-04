
// 热门搜索参数
export interface HotItem {
  searchWord: string
  score: number
  iconType: number
  source: number
  iconUrl?: string
  content: string
  url: string
  alg?: string
}

// 搜索内容参数
export interface conItem {
  alg?: string
  feature?: string
  keyword: string
  lastKeyword?: string
  type?: number
}

// 搜索列表歌曲信息
export interface song {
  id: number
  name: string
  artists: Array<{ id: number; name: string }>
  album: { id: number; name: string }
  duration: number
  [key: string]: any
}

// API 响应类型
export interface HotSearchResponse {
  code: number
  data: HotItem[]
  message: string
}

export interface SearchSuggestResponse {
  code: number
  result: {
    allMatch: conItem[]
  }
}

export interface SearchListResponse {
  code: number
  result: {
    songs: song[]
    songCount: number
  }
}