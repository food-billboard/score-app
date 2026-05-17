import Taro from '@tarojs/taro';
import Page from '@/components/Page';
import { Row, Col } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { getScoreClassifyList } from '@/services/base';
import Image from '@/components/Image'
import styles from './index.module.less';
import { useCallback, useEffect, useState } from 'react';
import { isUserSide } from '@/utils/tool';

const Design = () => {
  const [taskList, setTaskList] = useState<
    API_SCORE.GetScoreClassifyListData[]
  >([]);

  const handleDetail = useCallback(
    (value: API_SCORE.GetScoreClassifyListData) => {
      Taro.navigateTo({
        url: `/pages/DesignEdit/index?classify=${value._id}`,
      });
    },
    [],
  );

  useEffect(() => {
    if(isUserSide()) {
      Taro.showToast({
        title: '你无权限查看',
        complete: () => {
          Taro.switchTab({
            url: '/pages/Task/index'
          })
        }
      })
      return 
    }
    function fetchData() {
      getScoreClassifyList({
        currPage: 0,
        pageSize: 999,
      }).then((data) => {
        setTaskList(data?.list || data || []);
      });
    }
    fetchData();
  }, []);

  if(isUserSide()) {
    return null 
  }

  return (
    <Page
      onBack={
        (() => {
          Taro.redirectTo({
            url: '/pages/Home/index',
          });
        })
      }
    >
      <View className={styles['design-list']}>
        <Row gutter={10} wrap="wrap">
          {taskList.map((item) => {
            const { _id, image, content } = item;
            return (
              <Col span={8} key={_id} onClick={handleDetail.bind(null, item)}>
                <View className={styles['design-list-item']}>
                  <Image
                    className={styles['design-list-item-image']}
                    src={image}
                    mode="widthFix"
                  />
                  <View className={styles['design-list-item-content']}>
                    {content}
                  </View>
                </View>
              </Col>
            );
          })}
        </Row>
      </View>
    </Page>
  );
};

export default Design;
