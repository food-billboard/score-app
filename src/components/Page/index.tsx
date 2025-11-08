import Taro, { useRouter } from '@tarojs/taro';
import { ArrowLeft } from '@nutui/icons-react-taro';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import { View, Image } from '@tarojs/components';
import { action } from '../MusicButton';
import { getUserInfo as getUserInfoData } from '../../utils/constants';
import ToastDom from '../Toast';
import DialogDom, { Dialog } from '../Dialog';
import Star from '@/components/Star';

const Page = (props: { children?: any, onBack: () => void }) => {
  const { username, score, avatar } = getUserInfoData();

  const router = useRouter();
  const { path } = router;

  const { onBack } = props 

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
            {['/pages/AwardList', '/pages/Task'].some((item) => {
              return path.startsWith(item);
            }) && (
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

          <Star style={{ width: '33%' }} className={'j-c'} onClick={action}>
            {score}
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
