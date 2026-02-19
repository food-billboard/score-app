import Taro, { useRouter } from '@tarojs/taro';
import { CountUp } from 'countup.js';
import { ArrowLeft } from '@nutui/icons-react-taro';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import { View, Image } from '@tarojs/components';
import { action } from '../MusicButton';
import { getUserInfo as getUserInfoData, Event } from '../../utils/constants';
import ToastDom from '../Toast';
import DialogDom, { Dialog } from '../Dialog';
import Star from '@/components/Star';
import { useEffect, useRef } from 'react';
import { useUpdate } from 'ahooks';
import { isUserSide } from '@/utils/tool';

const Page = (props: { children?: any; onBack: false | (() => void) }) => {
  const { username, score, avatar } = getUserInfoData();

  const countUpInstance = useRef<CountUp>();
  const countupViewRef = useRef(null)

  const router = useRouter();
  const { path } = router;

  const { onBack } = props;

  const update = useUpdate();

  useEffect(() => {
    const listener = () => {
      update()
      if (!countUpInstance.current) {
        countUpInstance.current = new CountUp(
          countupViewRef.current as any,
          0,
          {
            duration: 2,
            separator: ''
          },
        );
        countUpInstance.current.start();
      } else {
        countUpInstance.current?.update(getUserInfoData().score);
        countUpInstance.current.start();
      }
    };
    Event.addListener('update', listener);

    return () => {
      Event.removeListener('update', listener);
    };
  }, []);

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
            {onBack && !isUserSide() && ['/pages/AwardList', '/pages/Task', '/pages/Design'].some(
              (item) => {
                return path.startsWith(item);
              },
            ) && (
              <View
                className={'score-app-main-header-username-back'}
                onClick={onBack}
              >
                <ArrowLeft />
              </View>
            )}
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
          <Star
            style={{ width: '33%' }}
            animate={{
              star: 'animate__flash',
            }}
            className={'j-c'}
            onClick={action}
          >
            <View ref={countupViewRef}>{score}</View>
          </Star>
          <View style={{ width: '33%' }} className="t-r"></View>
        </View>
        <View className={'score-app-main-page'}>{props.children}</View>
      </View>
      <ToastDom />
      <DialogDom />
    </ConfigProvider>
  );
};

export default Page;
