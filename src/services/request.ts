
interface RequestParams {
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  id?: number,
  data?: object,
  header?: object,
}


const request = <T = any>({
  url,
  data = {},
  header = {},
  id,
  method = 'GET'
}: RequestParams): Promise<T> => {

  let endUrl = '';
  if(id)  endUrl = id ? `${url}?id=${id}` : url
  else endUrl = url
  return new Promise<T>((resolve, reject) => {
    uni.request({
      url: endUrl,
      method,
      data, 
      header,
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