
interface RequestParams {
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  id?: string
}


const request = <T = any>({
  url,
  id,
  method = 'GET'
}: RequestParams) => {

  const endUrl = id ? `${url}?id=${id}` : url

  return new Promise((resolve, reject) => {
    uni.request({
      url: endUrl,
      method,
      id,
      timeout: 5000,
      success: (res) => {
        resolve(res.data as T);
      },
      fail: e => {
        reject(e);
      }
    })
  })
}

export default request;