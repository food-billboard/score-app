import { useCallback } from 'react';
import { Swiper, ImageViewer } from 'antd-mobile';
import styles from './index.less';

const Carousel = (props: { imageList: string[] }) => {
  const { imageList } = props;

  const onClick = useCallback((index: number) => {
    ImageViewer.Multi.show({
      images:imageList,
      defaultIndex: index,
    })
  }, []);

  return (
    <div className={styles['carousel']}>
      <Swiper>
        {imageList.map((image, index) => (
          <Swiper.Item key={index}>
            <img
              className={styles['carousel-item']}
              src={image}
              onClick={onClick.bind(null, index)}
            />
          </Swiper.Item>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
