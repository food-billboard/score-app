import { useCallback } from 'react';
import { Button } from 'antd-mobile';
import { history } from 'umi';
import { postScoreExchangeMemory } from '@/services/base';
import styles from './index.less';
import { getQuery } from '@/utils/tool';

const AwardDetail = () => {
  const { _id, award_name } = (history.location.state || {}) as any;

  const exchange = useCallback(() => {
    return postScoreExchangeMemory({
      target_user: getQuery()['target_user'] as string,
      award: _id,
    });
  }, [_id]);

  return (
    <div className={styles['award-detail']}>
      <div>{award_name}</div>
      <Button onClick={exchange}>兑换</Button>
    </div>
  );
};

export default AwardDetail;
