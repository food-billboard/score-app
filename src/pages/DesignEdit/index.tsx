import {
  Form,
  Radio,
  Button,
  Switch,
  Checkbox,
  type FormInstance,
} from '@nutui/nutui-react-taro';
import { useCallback, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import Page from '@/components/Page';
import BackButton from '@/components/BackButton';
import { View } from '@tarojs/components';
import { getUserInfo } from '@/utils/constants';
import {
  getScoreClassifyDesignList,
  postScoreClassifyDesign,
  deleteScoreClassifyDesign,
} from '@/services/base';
import styles from './index.module.less';
import { useUpdate } from 'ahooks';

// 0 表示星期日（Sunday）
// 1 表示星期一（Monday）
// 2 表示星期二（Tuesday）
// 3 表示星期三（Wednesday）
// 4 表示星期四（Thursday）
// 5 表示星期五（Friday）
// 6 表示星期六（Saturday）

const DesignEdit = () => {
  const [form] = Form.useForm();

  const update = useUpdate();

  const instance = useRef<any>();

  const designData = useRef<API_SCORE.GetScoreClassifyDesignListData>();

  const handleClear = useCallback(() => {
    Taro.showModal({
      title: '提示',
      content: '是否确认清空定制信息?',
      success: (res) => {
        if (res.confirm) {
          deleteScoreClassifyDesign({
            _id: designData.current?._id || '',
          }).then(() => {
            Taro.showToast({
              title: '清空成功~',
            });
            form.resetFields();
            designData.current = undefined;
            update();
          });
        }
      },
    });
  }, []);

  const onFinish = useCallback(async (values: any) => {
    const { _id } = getUserInfo();
    const realValues = {
      ...values,
      repeat:
        values.repeat_type === 'WEEK'
          ? values.repeat_week
          : values.repeat_month,
    };
    return postScoreClassifyDesign({
      ...realValues,
      target_user: _id,
      classify: instance.current.router.params.classify,
    })
      .then(() => {
        Taro.showToast({
          complete: () => {
            Taro.navigateBack({
              delta: -1,
            });
          },
          title: '修改成功',
        });
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    const { _id } = getUserInfo();
    instance.current = Taro.getCurrentInstance() as any;

    getScoreClassifyDesignList({
      target_user: _id,
      classify: instance.current.router.params.classify,
    }).then((data) => {
      const nextData = {
        ...(data || {}),
      };
      if (data.repeat_week) {
        if (data.repeat_type === 'WEEK') {
          nextData.repeat_week = nextData.repeat;
          nextData.repeat_month = new Array(31)
            .fill(0)
            .map((_, index) => index + 1);
        } else {
          nextData.repeat_week = new Array(7).fill(0).map((_, index) => index);
          nextData.repeat_month = nextData.repeat;
        }
      } else {
        nextData.repeat_week = new Array(7).fill(0).map((_, index) => index);
        nextData.repeat_month = new Array(31)
          .fill(0)
          .map((_, index) => index + 1);
      }
      designData.current = nextData || {};
      form.setFieldsValue(nextData);
      update();
    });
  }, []);

  return (
    <Page
      onBack={() =>
        Taro.navigateBack({
          delta: -1,
        })
      }
    >
      <View className={styles['edit']}>
        <Form
          labelPosition="left"
          onFinish={onFinish}
          form={form}
          footer={
            <View
              className={styles['edit-footer']}
            >
              <BackButton block={false} />
              {!designData.current?._id && (
                <Button type="danger" onClick={handleClear}>
                  清空
                </Button>
              )}
              <Button nativeType="submit" type="primary">
                提交
              </Button>
            </View>
          }
        >
          <Form.Item
            name="repeat_type"
            label="打卡频次"
            rules={[{ required: true }]}
            initialValue={'WEEK'}
          >
            <Radio.Group shape="button" direction="horizontal">
              <Radio value="WEEK">每周</Radio>
              <Radio value="MONTH">每月</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }: FormInstance) => {
              const value = getFieldValue('repeat_type');
              if (value === 'WEEK') {
                return (
                  <Form.Item
                    name="repeat_week"
                    label=""
                    rules={[{ required: true }]}
                    initialValue={''}
                  >
                    <Checkbox.Group direction="horizontal">
                      {[1, 2, 3, 4, 5, 6, 0].map((index) => {
                        return (
                          <Checkbox
                            className={styles['custom-nut-checkbox']}
                            label={`周${
                              {
                                0: '日',
                                1: '一',
                                2: '二',
                                3: '三',
                                4: '四',
                                5: '五',
                                6: '六',
                              }[index]
                            }`}
                            value={index}
                            shape="button"
                            key={index}
                          />
                        );
                      })}
                    </Checkbox.Group>
                  </Form.Item>
                );
              }
              if (value === 'MONTH') {
                return (
                  <Form.Item
                    name="repeat_month"
                    label=""
                    rules={[{ required: true }]}
                    initialValue={''}
                  >
                    <Checkbox.Group
                      direction="horizontal"
                      className={styles['custom-nut-checkbox']}
                    >
                      {new Array(31).fill(0).map((_, index) => {
                        return (
                          <Checkbox
                            labelPosition="right"
                            label={(index + 1).toString()}
                            value={index + 1}
                            shape="button"
                            key={index}
                          />
                        );
                      })}
                    </Checkbox.Group>
                  </Form.Item>
                );
              }
              return null;
            }}
          </Form.Item>
          <Form.Item
            name="holiday"
            label="假期"
            rules={[{ required: true }]}
            initialValue={false}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </View>
    </Page>
  );
};

export default DesignEdit;
