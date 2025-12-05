
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


// 用户类型
export type User = {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  expertTags: null;
  experts: null;
  djStatus: number;
  vipType: number;
  remarkName: null;
  authenticationTypes: number;
  avatarDetail: null | {
    userType: number;
    identityLevel: number;
    identityIconUrl: string;
  };
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  anchor: boolean;
  avatarImgId_str: string;
};

// 歌曲类型
export type Song = {
  id: number;
  name: string;
  ar: Ava[];
  al: {
    id: number;
    name: string;
    pic: number;
    picUrl: string;
  }
}

// 作者
export type Ava = {
  id: number;
  name: string
}

// 歌单类型
export type Playlist = {
  id: number;
  name: string;
  coverImgId: number;
  coverImgUrl: string;
  coverImgId_str: string;
  adType: number;
  userId: number;
  createTime: number;
  creator: Creator;
  status: number;
  opRecommend: boolean;
  highQuality: boolean;
  newImported: boolean;
  updateTime: number;
  trackCount: number;
  specialType: number;
  privacy: number;
  trackUpdateTime: number;
  commentThreadId: string;
  playCount: number;
  trackNumberUpdateTime: number;
  subscribedCount: number;
  cloudTrackCount: number;
  ordered: boolean;
  description: string;
  tags: string[];
  updateFrequency: null;
  backgroundCoverId: number;
  backgroundCoverUrl: null;
  titleImage: number;
  titleImageUrl: null;
  detailPageTitle: null;
  englishTitle: null;
  officialPlaylistType: null;
  copied: boolean;
  relateResType: null;
  coverStatus: number;
  subscribers: User[];
  shareCount: number;
  commentCount: number;
  tracks: Song[];
};

// 日推内容类型
export type DailySongs = {
  dailySongs: Song[]
}

// 歌单详情类型
export type PLDetail = {
  code: number;
  relatedVideos: object;
  playlist: Playlist;
  privileges: Array<object>;
  fromUserCount?: number;
  fromUsers?: null;
  resEntrance?: null;
  sharedPrivilege?: null;
  songFromUsers?: null;
  urls?: null;
  data: DailySongs;
}

// 歌单创建者类型
export type Creator = {
  nickname: string;
  avatarUrl: string
}

// 评论类型
export type Comment = {
  content: string;
  user: User;
  likedCount: number;
  liked: boolean;
  commentId: number
}
export type officialChart = {
  code:number,
  list:[]
}