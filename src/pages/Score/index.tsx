import { Form, Button, Space, Toast } from 'antd-mobile';
import { useCallback } from 'react';
import { history } from 'umi';
import BackButton from '@/components/BackButton';
import { getQuery } from '@/utils/tool'
import FormContent from './components/Form';
import styles from './index.less';

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
        Toast.show({
          afterClose: () => {
            history.replace('/');
          },
          content: '积分成功~',
        });
      })
      .catch((err) => {});
  }, []);

  return (
    <div className={styles['edit']}>
      <FormContent
        formProps={{
          onFinish,
          form,
          footer: (
            <Space block align="center" className={styles['edit-footer']}>
              <BackButton />
              <Button type="submit" block color="primary">
                提交
              </Button>
            </Space>
          ),
        }}
      />
    </div>
  );
};

export default Score;
