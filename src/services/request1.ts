
interface RequestParams{
  url: string,
  data?: object,
  header?: object,
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT'
}

export const request = <T =any>({
  url,
  data = {},
  header = {},
  method = 'GET'
}: RequestParams) =>{
  return new Promise<T>((resolve,reject)=>{
    uni.request({
      url, 
      data, 
      header,
      method,
      timeout: 5000,
      success: (res) => {
        resolve(res.data as T)
      },
      fail: e => {
        reject(e)
      }
    });
  })
} 