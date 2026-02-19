import { CSSProperties, ReactNode } from 'react';
import { View } from '@tarojs/components';
import classnames from 'classnames'
import styles from './index.module.less'

const Star = (props: { 
  style?: CSSProperties, 
  children?: ReactNode; 
  className?: string, 
  onClick?: () => void
  animate?: {
    star?: string 
    label?: string
  } 
}) => {
  const {
    className,
    children,
    style,
    onClick, 
    animate = {
      star: '',
      label: ''
    }
  } = props 
  const { star, label } = animate
  return (
    <View style={style} className={classnames(className, styles['star'])} onClick={onClick}>
      <View className={classnames(styles['star-icon'], star)}></View>
      <View className={classnames(styles['star-label'], label)}>{children}</View>
    </View>
  );
};

export default Star;
