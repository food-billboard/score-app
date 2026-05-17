import qs from 'qs';
import { debounce, get } from 'lodash'
import Taro from '@tarojs/taro';
import { formatQuery } from './tool'
import { getToken } from './mockLogin';

interface RequestOptions extends Partial<Taro.request.Option<any, any>>{
  mis?: boolean
  origin?: boolean 
  params?: object
}

// 未登录的多次触发处理
const dispatchLogin = debounce(function(err: any){
  Taro.showToast({
    title: err.errMsg || '未登录请先登录'
  })
}, 1000, {'leading': true, 'trailing': false} )

// 处理报错
export const misManage = (error: any) => {
  if( error.messageType === 'body' ){
    const err = error.err || {}

    // 未登录处理
    if( error.errorType === 'system' && err.code === '401' ){
      return dispatchLogin(err);
    }
    Taro.showToast({
      title: err.errMsg || '网络错误'
    })
    return
  }
  const { response } = error;
  if( response && response.status === 401 ){
    return dispatchLogin(error);
  }
  if (response && response.status) {
    // const errorText = codeMessage[response.status] || response.statusText;
    const { status, url, data } = response;
    // Taro.showToast({
    //   title: `请求错误 ${status}: ${url}`
    // });
    Taro.showToast({
      title: get(data, 'res.errMsg') || `请求错误 ${status}: ${url}`
    })
  } else if (!response) {
    Taro.showToast({
      title: '您的网络发生异常，无法连接服务器'
    });
  }
}

function joinUrl(path: string, host: string, query: object) {
  let queryString;
  let ret;
  if (query) {
    queryString = qs.stringify(query);
  }
  if (/^https?:\/\//.test(path)) {
    ret = path;
  } else {
    ret = host + path;
  }
  if (queryString) {
    ret += '?' + queryString;
  }
  return ret;
}


export const getPrefix = () => {
  if(process.env.NODE_ENV === 'development') {
    // return process.env.TARO_APP_REQUEST_API as string
    return process.env.TARO_APP_REQUEST_API_PEANUT as string
  }
  return new URL(location.href).origin
}

const request = async <ResBody>(url: string, setting: RequestOptions = {} as RequestOptions)=>{

  // 过滤URL参数
  const { params, mis=true, origin, header={}, ...options } = setting

  let body: any
  let error: any

  const prefix = getPrefix()

  try{
    body = await Taro.request({
      header: {
        ...header,
        ...getToken(true) || {},
      },
      ...options,
      // ...(params ? { data: formatQuery(params) } : {}),
      url: joinUrl(url, prefix, params || {}),
    });
  } catch(err) {
    console.log(err, url)
    error = err
  }

  // 报错分为两种，
  // 系统错误，由 httpClient 拦截到的错误 如，4xx，5xx
  if( error ){
    error.errorType = 'system';
    error.messageType = 'response';
    if(mis) misManage(error);
    // throw error
    return {}
  }

  // 业务错误，客户端返回的 statusCode === 200 但是response.body 中的success 返回为 false的错误
  if( body && body.success === false ){
    error = body;
    error.errorType = 'logic';
    error.messageType = 'body';
  }

  // 返回真正的response body res 内容
  if( !error ) {
    if(origin) return body 
    return (body?.data?.res?.data || {}) as ResBody
  }
  error.mis = mis
  if(mis) misManage(error);
  throw error
};

export default request