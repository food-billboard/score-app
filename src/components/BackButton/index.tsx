import { Button } from '@nutui/nutui-react-taro';
import type { ButtonProps } from '@nutui/nutui-react-taro'
import { useCallback } from 'react';
import Taro from '@tarojs/taro';

const BackButton = (props: Partial<ButtonProps>) => {
  const handleBack = useCallback(() => {
    Taro.navigateBack({
      delta: -1
    })
  }, []);

  return (
    <Button block type="primary" fill="outline" {...props} onClick={handleBack}>
      返回
    </Button>
  );
};

export default BackButton;
