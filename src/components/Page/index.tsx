import { ConfigProvider } from '@nutui/nutui-react-taro';

const Page = (props: {
  children?: any
}) => {
  return (
    <ConfigProvider
      theme={{
        nutuiColorPrimary: '#00d86a',
        nutuiColorPrimaryStop1: '#00d86a',
        nutuiColorPrimaryStop2: '#00d86a',
      }}
    >
      {props.children}
    </ConfigProvider>
  )
}

export default Page