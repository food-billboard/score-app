import { useState, useEffect, useRef, useCallback } from 'react';
import Taro from '@tarojs/taro';
import {
  InfiniteLoading,
  SearchBar,
  Button,
  Grid,
  Popup,
  HoverButton
} from '@nutui/nutui-react-taro';
import { View, Image, Text } from '@tarojs/components';
import Page from '@/components/Page';
import { getScoreAward } from '@/services/base';
import styles from './index.module.less';
import { useGetState } from 'ahooks';
import { AWARD_CYCLE_ENUM } from '@/utils/constants';
import AwardDetail from './components/AwardDetail';
import Star from '@/components/Star';
import { IconFont } from '@nutui/icons-react-taro';
import { action } from '@/components/MusicButton';
import MemoryList from './components/MemoryList'

const AwardList = () => {
  const [content, setContent, getContent] = useGetState('');
  const [dataSource, setDataSource, getDataSource] = useGetState<
    API_SCORE.GetScoreAwardData[]
  >([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentData, setCurrentData] = useState<
    false | API_SCORE.GetScoreAwardData
  >(false);
  const [ memoryVisible, setMemoryVisible ] = useState(false)

  const currentPage = useRef(0);

  async function fetchData() {
    return getScoreAward({
      currPage: currentPage.current,
      pageSize: 10,
      content: getContent(),
      enable: 'ENABLE'
    }).then((data) => {
      const result =
        currentPage.current === 0
          ? data.list || []
          : [...getDataSource(), ...(data.list || [])];
      setDataSource(result);
      setHasMore(result.length < data.total);
    });
  }

  const handleDetail = useCallback((value: API_SCORE.GetScoreAwardData) => {
    setCurrentData(value);
  }, []);

  const handleShowMemory = useCallback(() => {
    action()
    setMemoryVisible(true)
  }, [])

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page onBack={() => Taro.redirectTo({
      url: '/pages/Home/index'
    })}>
      <View className={styles['award-list-container']}>
        <View className={styles.header}>
          <View className={styles.left}>
            <SearchBar
              placeholder="请输入内容"
              value={content}
              onChange={setContent}
            />
          </View>
          <View className={styles.right}>
            <Button
              style={{verticalAlign: 'middle'}}
              size="normal"
              type="primary"
              onClick={() => {
                currentPage.current = 0;
                fetchData();
              }}
            >
              搜索
            </Button>
          </View>
        </View>
        <View className={styles['award-list']}>
          <Grid columns={3} gap={10}>
            {dataSource.map((item) => {
              const {
                award_image_list,
                award_name,
                award_cycle,
                award_cycle_count,
                exchange_score,
              } = item;
              return (
                <Grid.Item key={item._id}>
                  <View
                    className={styles['award-list-item']}
                    onClick={handleDetail.bind(null, item)}
                  >
                    <View className={styles['award-list-item-top']}>
                      <View className={styles['award-list-item-top-content']}>
                        <Image
                          className={styles['img']}
                          src={award_image_list[0]}
                          mode="aspectFill"
                        />
                      </View>
                    </View>
                    <View className={styles['award-list-item-bottom']}>
                      <View className={styles['award-list-item-bottom-title']}>
                        {award_name}
                      </View>
                      <View
                        className={styles['award-list-item-bottom-sub-title']}
                      >
                        {/* <Text>兑换规则</Text>
                          <Text>|</Text> */}
                        <Text>
                          {award_cycle === 'NONE'
                            ? `无限制`
                            : `每${
                                (AWARD_CYCLE_ENUM as any)[award_cycle] || '-'
                              }${award_cycle_count}次`}
                        </Text>
                      </View>
                    </View>
                    <Star className={styles['award-list-item-absolute']}>
                      {exchange_score}
                    </Star>
                  </View>
                </Grid.Item>
              );
            })}
          </Grid>
        </View>
        <InfiniteLoading
          onLoadMore={async () => {
            currentPage.current++;
            return fetchData();
          }}
          hasMore={hasMore}
          loadingText={<>加载中</>}
          loadMoreText={<>没有更多了</>}
        ></InfiniteLoading>
        <Popup
          visible={!!currentData}
          closeOnOverlayClick
          destroyOnClose
          onClose={() => setCurrentData(false)}
          round
          position="bottom"
          title={currentData ? currentData.award_name : ''}
          closeIcon
        >
          <AwardDetail
            onClose={() => setCurrentData(false)}
            value={currentData as API_SCORE.GetScoreAwardData}
          />
        </Popup>
      </View>
      <MemoryList visible={memoryVisible} onVisibleChange={setMemoryVisible} />
      <HoverButton icon={<IconFont size="2rem" fontClassName="iconfont" classPrefix="score" name="a-002-certificate" />} onClick={handleShowMemory} />
    </Page>
  );
};

export default AwardList;
