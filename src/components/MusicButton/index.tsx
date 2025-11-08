import Taro from '@tarojs/taro';
import buttonMusic from '../../../public/button.mp3';

export function action(props?: { music?: string; timeout?: number }) {
  const { music = buttonMusic, timeout = 2000 } = props || {};

  const audioContext = Taro.createInnerAudioContext();

  audioContext.volume = 0.3;
  // 设置音频源
  audioContext.src = music;

  // 播放音频
  audioContext.play();
  // ? 因为不知道为什么onEnd事件不触发，先这样设置一下吧
  setTimeout(() => {
    audioContext.destroy();
  }, timeout);
}
