import { useCallback, useState } from 'react';
import { Swiper, ImagePreview } from '@nutui/nutui-react-taro';
import { View, Image } from '@tarojs/components'
import styles from './index.module.less';

const Carousel = (props: { imageList: string[] }) => {
  const { imageList=[] } = props;

  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  const onClick = useCallback((index: number) => {
    setVisible(true)
    setIndex(index)
  }, []);

  return (
    <View className={styles['carousel']}>
      <Swiper defaultValue={0} height={200}>
        {imageList.map((image, index) => (
          <Swiper.Item key={index}>
            <Image
              className={styles['carousel-item']}
              src={image}
              onClick={onClick.bind(null, index)}
              mode="aspectFill"
            />
          </Swiper.Item>
        ))}
      </Swiper>
      <ImagePreview
        autoPlay
        images={imageList.map(item => ({ src: item }))}
        visible={visible}
        value={index + 1}
        defaultValue={1}
        indicator
        onChange={(value) => {
          setIndex(value - 1)
        }}
        onClose={() => {
          setVisible(false)
        }}
      >

      </ImagePreview>
    </View>
  );
};

export default Carousel;
