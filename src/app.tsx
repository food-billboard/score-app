import { useEffect } from 'react';
import { useUpdate } from 'ahooks';
import {
  fetchUserInfo,
  Event,
} from './utils/constants';
import '../public/iconfont/iconfont.css';
// 全局样式
import './app.less';

function App(props: any) {
  const update = useUpdate();

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
