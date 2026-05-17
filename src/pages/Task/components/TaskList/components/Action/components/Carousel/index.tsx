import { useCallback, useState, useMemo } from 'react';
import { Swiper, ImagePreview } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import Image, { srcParse } from '@/components/Image';
import styles from './index.module.less';

const Carousel = (props: { imageList: string[] }) => {
  const { imageList } = props;

  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const onClick = useCallback((index: number) => {
    setVisible(true);
    setIndex(index);
  }, []);

  const parseImageList = useMemo(() => {
    return imageList.map((item) => {
      return srcParse(item);
    });
  }, [imageList]);

  return (
    <View className={styles['carousel']}>
      <Swiper>
        {parseImageList.map((image, index) => (
          <Swiper.Item key={index}>
            <Image
              className={styles['carousel-item']}
              src={image}
              onClick={onClick.bind(null, index)}
              mode="aspectFit"
            />
          </Swiper.Item>
        ))}
      </Swiper>
      <ImagePreview
        autoPlay
        images={parseImageList.map((item) => ({ src: item }))}
        visible={visible}
        value={index}
        defaultValue={0}
        indicator
        onChange={(value) => {
          setIndex(value);
        }}
        onClose={() => {
          setVisible(false);
        }}
      ></ImagePreview>
    </View>
  );
};

export default Carousel;
