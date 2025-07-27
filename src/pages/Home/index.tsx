import { Button, Grid, Toast } from 'antd-mobile';
import { history } from 'umi';
import { useCallback } from 'react';
import mockLogin from '@/utils/mockLogin'
import { setUserInfo } from '@/utils/constants'
import { getUserInfo as fetchUserInfo } from '@/services/base'
import styles from './index.less';

const PageHome = () => {

  const routeChange = useCallback((role: any) => {
    const handler = Toast.show({
      content: '数据加载中',
      maskClickable: false,
      duration: 0
    })

    mockLogin(role)
    .then(fetchUserInfo)
      .then((value) => {
        setUserInfo(value);
      })
      .then(() => {
        handler.close()
        history.push('/task', {
          user: role 
        });
      });
  }, [])

  return (
    <div className={styles['home']}>
      <div className={styles['home-title']}>欢迎来到积了么</div>
      <div className={styles['home-sub-title']}>请选择你的身份</div>
      <Grid columns={4}>
        {[
          {
            value: process.env.DEFAULT_FATHER_ID,
            label: '爸爸',
          },
          {
            value: process.env.DEFAULT_MATHER_ID,
            label: '妈妈',
          },
          {
            value: process.env.DEFAULT_GRANDPA_ID,
            label: '爷爷',
          },
          {
            value: process.env.DEFAULT_GRANDMA_ID,
            label: '奶奶',
          },
        ].map((item) => {
          const { label, value } = item;
          return (
            <Grid.Item key={value?.toString()}>
              <div className="t-c">
                <Button onClick={() => routeChange(value as string)}>
                  {label}
                </Button>
              </div>
            </Grid.Item>
          );
        })}
      </Grid>
    </div>
  );
};

export default PageHome;
