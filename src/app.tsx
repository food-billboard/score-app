import React, { useEffect } from 'react';
import Taro, { useDidShow, useDidHide, useRouter } from '@tarojs/taro';
import { useUpdate } from 'ahooks'
import { ArrowLeft } from '@nutui/icons-react-taro';
// 全局样式
import './app.less';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import { View, Image } from '@tarojs/components';
import { getUserInfo as getUserInfoData, fetchUserInfo, Event } from './utils/constants';
import ToastDom from './components/Toast';
import DialogDom, { Dialog } from './components/Dialog';
import Star from '@/components/Star';
import '../public/iconfont/iconfont.css'


function App(props: any) {
  const { username, score, avatar } = getUserInfoData();

  const update = useUpdate()

  const router = useRouter()
  const { path } = router

  // 可以使用所有的 React Hooks
  useEffect(() => {
    fetchUserInfo(true)
  }, []);

  useEffect(() => {
    const listener = () => {
      update()
    }
    Event.addListener('update', listener)
  }, [])

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return (
    <ConfigProvider
      theme={{
        nutuiColorPrimary: '#00d86a',
        nutuiColorPrimaryStop1: '#00d86a',
        nutuiColorPrimaryStop2: '#00d86a',
      }}
    >
      <View className="score-app-main">
        <View className={'score-app-main-header'}>
          <View
            style={{ width: '33%' }}
            className={'score-app-main-header-username'}
          >
            {
              ['/pages/AwardList', '/pages/Task'].some(item => {
                return path.startsWith(item)
              }) && (
                <View className={'score-app-main-header-username-back'} onClick={() => {
                  // Taro.redirectTo({
                  //   url: '/pages/Home/index'
                  // })
                  Taro.navigateBack()
                }}>
                  <ArrowLeft />
                </View>
              )
            }
            <Image
              src={avatar}
              style={{
                marginRight: '.5em',
                borderRadius: '50%',
                width: '2rem',
                height: '2rem',
              }}
              mode="aspectFit"
            />
            {username}
          </View>

          <Star style={{ width: '33%' }} className={'j-c'}>
            {score}
          </Star>
          <View style={{ width: '33%' }} className="t-r">
            
          </View>
        </View>
        <View className={'score-app-main-page'}>{props.children}</View>
      </View>
      <ToastDom />
      <DialogDom />
    </ConfigProvider>
  );
}

export default App;
