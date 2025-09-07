import { Form, Button, Space, Toast } from '@nutui/nutui-react-taro';
import { useCallback } from 'react';
import Taro from '@tarojs/taro';
import Page from '@/components/Page';
import BackButton from '@/components/BackButton';
import { View } from '@tarojs/components';
import FormContent from './components/Form';
import styles from './index.module.less';

const Score = () => {
  const [form] = Form.useForm();

  const onFinish = useCallback(async () => {
    await form
      .validateFields()
      .then((values) => {
        // return postScoreMemory({
        //   ...values,
        //   target_user: getQuery()['target_user']
        // });
      })
      .then(() => {
        Toast.show('page-score', {
          onClose: () => {
            Taro.redirectTo({
              url: '/',
            });
          },
          content: '积分成功~',
        });
      })
      .catch((err) => {});
  }, []);

  return (
    <Page>
      <Toast id="page-score" />
      <View className={styles['edit']}>
        <FormContent
          formProps={{
            onFinish,
            form,
            footer: (
              <Space align="center" className={styles['edit-footer']}>
                <BackButton />
                <Button nativeType="submit" type="primary" block>
                  提交
                </Button>
              </Space>
            ),
          }}
        />
      </View>
    </Page>
  );
};

export default Score;
