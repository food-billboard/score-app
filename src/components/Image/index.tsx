import { Image as TaroImage, ImageProps } from '@tarojs/components';
import { useMemo } from 'react';
import { getPrefix } from '@/utils/request'

export const srcParse = (src: string) => {
  if(!src) return ''
  const srcInfo = new URL(src);
  return `${getPrefix()}${srcInfo.pathname}${srcInfo.search}`;
};

const Image = (props: ImageProps) => {
  const { src, ...nextProps } = props;

  const realSrc = useMemo(() => {
    return srcParse(src);
  }, [src]);

  return <TaroImage {...nextProps} src={realSrc} />;
};

export default Image;
