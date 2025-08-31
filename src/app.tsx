import { Emitter } from './utils/routeListener'
import { getUserInfo } from './services/base'
import { setUserInfo } from './utils/constants'


export const onRouteChange = (location: any, action: any) => {
  if(location.location.pathname !== '/') {
    getUserInfo()
    .then(data => {
      setUserInfo(data)
    })
  }
  Emitter.emit('route-change', location)
  // console.log('全局路由变化', location, action); // action 为 PUSH, REPLACE, POP 等
};