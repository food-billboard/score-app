import { Calendar, Tabs } from '@nutui/nutui-react-taro';
import { useCallback, useMemo, useState } from 'react';
import classnames from 'classnames';
import { View, Text } from '@tarojs/components';
import { IconFont } from '@nutui/icons-react-taro';
import dayjs from 'dayjs';
import { action } from '@/components/MusicButton';
import buttonMusic1 from '../../../../../public/button.mp3';
import buttonMusic2 from '../../../../../public/button-2.mp3';
import styles from './index.module.less';

const WEEK_MAP = ['日', '一', '二', '三', '四', '五', '六'];

const DateList = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  const [visible, setVisible] = useState(false);
  const [stateValue, setStateValue] = useState(value);

  const date = useMemo(() => {
    return dayjs(stateValue).format('YYYY-MM-DD');
  }, [stateValue]);

  const today = useMemo(() => {
    return dayjs().format('YYYY-MM-DD');
  }, []);

  const dateList = useMemo(() => {
    const currentDate = dayjs();
    const prevDateList = new Array(7).fill('').map((_, index) => {
      return dayjs(currentDate).subtract(7 - index + 1, 'day');
    });
    const nextDateList = new Array(7).fill('').map((_, index) => {
      return dayjs(currentDate).add(index + 1, 'day');
    });
    return [...prevDateList, currentDate, ...nextDateList];
  }, []);

  const tabIndex = useMemo(() => {
    const index = dateList.findIndex(
      (item) => item.format('YYYY-MM-DD') === value,
    );
    return !!~index ? index : 0;
  }, [value, dateList]);

  const handleToday = useCallback(() => {
    action({
      music: buttonMusic1,
    });
    onChange(dayjs().format('YYYY-MM-DD'));
  }, [onChange]);

  const handleClick = useCallback(
    (value: any) => {
      onChange(dayjs(value).format('YYYY-MM-DD'));
    },
    [onChange],
  );

  return (
    <View className={styles['date-list']}>
      <View
        className={styles['date-list-select']}
        onClick={() => {
          action({
            music: buttonMusic2,
          });
          setStateValue(value);
          setVisible(true);
        }}
      >
        <IconFont
          size="1.6rem"
          fontClassName="iconfont"
          classPrefix="score"
          name="rili"
        />
      </View>
      <View className={styles['date-list-main']} id={'date-tab'}>
        {/* <Tabs
          value={tabIndex}
          title={() => {
            return dateList.map((item) => {
              const string = item.format('YYYY-MM-DD');
              const day = item.format('D');
              const month = item.format('M');
              const dom = (
                <View
                  key={string}
                  onClick={handleClick.bind(null, item)}
                  className={classnames(
                    `date-tab-${string}`,
                    styles['date-list-main-item'],
                    {
                      [styles['date-list-main-item-today']]: today === string,
                      [styles['date-list-main-item-active']]: value === string,
                    },
                  )}
                  {...(today === string ? { id: 'date-today' } : {})}
                >
                  <Text className={styles['date-list-main-item-day']}>
                    {day}
                  </Text>
                  <View
                    className={classnames(
                      {
                        [styles['date-list-main-item-month']]: day === '1',
                      },
                      styles['date-list-main-item-title'],
                    )}
                  >
                    <Text>{day === '1' ? `${month}月 / ` : ''}</Text>周
                    {WEEK_MAP[item.day()]}
                  </View>
                </View>
              );
              return dom;
            });
          }}
        >
          {dateList.map((item) => {
            const string = item.format('YYYY-MM-DD');
            return <Tabs.TabPane value={string} key={string} />;
          })}
        </Tabs> */}
        <Tabs value={tabIndex}>
          {dateList.map((item) => {
            const string = item.format('YYYY-MM-DD');
            const day = item.format('D');
            const month = item.format('M');
            const dom: any = (
              <View
                key={string}
                onClick={handleClick.bind(null, item)}
                className={classnames(
                  `date-tab-${string}`,
                  styles['date-list-main-item'],
                  {
                    [styles['date-list-main-item-today']]: today === string,
                    [styles['date-list-main-item-active']]: value === string,
                  },
                )}
                {...(today === string ? { id: 'date-today' } : {})}
              >
                <Text className={styles['date-list-main-item-day']}>{day}</Text>
                <View
                  className={classnames(
                    {
                      [styles['date-list-main-item-month']]: day === '1',
                    },
                    styles['date-list-main-item-title'],
                  )}
                >
                  <Text>{day === '1' ? `${month}月 / ` : ''}</Text>周
                  {WEEK_MAP[item.day()]}
                </View>
              </View>
            );
            return <Tabs.TabPane title={dom} key={string} />;
          })}
        </Tabs>
      </View>
      <View onClick={handleToday} className={styles['date-list-detail']}>
        <IconFont
          size="1.6rem"
          fontClassName="iconfont"
          classPrefix="score"
          name="tubiao-jintian"
        />
      </View>
      {visible && (
        <Calendar
          visible={visible}
          type="single"
          defaultValue={date}
          onConfirm={(value) => {
            onChange(dayjs(typeof value === 'string' ? value : value[3]).format('YYYY-MM-DD'));
          }}
          onDayClick={(value: any) => {
            setStateValue(dayjs(value).format('YYYY-MM-DD'));
          }}
          onClose={() => setVisible(false)}
          startDate={dateList[0].format('YYYY-MM-DD')}
          endDate={dateList[dateList.length - 1].format('YYYY-MM-DD')}
        />
      )}
    </View>
  );
};

export default DateList;
