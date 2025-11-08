import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import DateList from './components/DateList';
import TaskList from './components/TaskList';
import Page from '@/components/Page';
import { View } from '@tarojs/components';
import styles from './index.module.less';
import { useState } from 'react';

const Task = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));

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
