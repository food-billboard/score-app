import { Toast as NutToast } from '@nutui/nutui-react-taro'
import { useEffect, useRef, useState } from 'react'
import { EventEmitter } from 'eventemitter3'

const event = new EventEmitter()

export const Toast = {
  show: (config: Parameters<typeof NutToast.show>[1]) => {
    return NutToast.show('nut-toast', {
      ...config,
    })
  },
  hide: () => {
    return  NutToast.hide('nut-toast')
  },
  visible: (config: Parameters<typeof NutToast.show>[1]) => {
    event.emit('visible', config)
  },
  visibleHide: () => {
    event.emit('hide')
  }
}

const ToastDom = () => {
  const [ visible, setVisible ] = useState(false)
  const visibleConfig = useRef<Parameters<typeof NutToast.show>[1]>({})

  useEffect(() => {
    const visibleListener = function(config: Parameters<typeof NutToast.show>[1]) {
      visibleConfig.current = config
      setVisible(true)
    }
    const hideListener = function() {
      visibleConfig.current = {}
      setVisible(false)
    }
    event.addListener('visible', visibleListener)
    event.addListener('visibleHide', hideListener)
    return () => {
      event.removeListener('visible')
      event.removeListener('visibleHide')
    }
  }, [])

  return (
    <>
      <NutToast id={`nut-toast`} />
      <NutToast id={`nut-toast-visible`} visible={visible} {...visibleConfig.current} />
    </>
  )
}

export default ToastDom