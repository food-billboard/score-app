
import qs from 'querystring'

// 处理query 传参的时候导致的空字符串查询问题（后端不愿意给处理）
export const formatQuery = (query: any ={})=>{
  const ret: any = {}
  Object.keys(query).forEach((key) => {
    if( query[key] !== null && query[key] !== undefined && query[key]!=='' ){
      ret[key] = query[key]
    }
  })
  return ret;
}

export function getQuery() {
  const { search } = new URL(location.href)
  return qs.parse(search.replace('?', ''))
}

export function jump(path: string, method: 'push' | 'replace') {

}

// 判断是用户端还是家长端
export function isUserSide() {
  return location.href.includes('user_side=1')
}
