import { Image, View } from '@tarojs/components';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Taro from '@tarojs/taro';
import styles from './index.module.less';

export type ReactionRef = {
  open: (image: string, audio?: string) => void;
};

export type ReactionProps = {};

const Reaction = forwardRef<ReactionRef, ReactionProps>((props, ref) => {
  const [image, setImage] = useState('');
  const [audio, setAudio] = useState('');

  const open = (image: string, audio?: string) => {
    setImage(image);
    setAudio(audio || '');
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      };
    },
    [],
  );

  useEffect(() => {
    if (!audio) return;
    const audioContext = Taro.createInnerAudioContext();

    audioContext.volume = 0.3
    // 设置音频源
    audioContext.src = audio;

    // 播放音频
    audioContext.play();
    // ? 因为不知道为什么onEnd事件不触发，先这样设置一下吧
    setTimeout(() => {
      audioContext.destroy();
      setImage('');
      setAudio('');
    }, 4000)
  }, [audio]);

  return (
    <View className={styles['reaction']}
      style={{
        opacity: image ? 1 : 0
      }}
    >
      <Image
        mode="aspectFit"
        className={styles['reaction-image']}
        src={image}
      />
    </View>
  );
});

export default Reaction;
