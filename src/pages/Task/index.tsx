import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import DateList from './components/DateList';
import TaskList from './components/TaskList';
import Page from '@/components/Page';
import { View } from '@tarojs/components';
import styles from './index.module.less';
import { useEffect, useState } from 'react';
import { isUserSide } from '@/utils/tool';
import mockLogin from '@/utils/mockLogin';

const Task = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [loginLoading, setLoginLoading] = useState(true); 

  useEffect(() => {
    if(isUserSide()) {
      Taro.showToast({
        title: '登录中。。。'
      })
      mockLogin(process.env.TARO_APP_DEFAULT_CHILD_ID || '')
      .then(() => {
        setLoginLoading(false)
      })
    }else{
      setLoginLoading(false)
    }
  }, [])

  if(loginLoading) {
    return null 
  }

  return (
    <Page onBack={() => Taro.redirectTo({
      url: '/pages/Home/index'
    })}>
      <View className={styles['task']}>
        <DateList value={currentDate} onChange={setCurrentDate} />
        <TaskList currentDate={currentDate} />
      </View>
    </Page>
  );
};

export default Task;
