export default defineAppConfig({
  pages: [
    'pages/Home/index',
    'pages/Task/index',
    'pages/AwardList/index',
    'pages/Score/index'
  ],
  // 全局的默认窗口表现
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '',
    selectedColor: '',
    backgroundColor: '',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/Task/index',
        text: '目标',
        iconPath: '',
      },
      {
        pagePath: 'pages/AwardList/index',
        text: '星愿池',
        iconPath: '',
      }
    ]
  }
})
