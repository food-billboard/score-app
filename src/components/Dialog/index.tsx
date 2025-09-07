import { Dialog as NutDialog } from '@nutui/nutui-react-taro'
// import { useEffect, useRef, useState } from 'react'
// import { EventEmitter } from 'eventemitter3'

// const event = new EventEmitter()

export const Dialog = {
  open: (config: Parameters<typeof NutDialog.open>[1]) => {
    return NutDialog.open('nut-dialog', {
      ...config,
    })
  },
  close: () => {
    return NutDialog.close('nut-dialog')
  },
}

const DialogDom = () => {
  // const [ visible, setVisible ] = useState(false)
  // const visibleConfig = useRef<Parameters<typeof NutDialog.open>[1]>({})

  // useEffect(() => {
  //   const visibleListener = function(config: Parameters<typeof NutDialog.open>[1]) {
  //     visibleConfig.current = config
  //     setVisible(true)
  //   }
  //   const hideListener = function() {
  //     visibleConfig.current = {}
  //     setVisible(false)
  //   }
  //   event.addListener('visible', visibleListener)
  //   event.addListener('visibleHide', hideListener)
  //   return () => {
  //     event.removeListener('visible')
  //     event.removeListener('visibleHide')
  //   }
  // }, [])

  return (
    <>
      <NutDialog id={`nut-dialog`} />
    </>
  )
}

export default DialogDom