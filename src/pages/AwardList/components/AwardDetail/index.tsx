import { useCallback, useState } from 'react';
import { Button, Stepper } from 'antd-mobile';
import { postScoreExchangeMemory } from '@/services/base';
import Carousel from './components/Carousel';
import styles from './index.less';
import { AWARD_CYCLE_ENUM } from '@/utils/constants';
import { getQuery } from '@/utils/tool';

const AwardDetail = (props: { value: API_SCORE.GetScoreAwardData }) => {
  const { value } = props;
  const { _id, award_name, exchange_score, award_cycle, award_cycle_count } =
    value;

  const [exchangeCount, setExchangeCount] = useState(1);

  const exchange = useCallback(() => {
    return postScoreExchangeMemory({
      target_user: getQuery()['target_user'] as string,
      award: _id,
    });
  }, [_id]);

  return (
    <div className={styles['award-detail']}>
      <div>
        <Carousel
          imageList={[
            'https://t7.baidu.com/it/u=97059456,1585992153&fm=3035&app=3035&f=JPEG&size=f660,372',
            'https://t9.baidu.com/it/u=3058309664,2827251915&fm=3035&app=3035&size=f242,162&n=0&g=0n&f=JPEG?s=F1228BF0545607C2080A6AAE0300E00A&sec=1747912451&t=0dddc642f48ecd25c00942f57b436a8a',
            'https://t9.baidu.com/it/u=1719506008,751042043&fm=3035&app=3035&size=f242,150&n=0&f=JPEG&fmt=auto?s=5314528A8A5922CC22B04B8E0300E007&sec=1747933200&t=447dcb5c388090f819bca1ce00f581f3',
          ]}
        />
        <div className={styles['award-detail-main']}>
          <div className={styles['award-detail-main-item']}>
            <div className={styles['award-detail-main-item-label']}>单价</div>
            <div className={styles['award-detail-main-item-form']}>
              <div className="star">
                <div></div>
                <div>{exchange_score}</div>
              </div>
            </div>
          </div>
          <div className={styles['award-detail-main-item']}>
            <div className={styles['award-detail-main-item-label']}>
              兑换规则
            </div>
            <div className={styles['award-detail-main-item-form']}>
              {award_cycle === 'NONE'
                ? `无限制`
                : `每${
                    (AWARD_CYCLE_ENUM as any)[award_cycle] || '-'
                  }${award_cycle_count}次`}
            </div>
          </div>
          <div className={styles['award-detail-main-item']}>
            <div className={styles['award-detail-main-item-label']}>数量</div>
            <div className={styles['award-detail-main-item-form']}>
              <Stepper
                min={1}
                value={exchangeCount}
                onChange={(value) => {
                  let realValue = Math.max(1, value);
                  realValue = parseInt(realValue.toFixed(0));
                  realValue = Number.isNaN(realValue) ? 1 : realValue;
                  setExchangeCount(realValue);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles['award-detail-action']}>
          <div className={styles['award-detail-action-account']}>
            <div className="star">
              <div></div>
              <div>{exchange_score * exchangeCount}</div>
            </div>
          </div>
          <Button
            shape="rounded"
            block
            disabled={false}
            color="primary"
            onClick={exchange}
          >
            兑换
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AwardDetail;
