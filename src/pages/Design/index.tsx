import Taro from '@tarojs/taro';
import Page from '@/components/Page';
import { Row, Col } from '@nutui/nutui-react-taro';
import { View, Image } from '@tarojs/components';
import { getScoreClassifyList } from '@/services/base'
import styles from './index.module.less';
import { useCallback, useEffect, useState } from 'react';

const Design = () => {
  const [taskList, setTaskList] = useState<
    API_SCORE.GetScoreClassifyListData[]
  >([
    {
      _id: 'string',
      create_user: 'string',
      create_user_name: 'string',
      primary_id: 'string',
      primary_name: 'string',
      content: 'string',
      description: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      image: 'http://kc.gengfa.top/imgs/ktfw/banner.png',
    },
    {
      _id: 'string2',
      create_user: 'string',
      create_user_name: 'string',
      primary_id: 'string',
      primary_name: 'string',
      content: 'string',
      description: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      image: 'http://kc.gengfa.top/imgs/ktfw/banner.png',
    }
  ]);

  const handleDetail = useCallback((value: API_SCORE.GetScoreClassifyListData) => {
    Taro.navigateTo({
      url: `/pages/DesignEdit/index?classify=${value._id}`
    })
  }, [])

  useEffect(() => {
    return 
    function fetchData() {
      getScoreClassifyList({
        currPage: 0,
        pageSize: 999,
      }).then((data) => {
        setTaskList(data || []);
      });
    }
    fetchData()
  }, []);

  return (
    <Page
      onBack={() =>
        Taro.redirectTo({
          url: '/pages/Home/index',
        })
      }
    >
      <View className={styles['design-list']}>
        <Row gutter={10}>
          {taskList.map((item) => {
            const { _id, image, content } = item;
            return (
              <Col span={8} key={_id} onClick={handleDetail.bind(null, item)}>
                <View className={styles['design-list-item']}>
                  <Image className={styles['design-list-item-image']} src={image} mode="aspectFit" />
                  <View className={styles['design-list-item-content']}>{content}</View>
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
