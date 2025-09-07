import { useCallback, useEffect, useState } from 'react';
import { Close, Add } from '@nutui/icons-react-taro'
import { Popup } from '@nutui/nutui-react-taro'
import { View, Image, Text } from '@tarojs/components'
import dayjs from 'dayjs'
import classnames from 'classnames'
import { getScorePrimaryClassifyList, getScoreMemoryList } from '@/services/base';
import ScoreAction from './components/Action'
import styles from './index.module.less';

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
          <Close onClick={handleScore.bind(null, 'DEAL', data)} color={'gray'} />
          <Add className={styles['icon-last']} onClick={handleScore.bind(null, 'DONE', data)} color={'gray'} />
        </>
      )
    }
    if(score_type === 'DONE') {
      return (
        <>
          <Add onClick={handleScore.bind(null, 'DONE', data)} color={'#f4bc6f'} />
          <Text className={classnames(styles['icon-text'], styles['icon-last'])}>+{target_score}</Text>
        </>
      )
    }
    if(target_score === 0) {
      return (
        <Close onClick={handleScore.bind(null, 'DEAL', data)} color={'#f66'} />
      )
    }
    return (
      <>
        <Close onClick={handleScore.bind(null, 'DEAL', data)} color={'#f00'} />
        <Text className={classnames(styles['icon-text'], styles['icon-last'])}>{target_score}</Text>
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
  }, [currentDate, currentData])

  return (
    <View className={styles['task-list']}>
      {primaryClassifyList
        .filter((item) => taskList.some(task => task.target_primary_classify === item._id))
        .map((item) => {
          const { _id, content } = item;
          return (
            <View key={_id} className={styles['task-list-item']}>
              <View className={styles['task-list-item-header']}>
                <View className={styles['task-list-item-header-main']}>{content}</View>
              </View>
              <View className={styles['task-list-item-main']}>
                {taskList
                  .filter((task) => task.target_primary_classify === _id)
                  .map((item) => {
                    const { 
                      _id, 
                      target_classify_name, 
                      target_classify_image,
                    } = item;
                    return (
                      <View
                        key={_id}
                        className={styles['task-list-item-main-data']}
                      >
                        <View
                          className={styles['task-list-item-main-data-image']}
                        >
                          <Image src={target_classify_image} mode="aspectFit" className={styles['img']} />
                        </View>
                        <View
                          className={styles['task-list-item-main-data-title']}
                        >
                          {target_classify_name}
                        </View>
                        <View
                          className={styles['task-list-item-main-data-score']}
                        >
                          {
                            renderActionResult(item)
                          }
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>
          );
        })}
      <Popup 
        visible={!!currentData}
        closeOnOverlayClick
        destroyOnClose
        onClose={() => setCurrentData(false)}
        round
        position="bottom"
      >
        <ScoreAction onClose={() => setCurrentData(false)} value={currentData as CurrentData} />
      </Popup>
    </View>
  );
};

export default TaskList;
