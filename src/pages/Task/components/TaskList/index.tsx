import { useCallback, useEffect, useState } from 'react';
import { FrownOutline, SmileOutline } from 'antd-mobile-icons'
import { Popup } from 'antd-mobile'
import dayjs from 'dayjs'
import { getScorePrimaryClassifyList, getScoreMemoryList } from '@/services/base';
import ScoreAction from './components/Action'
import styles from './index.less';

type CurrentData = API_SCORE.GetScoreMemoryListData & {
  defaultScoreType: string 
}

const TaskList = (props: { currentDate: string }) => {

  const { currentDate } = props 

  const [primaryClassifyList, setPrimaryClassifyList] = useState<
    (API_SCORE.GetScorePrimaryClassifyListData & { visible: boolean })[]
  >([]);
  const [taskList, setTaskList] = useState<
    API_SCORE.GetScoreMemoryListData[]
  >([]);
  const [ currentData, setCurrentData ] = useState<false | CurrentData>(false)

  const handleScore = useCallback((scoreType: string, data: any) => {
    setCurrentData({
      ...data,
      defaultScoreType: scoreType
    })
  }, [])

  const fetchScoreMemoryData = async () => {
    return getScoreMemoryList({
      start_date: dayjs(currentDate).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      end_date: dayjs(currentDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      currPage: 0,
      pageSize: 999,
    }).then((data) => {
      setTaskList(data.list);
    });
  }

  const renderActionResult = useCallback((data: API_SCORE.GetScoreMemoryListData) => {
    const { score_type, target_score } = data 
    if(score_type === 'TODO') {
      return (
        <>
          <FrownOutline onClick={handleScore.bind(null, 'DEAL', data)} color={false ? '#f4bc6f' : 'gray'} />
          <SmileOutline onClick={handleScore.bind(null, 'DONE', data)} color={true ? '#f4bc6f' : 'gray'} />
        </>
      )
    }
    if(score_type === 'DONE') {
      return (
        <>
          <span>+{target_score}</span>
          <SmileOutline onClick={handleScore.bind(null, 'DONE', data)} color={'#f4bc6f'} />
        </>
      )
    }
    if(target_score === 0) {
      return (
        <FrownOutline onClick={handleScore.bind(null, 'DEAL', data)} color={'#f66'} />
      )
    }
    return (
      <>
        <span>{target_score}</span>
        <FrownOutline onClick={handleScore.bind(null, 'DEAL', data)} color={'#f00'} />
      </>
    )
  }, [handleScore])

  useEffect(() => {
    function fetchData() {
      getScorePrimaryClassifyList({}).then((data) => {
        setPrimaryClassifyList(data.list);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchScoreMemoryData()
  }, [currentDate])

  return (
    <div className={styles['task-list']}>
      {primaryClassifyList
        .filter((item) => taskList.some(task => task.target_primary_classify === item._id))
        .map((item) => {
          const { _id, content } = item;
          return (
            <div key={_id} className={styles['task-list-item']}>
              <div className={styles['task-list-item-header']}>
                <div>{content}</div>
              </div>
              <div className={styles['task-list-item-main']}>
                {taskList
                  .filter((task) => task.target_primary_classify === _id)
                  .map((item) => {
                    const { 
                      _id, 
                      target_classify_name, 
                      target_classify_image,
                    } = item;
                    return (
                      <div
                        key={_id}
                        className={styles['task-list-item-main-data']}
                      >
                        <div
                          className={styles['task-list-item-main-data-image']}
                        >
                          <img src={target_classify_image} />
                        </div>
                        <div
                          className={styles['task-list-item-main-data-title']}
                        >
                          {target_classify_name}
                        </div>
                        <div
                          className={styles['task-list-item-main-data-score']}
                        >
                          {
                            renderActionResult(item)
                          }
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      <Popup 
        visible={!!currentData}
        closeOnMaskClick
        destroyOnClose
        onClose={() => setCurrentData(false)}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <ScoreAction onClose={() => setCurrentData(false)} value={currentData as CurrentData} />
      </Popup>
    </div>
  );
};

export default TaskList;
