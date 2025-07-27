import { CalendarPicker } from 'antd-mobile';
import { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames'
import dayjs from 'dayjs';
import styles from './index.less';

const WEEK_MAP = ['日', '一', '二', '三', '四', '五', '六']

const DateList = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { value, onChange } = props;

  const [visible, setVisible] = useState(false);
  const [stateValue, setStateValue] = useState(value);

  const date = useMemo(() => {
    return dayjs(stateValue).toDate();
  }, [stateValue]);

  const today = useMemo(() => {
    return dayjs().format('YYYY-MM-DD')
  }, [])

  const dateList = useMemo(() => {
    const currentDate = dayjs(value)
    const prevDateList = new Array(7).fill('').map((_, index) => {
      return dayjs(currentDate).subtract(7 - index + 1, 'day')
    })
    const nextDateList = new Array(7).fill('').map((_, index) => {
      return dayjs(currentDate).add(index + 1, 'day')
    })
    return [
      ...prevDateList,
      currentDate,
      ...nextDateList
    ]
  }, [value])

  const handleClick = useCallback((value:any) => {
    onChange(dayjs(value).format('YYYY-MM-DD'))
  }, [onChange])

  return (
    <div className={styles['date-list']}>
      <div className={styles['date-list-select']}>
        <div onClick={() => {
          setStateValue(value)
          setVisible(true)
        }}>
          选择
        </div>
      </div>
      <div className={styles['date-list-main']}>
        {
          dateList.map(item => {
            const string = item.format('YYYY-MM-DD')
            const day = item.format('D')
            const month = item.format('M')
            return (
              <div key={string} onClick={handleClick.bind(null, item)} className={classnames(styles['date-list-main-item'], {
                [styles['date-list-main-item-today']]: today === string,
                [styles['date-list-main-item-active']]: value === string
              })}>
                <span>{day}</span>
                <div className={classnames({
                  [styles['date-list-main-item-month']]: day === '1'
                })}>
                  <span>{day === '1' ? `${month}月 / ` : ''}</span>
                  周{WEEK_MAP[item.day()]}
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={styles['date-list-detail']}>
        xxx
      </div>
      <CalendarPicker
        visible={visible}
        selectionMode="single"
        value={date}
        onConfirm={value => {
          onChange(dayjs(value).format('YYYY-MM-DD'))
        }}
        onChange={(value) => {
          setStateValue(dayjs(value).format('YYYY-MM-DD'))
        }}
        onClose={() => setVisible(false)}
        onMaskClick={() => setVisible(false)}
      />
    </div>
  );
};

export default DateList;
