import { useState, useEffect, useRef, useCallback } from 'react';
import {
  InfiniteScroll,
  SearchBar,
  Button,
  DotLoading,
  Grid,
  Popup
} from 'antd-mobile';
import { history } from 'umi';
import classnames from 'classnames'
import { getScoreAward } from '@/services/base';
import styles from './index.less';
import { useGetState } from 'ahooks';
import { AWARD_CYCLE_ENUM } from '@/utils/constants';
import AwardDetail from './components/AwardDetail';

const AwardList = () => {
  const [content, setContent, getContent] = useGetState('');
  const [dataSource, setDataSource, getDataSource] = useGetState<
    API_SCORE.GetScoreAwardData[]
  >([]);
  const [hasMore, setHasMore] = useState(true);
  const [ currentData, setCurrentData ] = useState<false | API_SCORE.GetScoreAwardData>(false)

  const currentPage = useRef(1);

  async function fetchData() {
    return getScoreAward({
      currPage: currentPage.current,
      pageSize: 10,
      content: getContent(),
    }).then((data) => {
      const result =
        currentPage.current === 1
          ? data.list
          : [...getDataSource(), ...data.list];
      setDataSource(result);
      setHasMore(result.length < data.total);
    });
  }

  const handleDetail = useCallback((value: API_SCORE.GetScoreAwardData) => {
    setCurrentData(value)
  }, []);

  useEffect(() => {
    // fetchData();
    setDataSource([
      {
        _id: '1',
        inventory: 1,
        exchange_score: 2,
        award_image_list: [
          'https://t7.baidu.com/it/u=97059456,1585992153&fm=3035&app=3035&f=JPEG&size=f660,372',
          'https://t9.baidu.com/it/u=3058309664,2827251915&fm=3035&app=3035&size=f242,162&n=0&g=0n&f=JPEG?s=F1228BF0545607C2080A6AAE0300E00A&sec=1747912451&t=0dddc642f48ecd25c00942f57b436a8a',
          'https://t9.baidu.com/it/u=1719506008,751042043&fm=3035&app=3035&size=f242,150&n=0&f=JPEG&fmt=auto?s=5314528A8A5922CC22B04B8E0300E007&sec=1747933200&t=447dcb5c388090f819bca1ce00f581f3',
        ],
        award_name: '22222222',
        award_cycle: 'day',
        award_cycle_count: 1,
        award_description: '2244'.repeat(20),
        createdAt: '2020-08-09',
        updatedAt: '2020-08-09',
      },
      {
        _id: '2',
        inventory: 1,
        exchange_score: 2,
        award_image_list: [
          'https://t7.baidu.com/it/u=97059456,1585992153&fm=3035&app=3035&f=JPEG&size=f660,372',
          'https://t9.baidu.com/it/u=3058309664,2827251915&fm=3035&app=3035&size=f242,162&n=0&g=0n&f=JPEG?s=F1228BF0545607C2080A6AAE0300E00A&sec=1747912451&t=0dddc642f48ecd25c00942f57b436a8a',
          'https://t9.baidu.com/it/u=1719506008,751042043&fm=3035&app=3035&size=f242,150&n=0&f=JPEG&fmt=auto?s=5314528A8A5922CC22B04B8E0300E007&sec=1747933200&t=447dcb5c388090f819bca1ce00f581f3',
        ],
        award_name: '22222222',
        award_cycle: 'QUARTER',
        award_cycle_count: 1,
        award_description: '2244'.repeat(20),
        createdAt: '2020-08-09',
        updatedAt: '2020-08-09',
      },
      {
        _id: '3',
        inventory: 1,
        exchange_score: 2,
        award_image_list: [
          'https://t7.baidu.com/it/u=97059456,1585992153&fm=3035&app=3035&f=JPEG&size=f660,372',
          'https://t9.baidu.com/it/u=3058309664,2827251915&fm=3035&app=3035&size=f242,162&n=0&g=0n&f=JPEG?s=F1228BF0545607C2080A6AAE0300E00A&sec=1747912451&t=0dddc642f48ecd25c00942f57b436a8a',
          'https://t9.baidu.com/it/u=1719506008,751042043&fm=3035&app=3035&size=f242,150&n=0&f=JPEG&fmt=auto?s=5314528A8A5922CC22B04B8E0300E007&sec=1747933200&t=447dcb5c388090f819bca1ce00f581f3',
        ],
        award_name: '22222222',
        award_cycle: 'day',
        award_cycle_count: 1,
        award_description: '2244'.repeat(20),
        createdAt: '2020-08-09',
        updatedAt: '2020-08-09',
      },
      {
        _id: '4',
        inventory: 1,
        exchange_score: 2,
        award_image_list: [
          'https://t7.baidu.com/it/u=97059456,1585992153&fm=3035&app=3035&f=JPEG&size=f660,372',
          'https://t9.baidu.com/it/u=3058309664,2827251915&fm=3035&app=3035&size=f242,162&n=0&g=0n&f=JPEG?s=F1228BF0545607C2080A6AAE0300E00A&sec=1747912451&t=0dddc642f48ecd25c00942f57b436a8a',
          'https://t9.baidu.com/it/u=1719506008,751042043&fm=3035&app=3035&size=f242,150&n=0&f=JPEG&fmt=auto?s=5314528A8A5922CC22B04B8E0300E007&sec=1747933200&t=447dcb5c388090f819bca1ce00f581f3',
        ],
        award_name: '22222222',
        award_cycle: 'day',
        award_cycle_count: 1,
        award_description: '2244'.repeat(20),
        createdAt: '2020-08-09',
        updatedAt: '2020-08-09',
      },
    ]);
  }, []);

  return (
    <div className={styles['award-list-container']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <SearchBar
            placeholder="请输入内容"
            value={content}
            onChange={setContent}
          />
        </div>
        <div className={styles.right}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              currentPage.current = 1;
              fetchData();
            }}
          >
            搜索
          </Button>
        </div>
      </div>
      {dataSource.length > 0 ? (
        <>
          <div className={styles['award-list']}>
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
                    <div
                      className={styles['award-list-item']}
                      onClick={handleDetail.bind(null, item)}
                    >
                      <div className={styles['award-list-item-top']}>
                        <img src={award_image_list[0]} />
                      </div>
                      <div className={styles['award-list-item-bottom']}>
                        <div className={styles['award-list-item-bottom-title']}>
                          {award_name}
                        </div>
                        <div
                          className={styles['award-list-item-bottom-sub-title']}
                        >
                          {/* <span>兑换规则</span>
                          <span>|</span> */}
                          <span>
                            {award_cycle === 'NONE'
                              ? `无限制`
                              : `每${
                                  (AWARD_CYCLE_ENUM as any)[award_cycle] || '-'
                                }${award_cycle_count}次`}
                          </span>
                        </div>
                      </div>
                      <div
                        className={classnames(
                          styles['award-list-item-absolute'],
                          'star',
                        )}
                      >
                        <div></div>
                        <div>{exchange_score}</div>
                      </div>
                    </div>
                  </Grid.Item>
                );
              })}
            </Grid>
          </div>
          <InfiniteScroll
            loadMore={async () => {
              currentPage.current++;
              return fetchData();
            }}
            hasMore={hasMore}
          />
        </>
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.loadingWrapper}>
            <DotLoading />
          </div>
          正在拼命加载数据
        </div>
      )}
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
        <AwardDetail value={currentData as API_SCORE.GetScoreAwardData} />
      </Popup>
    </div>
  );
};

export default AwardList;
