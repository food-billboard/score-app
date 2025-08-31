import { useCallback, useState } from 'react';
import {
  TextArea,
  Button,
  CapsuleTabs,
  Modal,
  Stepper,
} from 'antd-mobile';
import { QuestionCircleOutline } from 'antd-mobile-icons';
import { useDebounceFn } from 'ahooks';
import { putScoreMemory } from '@/services/base';
import styles from './index.less';

const Question = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <QuestionCircleOutline
        style={{ marginLeft: 8 }}
        onClick={() => setVisible(true)}
      />
      <Modal
        actions={[]}
        visible={visible}
        closeOnMaskClick
        onClose={() => setVisible(false)}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
        header={'打分说明'}
        content={
          <div className={styles['question']}>
            <div className={styles['question-section']}>
              <span>已完成</span>
              <span>表示已完成，奖励星星，日常任务建议1-3星。</span>
            </div>
            <div className={styles['question-section']}>
              <span>待定</span>
              <span>正在进行中，或者撤销打卡，也可标记为待定，</span>
            </div>
            <div className={styles['question-section']}>
              <span>未完成</span>
              <span>扣星{'>'}0，作为警告和惩罚，建议适当扣取。</span>
            </div>
            <div className={styles['question-section']}>
              <span>不评分</span>
              <span>不扣星，因其它原因无法达成或警告。</span>
            </div>
          </div>
        }
      ></Modal>
    </>
  );
};

const Action = (props: {
  value: API_SCORE.GetScoreMemoryListData & {
    defaultScoreType: string;
  };
  onClose?: () => void 
}) => {
  const { value, onClose } = props;
  const {
    _id,
    target_classify_image,
    target_score,
    target_classify_name,
    score_type,
    create_content,
    defaultScoreType,
  } = value;

  const [templateScore, setTemplateScore] = useState(target_score);
  const [templateActiveKey, setTemplateActiveKey] = useState(defaultScoreType);
  const [templateCreateContent, setTemplateCreateContent] =
    useState(create_content);

  const [actionLoading, setActionLoading] = useState(false);

  const onActiveKeyChange = useCallback(
    (activeKey: string) => {
      setTemplateActiveKey(activeKey);

      if (activeKey === score_type) {
        setTemplateScore(target_score);
        setTemplateCreateContent(create_content);
      } else {
        setTemplateCreateContent('');
        switch (activeKey) {
          case 'DONE':
            setTemplateScore(1);
            break;
          case 'TODO':
            setTemplateScore(0);
            break;
          case 'DEAL':
            setTemplateScore(-1);
            break;
        }
      }
    },
    [score_type, target_score, create_content],
  );

  const { run: onConfirm } = useDebounceFn(
    async () => {
      setActionLoading(true);
      try {
        await putScoreMemory({
          _id,
          create_content: templateCreateContent,
          target_score: templateScore,
          score_type: templateActiveKey,
        });
        // TODO
        // 成功提示
      } catch {
        // TODO
        // 失败提示
      } finally {
        setActionLoading(false);
      }
    },
    {
      wait: 500,
    },
  );

  return (
    <div className={styles['action']}>
      <div>
        <div className={styles['action-main']}>
          <div className={styles['action-main-header']}>
            <div className={styles['action-main-header-image']}>
              <img src={target_classify_image} />
            </div>
            <div className={styles['action-main-header-title']}>
              {target_classify_name}
            </div>
            <div className={styles['action-main-header-button']}>xx</div>
          </div>
          <CapsuleTabs
            activeKey={templateActiveKey}
            onChange={onActiveKeyChange}
          >
            <CapsuleTabs.Tab title="完成" key="DONE">
              <div className={styles['action-content']}>
                <div className={styles['action-tab']}>
                  <div className={styles['action-tab-title']}>
                    <div>
                      <span>加星</span>
                      <Question />
                    </div>
                    <div>
                      <Stepper
                        value={templateScore}
                        onChange={setTemplateScore}
                        min={0}
                        max={5}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles['action-input']}>
                  <TextArea
                    placeholder="记录孩子表现"
                    value={templateCreateContent}
                    onChange={setTemplateCreateContent}
                  />
                </div>
              </div>
            </CapsuleTabs.Tab>
            <CapsuleTabs.Tab title="待定" key="TODO">
              <div className={styles['action-content']}>
                <div className={styles['action-placeholder']}>加星←未评分→扣星</div>
              </div>
            </CapsuleTabs.Tab>
            <CapsuleTabs.Tab
              title={templateScore !== 0 ? '未完成' : '不评分'}
              key="DEAL"
            >
              <div className={styles['action-content']}>
                <div className={styles['action-tab']}>
                  <div
                    className={styles['action-tab-title']}
                  >
                    <div className={styles['action-tab-title-deal']}>
                      <span>扣星</span>
                      <Question />
                    </div>
                    <div>
                      <Stepper
                        value={templateScore}
                        onChange={setTemplateScore}
                        min={-3}
                        max={0}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles['action-input']}>
                  <TextArea
                    placeholder="记录孩子表现"
                    value={templateCreateContent}
                    onChange={setTemplateCreateContent}
                  />
                </div>
              </div>
            </CapsuleTabs.Tab>
          </CapsuleTabs>
        </div>
        <div className={styles['action-action']}>
          <Button
            shape="rounded"
            onClick={onClose}
            color='primary'
            fill="outline"
            style={{marginRight: '1em'}}
          >
            取消
          </Button>
          <Button
            shape="rounded"
            color="primary"
            onClick={onConfirm}
            loading={actionLoading}
          >
            确定
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Action;
