import dayjs from 'dayjs';
import DateList from './components/DateList';
import TaskList from './components/TaskList';
import styles from './index.less';
import { useState } from 'react';

const PageHome = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <div className={styles['task']}>
      <div className={styles['task-header']}>
        <DateList value={currentDate} onChange={setCurrentDate} />
        <TaskList currentDate={currentDate} />
      </div>
    </div>
  );
};

export default PageHome;
