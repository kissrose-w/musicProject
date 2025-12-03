interface requestParams{
  url:string,
  method?:"POST"| "GET"|"PUT"|"DELETE",
  data?:object,
  header?:object
}

const request = <T = any>({
  url,
  method = "GET",
  data = {},
  header = {}
}:requestParams) => {
    return new Promise<T>((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      header,
      timeout : 5000,
      success:((res)=>{
        resolve(res.data as T)
      }),
      fail:((e)=>{
        reject(e)
      })
    })
  })
}

export default request 