import { useState, useEffect, useRef, useCallback } from 'react';
import {
  InfiniteScroll,
  SearchBar,
  Button,
  DotLoading,
  Grid,
  Popup
} from 'antd-mobile';
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

  const currentPage = useRef(0);

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
    fetchData();
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
