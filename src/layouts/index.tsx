import { Outlet, history } from 'umi';
import { Toast, TabBar, Avatar } from 'antd-mobile';
import { useCallback, useEffect, useState } from 'react';
import { CalendarOutline, BillOutline } from 'antd-mobile-icons';
import { Emitter } from '@/utils/routeListener'
import { getUserInfo as getUserInfoData } from '@/utils/constants';
import styles from './index.less';

export default function Layout() {
  const tabs = [
    {
      key: '/task',
      title: '目标',
      icon: <CalendarOutline />
    },
    {
      key: '/award',
      title: '星愿池',
      icon: <BillOutline />
    },
  ];

  const [activeKey, setActiveKey] = useState('/');

  const { username, score, avatar } = getUserInfoData();

  const onRouteChange = useCallback((key: string) => {
    history.push(key);
  }, []);

  useEffect(() => {
    function listener() {
      const currentKey = history.location.pathname
      setActiveKey(currentKey);
    }
    Emitter.addListener('route-change', listener)
    listener()
    return () => {
      Emitter.removeListener('route-listener')
    }
  }, []);

  useEffect(() => {
    Toast.config({ duration: 500 });
  }, []);

  if (activeKey === '/') {
    return <Outlet />;
  }

  return (
    <div className={styles['score-app']}>
      <div className={styles['score-app-main']}>
        <div className={styles['score-app-main-header']}>
          <div className={styles['score-app-main-header-username']}>
            <Avatar
              src={avatar}
              style={{ '--size': '48px', marginRight: '.5em' }}
            />
            {username}
          </div>
          <div className={'star j-c'}>
            <div></div>
            <div>{score}</div>
          </div>
          <div className="t-r">x</div>
        </div>
        <Outlet />
      </div>
      <div className={styles['score-app-bottom']}>
        <TabBar onChange={onRouteChange} activeKey={activeKey}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}
