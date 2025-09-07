import { CSSProperties, ReactNode } from 'react';
import { View } from '@tarojs/components';
import classnames from 'classnames'
import styles from './index.module.less'

const Star = (props: { style?: CSSProperties, children?: ReactNode; className?: string }) => {
  const {
    className,
    children,
    style
  } = props 
  return (
    <View style={style} className={classnames(className, styles['star'])}>
      <View className={styles['star-icon']}></View>
      <View className={styles['star-label']}>{children}</View>
    </View>
  );
};

export default Star;
