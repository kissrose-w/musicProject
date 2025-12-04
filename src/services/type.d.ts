


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
  liked: bollean;
  commentId: number
}