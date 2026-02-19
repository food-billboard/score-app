import { Input, Button, Grid, Toast, Dialog } from '@nutui/nutui-react-taro';
import { useCallback, useRef, useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import Page from '@/components/Page';
import mockLogin from '@/utils/mockLogin';
import { setUserInfo } from '@/utils/constants';
import { getUserInfo as fetchUserInfo } from '@/services/base';
import { action } from '@/components/MusicButton';
import styles from './index.module.less';

const PageHome = () => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');

  const currentRole = useRef('');

  const routeChange = useCallback(() => {
    if (password !== '8021') {
      return Toast.show('page-home', {
        content: '密码错误',
        closeOnOverlayClick: false,
      });
    }
    Toast.show('page-home', {
      content: '数据加载中',
      closeOnOverlayClick: false,
      duration: 0,
    });

    mockLogin(currentRole.current)
      .then(fetchUserInfo)
      .then((value) => {
        setUserInfo(value);
      })
      .then(() => {
        setVisible(false);
        Toast.hide('page-home');
        Taro.switchTab({
          url: '/pages/Task/index',
          // routeOptions: {
          //   user: role
          // }
        });
      });
  }, [password]);

  const handleClick = useCallback((role: any) => {
    action();
    currentRole.current = role;
    setVisible(true);
  }, []);

  return (
    <Page onBack={() => {}}>
      <Toast id="page-home" />
      <View className={styles['home']}>
        <View className={styles['home-title']}>欢迎来到积了么</View>
        <View className={styles['home-sub-title']}>请选择你的身份</View>
        <Grid columns={4}>
          {[
            {
              value: process.env.TARO_APP_DEFAULT_FATHER_ID,
              label: '爸爸',
            },
            {
              value: process.env.TARO_APP_DEFAULT_MATHER_ID,
              label: '妈妈',
            },
            {
              value: process.env.TARO_APP_DEFAULT_GRANDPA_ID,
              label: '爷爷',
            },
            {
              value: process.env.TARO_APP_DEFAULT_GRANDMA_ID,
              label: '奶奶',
            },
          ].map((item) => {
            const { label, value } = item;
            return (
              <Grid.Item key={value?.toString()}>
                <View className="t-c">
                  <Button
                    block
                    size="large"
                    type="primary"
                    onClick={() => handleClick(value as string)}
                  >
                    {label}
                  </Button>
                </View>
              </Grid.Item>
            );
          })}
        </Grid>
      </View>
      <Dialog
        title="验证"
        visible={visible}
        footerDirection="vertical"
        onConfirm={routeChange}
        onCancel={() => setVisible(false)}
      >
        <Input placeholder='请输入密码' type="password" value={password} onChange={setPassword} />
      </Dialog>
    </Page>
  );
};

export default PageHome;
