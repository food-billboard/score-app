import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import {
  TextArea,
  Button,
  Tabs,
  InputNumber,
  Dialog,
} from '@nutui/nutui-react-taro';
import { Ask } from '@nutui/icons-react-taro';
import { useDebounceFn } from 'ahooks';
import { View, Text } from '@tarojs/components';
import Image from '@/components/Image';
import { putScoreMemory } from '@/services/base';
import { fetchUserInfo } from '@/utils/constants';
import styles from './index.module.less';

const Question = () => {
  return (
    <>
      <Ask
        style={{ marginLeft: 8 }}
        onClick={() => {
          Dialog.open('nut-dialog-ask', {
            footer: null,
            closeOnOverlayClick: true,
            closeIcon: true,
            onClose: () => {
              Dialog.close('nut-dialog-ask');
            },
            onCancel: () => {
              Dialog.close('nut-dialog-ask');
            },
            title: '打分说明',
            content: (
              <View className={styles['question']}>
                <View className={styles['question-section']}>
                  <Text>已完成</Text>
                  <Text>表示已完成，奖励星星，日常任务建议1-3星。</Text>
                </View>
                <View className={styles['question-section']}>
                  <Text>待定</Text>
                  <Text>正在进行中，或者撤销打卡，也可标记为待定，</Text>
                </View>
                <View className={styles['question-section']}>
                  <Text>未完成</Text>
                  <Text>扣星{'>'}0，作为警告和惩罚，建议适当扣取。</Text>
                </View>
                <View className={styles['question-section']}>
                  <Text>不评分</Text>
                  <Text>不扣星，因其它原因无法达成或警告。</Text>
                </View>
              </View>
            ),
          });
        }}
      />
    </>
  );
};

const TABS_LIST = ['DONE', 'TODO', 'DEAL'];

const Action = (props: {
  value: API_SCORE.GetScoreMemoryListData & {
    defaultScoreType: string;
  };
  onClose?: () => void;
  onAction: (type: string) => void;
}) => {
  const { value, onClose, onAction } = props;
  const {
    _id,
    target_classify_image,
    target_score,
    target_classify_name,
    score_type,
    create_content,
    defaultScoreType,
  } = value || {};

  const [templateScore, setTemplateScore] = useState(target_score);
  const [templateActiveKey, setTemplateActiveKey] = useState(
    defaultScoreType || 'DONE',
  );
  const [templateCreateContent, setTemplateCreateContent] =
    useState(create_content);

  const [actionLoading, setActionLoading] = useState(false);

  const tabIndex = useMemo(() => {
    return TABS_LIST.indexOf(templateActiveKey);
  }, [templateActiveKey]);

  const onActiveKeyChange = useCallback(
    (index: number) => {
      const activeKey = TABS_LIST[index];
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
        onAction(templateActiveKey);
        await putScoreMemory({
          _id,
          create_content: templateCreateContent,
          target_score: templateScore,
          score_type: templateActiveKey,
        });
      } catch {
      } finally {
        setActionLoading(false);
        fetchUserInfo(true);
        onClose?.();
      }
    },
    {
      wait: 500,
    },
  );

  return (
    <View className={styles['action']}>
      <View>
        <View className={styles['action-main']}>
          <View className={styles['action-main-header']}>
            <View className={styles['action-main-header-image']}>
              <Image
                src={target_classify_image}
                mode="aspectFit"
                className={styles['img']}
              />
            </View>
            <View className={styles['action-main-header-title']}>
              {target_classify_name}
            </View>
            <View className={styles['action-main-header-button']}>xx</View>
          </View>
          <Tabs
            value={tabIndex}
            onChange={onActiveKeyChange}
            style={{
              borderRadius: '1rem',
            }}
          >
            <Tabs.TabPane title="完成" key="DONE">
              <View className={styles['action-content']}>
                <View className={styles['action-tab']}>
                  <View className={styles['action-tab-title']}>
                    <View className={styles['action-tab-title-label']}>
                      <Text>加星</Text>
                      <Question />
                    </View>
                    <View>
                      <InputNumber
                        value={templateScore}
                        onChange={setTemplateScore as any}
                        min={0}
                        max={5}
                      />
                    </View>
                  </View>
                </View>
                <View className={styles['action-input']}>
                  <TextArea
                    placeholder="记录孩子表现"
                    value={templateCreateContent}
                    onChange={setTemplateCreateContent}
                    rows={5}
                  />
                </View>
              </View>
            </Tabs.TabPane>
            <Tabs.TabPane title="待定" key="TODO">
              <View className={styles['action-content']}>
                <View className={styles['action-placeholder']}>
                  加星←未评分→扣星
                </View>
              </View>
            </Tabs.TabPane>
            <Tabs.TabPane
              title={templateScore !== 0 ? '未完成' : '不评分'}
              key="DEAL"
            >
              <View className={styles['action-content']}>
                <View className={styles['action-tab']}>
                  <View className={styles['action-tab-title']}>
                    <View className={styles['action-tab-title-deal']}>
                      <Text className={styles['action-tab-title-deal-label']}>
                        扣星
                      </Text>
                      <Question />
                    </View>
                    <View>
                      <InputNumber
                        value={templateScore}
                        onChange={setTemplateScore as any}
                        min={-3}
                        max={0}
                      />
                    </View>
                  </View>
                </View>
                <View className={styles['action-input']}>
                  <TextArea
                    placeholder="记录孩子表现"
                    value={templateCreateContent}
                    onChange={setTemplateCreateContent}
                    rows={5}
                  />
                </View>
              </View>
            </Tabs.TabPane>
          </Tabs>
        </View>
        <View className={styles['action-btn']}>
          <Button
            shape="round"
            onClick={onClose}
            type="primary"
            fill="outline"
            style={{ marginRight: '1em' }}
          >
            取消
          </Button>
          <Button
            shape="round"
            type="primary"
            onClick={onConfirm}
            loading={actionLoading}
          >
            确定
          </Button>
        </View>
      </View>
      <Dialog id={`nut-dialog-ask`} />
    </View>
  );
};

export default Action;
