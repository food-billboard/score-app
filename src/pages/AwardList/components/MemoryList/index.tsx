import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { InfiniteLoading, Popup, Tabs, Button } from '@nutui/nutui-react-taro';
import { View, Image } from '@tarojs/components';
import { Check } from '@nutui/icons-react-taro';
import classnames from 'classnames';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import { useControllableValue } from 'ahooks';
import { getUserInfo as getUserInfoData } from '@/utils/constants';
import {
  getExchangeMemoryList,
  checkScoreExchangeMemory,
} from '@/services/base';
import styles from './index.module.less';
import { useGetState } from 'ahooks';
import { isUserSide } from '@/utils/tool';

type Ref = {
  open: (value: API_SCORE.GetExchangeMemoryListData) => void;
};

const Action = forwardRef<
  Ref,
  { onChange?: () => void; type: string | number }
>((props, ref) => {
  const { onChange, type } = props;

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<API_SCORE.GetExchangeMemoryListData>();

  const { check_date, _id = '' } = value || {};

  // 核销
  const handleCheck = useCallback(() => {
    Taro.showModal({
      title: '提示',
      content: '是否确认核销？',
      success: () => {
        checkScoreExchangeMemory({
          _id,
          check_state: 'AGREE',
        }).then(() => {
          setVisible(false);
          onChange?.();
        });
      },
    });
  }, [_id, onChange]);

  // 撤销兑换
  const handleCancel = useCallback(() => {
    Taro.showModal({
      title: '提示',
      content: '是否确认取消核销？',
      success: () => {
        checkScoreExchangeMemory({
          _id,
          check_state: 'DISAGREE',
        }).then(() => {
          setVisible(false);
          onChange?.();
        });
      },
    });
  }, [onChange, _id]);

  useImperativeHandle(ref, () => {
    return {
      open: (value) => {
        setValue(value);
        setVisible(true);
      },
    };
  }, []);

  return (
    <Popup
      visible={visible}
      closeOnOverlayClick
      destroyOnClose
      onClose={() => setVisible(false)}
      round
      position="bottom"
      closeable
    >
      <View className={styles['action']}>
        <View className={styles['action-content']}>
          {!!value && <Item value={value} type={type} />}
        </View>
        {type == 0 && (
          <View className={styles['action-footer']}>
            {!isUserSide() && (
              <Button
                style={{ marginBottom: '0.5rem' }}
                shape="round"
                block
                onClick={handleCheck}
                type="primary"
              >
                立即核销
              </Button>
            )}
            <Button
              fill="none"
              shape="round"
              block
              onClick={handleCancel}
              type="warning"
            >
              撤销兑换
            </Button>
          </View>
        )}
        {type == 1 && (
          <View className={styles['action-footer']}>
            <View className={styles['action-footer-tip']}>
              <Check className={styles['action-footer-tip-icon']} />{' '}
              恭喜你，心愿已达成~~
            </View>
            <View className={styles['action-footer-date']}>
              心愿达成时间：{dayjs(check_date).format('MM-DD HH:mm')}
            </View>
          </View>
        )}
      </View>
    </Popup>
  );
});

const Item = (props: {
  onClick?: (value: API_SCORE.GetExchangeMemoryListData) => void;
  type: string | number;
  value: API_SCORE.GetExchangeMemoryListData;
}) => {
  const { username } = getUserInfoData();

  const { value, type, onClick } = props;
  const {
    _id,
    award_name,
    award_exchange_score,
    createdAt,
    award_image_list = [],
  } = value;

  return (
    <View
      className={styles['memory-list-item-wrapper']}
      onClick={onClick?.bind(null, value)}
    >
      <View
        className={classnames(styles['memory-list-item'], {
          [styles['memory-list-item-deal']]: type == 1,
        })}
      >
        <View className={styles['ticket-inner']}>
          <View className={styles['ticket-content']}>
            <View className={styles['ticket-icon']}>
              <Image
                className={styles['img']}
                src={award_image_list[0]}
                mode="aspectFit"
              />
            </View>
            <View className={styles['ticket-title']}>{award_name}</View>
            <View className={styles['ticket-price']}>
              {award_exchange_score}分
            </View>
          </View>
          <View className={styles['ticket-info']}>
            <View>宝贝：{username}</View>
            <View>兑换时间：{dayjs(createdAt).format('MM-DD HH:mm')}</View>
          </View>
        </View>
      </View>
      {type == 0 && <View className={styles['status-todo']}>待兑现</View>}
      {type == 1 && (
        <View className={styles['status-deal']}>
          <View className={styles['status-deal-content']}>已兑现</View>
        </View>
      )}
    </View>
  );
};

const MemoryList = (props: {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}) => {
  const [tabIndex, setTabIndex] = useState<string | number>(0);
  const [visible, setVisible] = useControllableValue(props, {
    valuePropName: 'visible',
    trigger: 'onVisibleChange',
    defaultValue: false,
  });
  const [dataSource, setDataSource, getDataSource] = useGetState<
    API_SCORE.GetExchangeMemoryListData[]
  >([]);
  const [hasMore, setHasMore] = useState(true);

  const currentPage = useRef(0);
  const actionRef = useRef<Ref>(null);

  async function fetchData() {
    return getExchangeMemoryList({
      currPage: currentPage.current,
      pageSize: 10,
    }).then((data) => {
      const result =
        currentPage.current === 0
          ? data.list || []
          : [...getDataSource(), ...(data.list || [])];
      setDataSource(result);
      setHasMore(result.length < data.total);
    });
  }

  const onAction = useCallback(() => {
    currentPage.current = 0;
    fetchData();
  }, []);

  const renderList = () => {
    return (
      <View className={styles['memory-list']}>
        {dataSource.map((item) => {
          return (
            <Item
              value={item}
              key={item._id}
              type={tabIndex}
              onClick={() => actionRef.current?.open(item)}
            />
          );
        })}
        <InfiniteLoading
          onLoadMore={async () => {
            currentPage.current++;
            return fetchData();
          }}
          hasMore={hasMore}
          loadingText={<>加载中</>}
          loadMoreText={<>没有更多了</>}
        ></InfiniteLoading>
      </View>
    );
  };

  useEffect(() => {
    currentPage.current = 0;
    fetchData();
  }, [tabIndex]);

  return (
    <>
      <Popup
        visible={visible}
        closeOnOverlayClick
        destroyOnClose
        onClose={() => setVisible(false)}
        round
        position="bottom"
        title={'我的兑换'}
        closeable
      >
        <View className={styles['award-memory-container']}>
          <Tabs
            value={tabIndex}
            onChange={setTabIndex}
            style={{
              borderRadius: '1rem',
            }}
          >
            <Tabs.TabPane title="待兑换" key="0">
              {renderList()}
            </Tabs.TabPane>
            <Tabs.TabPane title="已兑换" key="1">
              {renderList()}
            </Tabs.TabPane>
          </Tabs>
        </View>
      </Popup>
      <Action ref={actionRef} onChange={onAction} type={tabIndex} />
    </>
  );
};

export default MemoryList;
