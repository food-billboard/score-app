import { Button, Grid } from 'antd-mobile';
import { history } from 'umi';
import styles from './index.less';
import { useEffect, useState } from 'react';

const PageHome = () => {
  const [action, setAction] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (action && role) {
      history.push(`/${action}`);
    }
  }, [action, role]);

  return (
    <div className={styles['home']}>
      <div className={styles['home-title']}>欢迎来到积了么</div>
      {/* <div className={styles['home-sub-title']}>请选择你要做什么</div>
      <Grid columns={3}>
        {[
          {
            value: 'score',
            label: '积分',
          },
          {
            value: 'award',
            label: '兑换',
          },
          {
            value: 'check',
            label: '核销',
          },
        ].map((item) => {
          const { label, value } = item;
          return (
            <Grid.Item key={value}>
              <div className="t-c">
                <Button onClick={() => setAction(value)}>{label}</Button>
              </div>
            </Grid.Item>
          );
        })}
      </Grid> */}
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
                <Button onClick={() => setRole(value as string)}>
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
