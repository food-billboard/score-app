import { useCallback, useState } from 'react';
import { Button, InputNumber } from '@nutui/nutui-react-taro';
import { postScoreExchangeMemory } from '@/services/base';
import Carousel from './components/Carousel';
import styles from './index.module.less';
import { AWARD_CYCLE_ENUM, fetchUserInfo } from '@/utils/constants';
import { View } from '@tarojs/components';
import { getUserInfo as getUserInfoData } from '@/utils/constants';
import Star from '@/components/Star';

const AwardDetail = (props: { onClose: () => void, value: API_SCORE.GetScoreAwardData }) => {
  const { value, onClose } = props;
  const { _id, exchange_score, award_cycle, award_cycle_count, award_image_list=[] } =
    value || {};

  const { _id: target_user } = getUserInfoData();

  const [exchangeCount, setExchangeCount] = useState(1);

  const exchange = useCallback(() => {
    return postScoreExchangeMemory({
      target_user,
      award: _id,
    })
    .then(() => {
      onClose?.()
      fetchUserInfo(true)
    });
  }, [_id, target_user, onClose]);

  return (
    <View className={styles['award-detail']}>
      <View>
        <Carousel
          imageList={award_image_list}
        />
        <View className={styles['award-detail-main']}>
          <View className={styles['award-detail-main-item']}>
            <View className={styles['award-detail-main-item-label']}>单价</View>
            <View className={styles['award-detail-main-item-form']}>
              <Star>{exchange_score}</Star>
            </View>
          </View>
          <View className={styles['award-detail-main-item']}>
            <View className={styles['award-detail-main-item-label']}>
              兑换规则
            </View>
            <View className={styles['award-detail-main-item-form']}>
              {award_cycle === 'NONE'
                ? `无限制`
                : `每${
                    (AWARD_CYCLE_ENUM as any)[award_cycle] || '-'
                  }${award_cycle_count}次`}
            </View>
          </View>
          <View className={styles['award-detail-main-item']}>
            <View className={styles['award-detail-main-item-label']}>数量</View>
            <View className={styles['award-detail-main-item-form']}>
              <InputNumber
                min={1}
                value={exchangeCount}
                onChange={(value) => {
                  let realValue = Math.max(1, Number(value));
                  realValue = parseInt(realValue.toFixed(0));
                  realValue = Number.isNaN(realValue) ? 1 : realValue;
                  setExchangeCount(realValue);
                }}
              />
            </View>
          </View>
        </View>
        <View className={styles['award-detail-action']}>
          <View className={styles['award-detail-action-account']}>
            <Star>
              {exchange_score * exchangeCount}
            </Star>
          </View>
          <Button
            shape="round"
            block
            disabled={false}
            type="primary"
            onClick={exchange}
            style={{width: '50vw'}}
          >
            兑换
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AwardDetail;
