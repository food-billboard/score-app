import { Button, Grid, Toast } from '@nutui/nutui-react-taro';
import { useCallback } from 'react';
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import Page from '@/components/Page';
import mockLogin from '@/utils/mockLogin';
import { setUserInfo } from '@/utils/constants';
import { getUserInfo as fetchUserInfo } from '@/services/base';
import styles from './index.module.less';

const PageHome = () => {
  const routeChange = useCallback((role: any) => {
    Toast.show('page-home', {
      content: '数据加载中',
      closeOnOverlayClick: false,
      duration: 0,
    });
    
    mockLogin(role)
      .then(fetchUserInfo)
      .then((value) => {
        setUserInfo(value);
      })
      .then(() => {
        Toast.hide('page-home');
        Taro.switchTab({
          url: '/pages/Task/index',
          // routeOptions: {
          //   user: role 
          // }
        })
      });
  }, []);

  return (
    <Page>
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
                  <Button type='primary' onClick={() => routeChange(value as string)}>
                    {label}
                  </Button>
                </View>
              </Grid.Item>
            );
          })}
        </Grid>
      </View>
    </Page>
  );
};

export default PageHome;
