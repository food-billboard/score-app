import { useEffect } from 'react';
import { useUpdate } from 'ahooks';
import Taro from '@tarojs/taro';
import 'animate.css';
import { fetchUserInfo, Event } from './utils/constants';
import '../public/iconfont/iconfont.css';
// 全局样式
import './app.less';
import font from '../public/font-1.ttf';

function App(props: any) {
  const update = useUpdate();

  useEffect(() => {
    if (process.env.TARO_ENV === 'h5') {
      document.body.style.cssText = 'font-family: font_one;'
    } else {
      Taro.loadFontFace({
        global: true,
        family: 'font_one',
        source: font,
      });
    }
  }, []);

  // 可以使用所有的 React Hooks
  useEffect(() => {
    fetchUserInfo(true);
  }, []);

  useEffect(() => {
    const listener = () => {
      update();
    };
    Event.addListener('update', listener);
  }, []);

  return props.children;
}

export default App;
