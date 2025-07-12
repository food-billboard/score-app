import { Outlet, history } from 'umi';
import { Toast, TabBar, Avatar } from 'antd-mobile';
import { useUpdate } from 'ahooks'
import { useCallback, useEffect, useState } from 'react';
import { AppOutline, MessageOutline, MessageFill } from 'antd-mobile-icons';
import { getUserInfo } from '@/services/base';
import { setUserInfo, getUserInfo as getUserInfoData } from '@/utils/constants';
import mockLogin from '../utils/mockLogin';
import styles from './index.less';

export default function Layout() {
  const tabs = [
    {
      key: '/task',
      title: '目标',
      icon: <AppOutline />,
    },
    {
      key: '/award',
      title: '星愿池',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
    },
    // {
    //   key: 'personalCenter',
    //   title: '我的',
    //   icon: <UserOutline />,
    // },
  ];

  const [activeKey, setActiveKey] = useState('home');

  const update = useUpdate()

  const { username, score, avatar } = getUserInfoData()

  const onRouteChange = useCallback((key: string) => {
    setActiveKey(key);
    history.push(key);
  }, []);

  useEffect(() => {
    // 上传需要登录，这里用一个默认账号来登录
    mockLogin()
      .then(getUserInfo)
      .then((value) => {
        setUserInfo(value);
        update()
      });

    setActiveKey(history.location.pathname);
  }, []);

  useEffect(() => {
    Toast.config({ duration: 500 });
  }, []);

  return (
    <div className={styles['score-app']}>
      <div className={styles['score-app-main']}>
        <div className={styles['score-app-main-header']}>
          <div className={styles['score-app-main-header-username']}>
          <Avatar src={avatar} style={{ '--size': '48px' }} />
            {username}11
          </div>
          <div className={'star j-c'}>
            <div></div>
            <div>{score}</div>
          </div>
          <div className='t-r'>x</div>
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
