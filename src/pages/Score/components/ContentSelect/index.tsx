import { useState } from 'react';
import { getScoreClassifyList } from '@/services/base';
import styles from './index.module.less';
import { useDebounceEffect } from 'ahooks';
import { View } from '@tarojs/components'

const ContentSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (
    value: string,
    data: { label: string; value: string; description: string },
  ) => void;
  disabled?: boolean;
  create_content: string;
}) => {
  const { create_content = '', onSelect } = props;

  const [dataSource, setDataSource] = useState<
    { label: string; value: string; description: string }[]
  >([]);

  useDebounceEffect(
    () => {
      function fetchData() {
        getScoreClassifyList({
          currPage: 0,
          pageSize: 999,
          content: create_content,
        }).then((data) => {
          setDataSource(
            data.list.map((item: any) => {
              return {
                ...item,
                label: item.content,
                value: item._id,
              };
            }),
          );
        });
      }
      if (create_content) {
        fetchData();
      } else {
        setDataSource([]);
      }
    },
    [create_content],
    {
      wait: 500,
    },
  );

  return (
    <View className={styles['content-picker']}>
      {dataSource.map((item) => {
        return (
          <View
            key={item.value}
            onClick={() => {
              onSelect?.(item.value, item);
            }}
          >
            {item.label}
          </View>
        );
      })}
      {
        !dataSource.length && (
          <View className={styles['content-picker-placeholder']}>输入积分原因进行模糊检索</View>
        )
      }
    </View>
  );
};

export default ContentSelect;
