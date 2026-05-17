import { useCallback, useEffect, useState, useRef } from 'react';
import { Fabulous } from '@nutui/icons-react-taro';
import { Popup } from '@nutui/nutui-react-taro';
import { View, Text, ScrollView } from '@tarojs/components';
import dayjs from 'dayjs';
import classnames from 'classnames';
import Image from '@/components/Image';
import Reaction, { ReactionRef } from '@/components/Reaction';
import {
  getScorePrimaryClassifyList,
  getScoreMemoryList,
} from '@/services/base';
import ScoreAction from './components/Action';
import styles from './index.module.less';
import { isUserSide } from '@/utils/tool';
import successIcon from '../../../../../public/success.png';
import successAudio from '../../../../../public/success.mp3';
import failIcon from '../../../../../public/fail.png';
import failAudio from '../../../../../public/fail.mp3';

type CurrentData = API_SCORE.GetScoreMemoryListData & {
  defaultScoreType: string;
};

const TaskList = (props: { currentDate: string }) => {
  const { currentDate } = props;

  const [primaryClassifyList, setPrimaryClassifyList] = useState<
    (API_SCORE.GetScorePrimaryClassifyListData & { visible: boolean })[]
  >([]);
  const [taskList, setTaskList] = useState<API_SCORE.GetScoreMemoryListData[]>(
    [],
  );
  const [currentData, setCurrentData] = useState<false | CurrentData>(false);

  const reactionRef = useRef<ReactionRef>(null);

  const handleScore = useCallback((scoreType: string, data: any) => {
    setCurrentData({
      ...data,
      defaultScoreType: scoreType,
    });
  }, []);

  const fetchScoreMemoryData = async () => {
    return getScoreMemoryList({
      start_date: dayjs(currentDate)
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss'),
      end_date: dayjs(currentDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      currPage: 0,
      pageSize: 999,
    }).then((data) => {
      setTaskList(data.list);
    });
  };

  const renderActionResult = useCallback(
    (data: API_SCORE.GetScoreMemoryListData) => {
      const { score_type, target_score } = data;
      // 用户端
      if (isUserSide()) {
        // if(score_type === 'TODO') {
        //   return (
        //     <Button type="primary" onClick={() => {

        //     }}>完成</Button>
        //   )
        // }
        return null;
      }
      if (score_type === 'TODO') {
        return (
          <>
            <Fabulous
              onClick={handleScore.bind(null, 'DONE', data)}
              color={'gray'}
            />
            <Fabulous
              className={classnames(
                styles['icon-reverse'],
                styles['icon-last'],
              )}
              onClick={handleScore.bind(null, 'DEAL', data)}
              color={'gray'}
            />
          </>
        );
      }
      if (score_type === 'DONE') {
        return (
          <>
            <Fabulous
              onClick={handleScore.bind(null, 'DONE', data)}
              color={'#f4bc6f'}
            />
            <Text
              className={classnames(styles['icon-text'], styles['icon-last'])}
            >
              +{target_score}
            </Text>
          </>
        );
      }
      if (target_score === 0) {
        return (
          <Fabulous
            className={styles['icon-reverse']}
            onClick={handleScore.bind(null, 'DEAL', data)}
            color={'#f66'}
          />
        );
      }
      return (
        <>
          <Fabulous
            className={styles['icon-reverse']}
            onClick={handleScore.bind(null, 'DEAL', data)}
            color={'#f00'}
          />
          <Text
            className={classnames(styles['icon-text'], styles['icon-last'])}
          >
            {target_score}
          </Text>
        </>
      );
    },
    [handleScore],
  );

  const actionResultBackground = useCallback(
    (data: API_SCORE.GetScoreMemoryListData) => {
      return {};
      const { score_type, target_score } = data;
      if (score_type === 'TODO') {
        return {};
      }
      if (score_type === 'DONE') {
        return {
          background:
            'linear-gradient(to bottom, white 0%, white 5%, var(--opacityp1-primary) 50%, white 95%, white 100%)',
        };
      }
      if (target_score === 0) {
        return {
          background:
            'linear-gradient(to bottom, white 0%, white 5%, rgba(255,102,102, 0.1) 50%, white 95%, white 100%)',
        };
      }
      return {
        background:
          'linear-gradient(to bottom, white 0%, white 20%, rgba(255,0,0, .1) 50%, white 80%, white 100%)',
      };
    },
    [],
  );

  useEffect(() => {
    function fetchData() {
      getScorePrimaryClassifyList({}).then((data) => {
        setPrimaryClassifyList(data.list || []);
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetchScoreMemoryData();
  }, [currentDate, currentData]);

  return (
    <View className={styles['task-list']}>
      {(Array.isArray(primaryClassifyList) ? primaryClassifyList : [])
        .filter((item) =>
          taskList.some((task) => task.target_primary_classify === item._id),
        )
        .map((item) => {
          const { _id, content } = item;
          return (
            <View key={_id} className={styles['task-list-item']}>
              <View className={styles['task-list-item-header']}>
                <View className={styles['task-list-item-header-main']}>
                  {content}
                </View>
              </View>
              <View className={styles['task-list-item-main']}>
                {taskList
                  .filter((task) => task.target_primary_classify === _id)
                  .map((item) => {
                    const { _id, target_classify_name, target_classify_image } =
                      item;
                    return (
                      <View
                        key={_id}
                        className={styles['task-list-item-main-data']}
                        style={actionResultBackground(item)}
                      >
                        <View
                          className={styles['task-list-item-main-data-image']}
                        >
                          <Image
                            src={target_classify_image}
                            mode="aspectFit"
                            className={styles['img']}
                          />
                        </View>
                        <View
                          className={styles['task-list-item-main-data-title']}
                        >
                          {target_classify_name}
                        </View>
                        <View
                          className={styles['task-list-item-main-data-score']}
                        >
                          {renderActionResult(item)}
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
        title={'我的任务'}
        closeable
        portal={() => document.body}
      >
        <ScrollView scrollY style={{ height: '400px' }}>
          <ScoreAction
            onClose={() => setCurrentData(false)}
            value={currentData as CurrentData}
            onAction={(type) => {
              if (type === 'DONE') {
                reactionRef.current?.open(successIcon, successAudio);
              } else if (type === 'DEAL') {
                reactionRef.current?.open(failIcon, failAudio);
              }
            }}
          />
        </ScrollView>
      </Popup>
      <Reaction ref={reactionRef} />
    </View>
  );
};

export default TaskList;
